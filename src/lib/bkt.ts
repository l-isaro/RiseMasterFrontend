/**
 * Bayesian Knowledge Tracing (BKT) — frontend implementation.
 *
 * Mirrors the pyBKT backend service: maintains per-skill mastery using
 * a Hidden Markov Model with four parameters.
 *
 *   P(L₀)  – initial probability of knowing the skill
 *   P(T)   – probability of transitioning from unlearned → learned
 *   P(G)   – probability of guessing correctly while not knowing
 *   P(S)   – probability of slipping (incorrect despite knowing)
 *
 * Update rules (standard BKT):
 *   After observing *correct*:
 *     P(L|obs) = P(L)·(1−P(S)) / [P(L)·(1−P(S)) + (1−P(L))·P(G)]
 *   After observing *incorrect*:
 *     P(L|obs) = P(L)·P(S) / [P(L)·P(S) + (1−P(L))·(1−P(G))]
 *   Then transition:
 *     P(L_new) = P(L|obs) + (1 − P(L|obs))·P(T)
 */

// ── BKT parameters per skill ────────────────────────────────────────────────

export interface BKTParams {
  pL0: number; // P(L₀)
  pT: number; // P(Transit)
  pG: number; // P(Guess)
  pS: number; // P(Slip)
}

/** Reasonable defaults tuned by topic difficulty (mimics pyBKT fitted values). */
export const DEFAULT_BKT_PARAMS: Record<string, BKTParams> = {
  geometric_progression: { pL0: 0.1, pT: 0.2, pG: 0.2, pS: 0.1 },
  exponentials: { pL0: 0.08, pT: 0.18, pG: 0.22, pS: 0.12 },
  sequences: { pL0: 0.12, pT: 0.22, pG: 0.2, pS: 0.1 },
  trig: { pL0: 0.07, pT: 0.15, pG: 0.25, pS: 0.12 },
  calculus: { pL0: 0.05, pT: 0.12, pG: 0.25, pS: 0.15 },
  complex: { pL0: 0.08, pT: 0.16, pG: 0.22, pS: 0.13 },
  stats: { pL0: 0.1, pT: 0.2, pG: 0.2, pS: 0.1 },
};

const FALLBACK_PARAMS: BKTParams = { pL0: 0.1, pT: 0.18, pG: 0.22, pS: 0.12 };

export function getParams(skillName: string): BKTParams {
  return DEFAULT_BKT_PARAMS[skillName] ?? FALLBACK_PARAMS;
}

// ── Single-step BKT update ──────────────────────────────────────────────────

/**
 * Given the current P(L) and whether the response was correct,
 * returns the updated P(L) after one observation + transition.
 */
export function bktUpdate(
  pL: number,
  correct: boolean,
  params: BKTParams,
): number {
  const { pT, pG, pS } = params;

  // Posterior (observation update)
  let posterior: number;
  if (correct) {
    const num = pL * (1 - pS);
    const den = pL * (1 - pS) + (1 - pL) * pG;
    posterior = den > 0 ? num / den : pL;
  } else {
    const num = pL * pS;
    const den = pL * pS + (1 - pL) * (1 - pG);
    posterior = den > 0 ? num / den : pL;
  }

  // Transition (learning opportunity)
  const pLNew = posterior + (1 - posterior) * pT;

  return Math.min(Math.max(pLNew, 0), 1);
}

// ── Interaction history (persisted in localStorage) ─────────────────────────

export interface Interaction {
  timestamp: number;
  correct: boolean;
  hintsUsed: number;
}

const HISTORY_KEY_PREFIX = "bkt_history_";
const MASTERY_KEY_PREFIX = "bkt_mastery_";

function historyKey(skillName: string): string {
  return `${HISTORY_KEY_PREFIX}${skillName}`;
}

function masteryKey(skillName: string): string {
  return `${MASTERY_KEY_PREFIX}${skillName}`;
}

/** Load interaction history from localStorage. */
export function getHistory(skillName: string): Interaction[] {
  try {
    const raw = localStorage.getItem(historyKey(skillName));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Append one interaction and recompute mastery from scratch (like the backend). */
export function recordInteraction(
  skillName: string,
  correct: boolean,
  hintsUsed: number = 0,
): number {
  const history = getHistory(skillName);
  history.push({ timestamp: Date.now(), correct, hintsUsed });

  // Cap at 200 most recent interactions (same as backend max_interactions)
  const trimmed = history.slice(-200);
  localStorage.setItem(historyKey(skillName), JSON.stringify(trimmed));

  // Recompute mastery from full history (same as backend update_mastery_from_interactions)
  const mastery = computeMastery(skillName, trimmed);
  localStorage.setItem(masteryKey(skillName), String(mastery));

  return mastery;
}

/**
 * Replay all interactions through BKT to compute current mastery.
 * This mirrors how the Python backend fits + predicts on the full history.
 *
 * Hint penalty: if hints were used, we treat a correct answer as partially
 * guessed — we do a weighted mix between the correct and incorrect updates.
 * 3 hints → fully treated as a guess (incorrect update).
 */
export function computeMastery(
  skillName: string,
  history?: Interaction[],
): number {
  const interactions = history ?? getHistory(skillName);
  const params = getParams(skillName);

  if (interactions.length === 0) return params.pL0;

  let pL = params.pL0;

  for (const inter of interactions) {
    if (inter.hintsUsed > 0 && inter.correct) {
      // Blend: more hints → more like an incorrect answer (guessing)
      const hintWeight = Math.min(inter.hintsUsed / 3, 1); // 0..1
      const pLCorrect = bktUpdate(pL, true, params);
      const pLIncorrect = bktUpdate(pL, false, params);
      pL = pLCorrect * (1 - hintWeight) + pLIncorrect * hintWeight;
    } else {
      pL = bktUpdate(pL, inter.correct, params);
    }
  }

  return pL;
}

/** Read the stored mastery, or compute from history if not yet stored. */
export function getMastery(skillName: string): number {
  const history = getHistory(skillName);
  // No interactions yet → mastery is 0 (don't show the BKT prior)
  if (history.length === 0) {
    // Clean up any stale mastery keys left from older versions
    localStorage.removeItem(masteryKey(skillName));
    return 0;
  }
  const stored = localStorage.getItem(masteryKey(skillName));
  if (stored !== null) return Number(stored);
  return computeMastery(skillName, history);
}

/** Get mastery values for all skills that have history. */
export function getAllMastery(): Record<string, number> {
  const result: Record<string, number> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(MASTERY_KEY_PREFIX)) {
      const skill = key.slice(MASTERY_KEY_PREFIX.length);
      result[skill] = Number(localStorage.getItem(key) || "0");
    }
  }
  return result;
}

/** Get interaction count for a skill. */
export function getInteractionCount(skillName: string): number {
  return getHistory(skillName).length;
}

/** Get the number of fully completed problems for a skill. */
export function getProblemsCompleted(skillName: string): number {
  return Number(localStorage.getItem(`demo_solved_${skillName}`) || "0");
}

/** Get total problems completed across all given skills. */
export function getTotalProblemsCompleted(skillIds: string[]): number {
  return skillIds.reduce((sum, id) => sum + getProblemsCompleted(id), 0);
}

// ── Growth / Improvement Grading ────────────────────────────────────────────
//
// The improvement grade is separate from mastery. A student who starts at 10%
// and reaches 40% is graded *better* than one who starts at 80% and stays at
// 85%, even though the second student has higher mastery.
//
// Components (each 0–1, combined into a weighted score):
//   1. Mastery Growth  (40%) — delta between first and latest mastery
//   2. Consistency      (20%) — how many distinct days the student practiced
//   3. Persistence      (20%) — ratio of retry-after-failure, hint reduction
//   4. Breadth          (20%) — fraction of topics attempted
//

const SESSION_LOG_KEY = "growth_sessions"; // JSON array of { timestamp, skill }

export interface SessionEntry {
  timestamp: number;
  skill: string;
}

export interface GrowthBreakdown {
  /** Overall improvement grade 0–100 */
  grade: number;
  /** Letter grade */
  letter: string;
  /** Mastery growth component 0–1 */
  masteryGrowth: number;
  /** Consistency component 0–1 */
  consistency: number;
  /** Persistence component 0–1 */
  persistence: number;
  /** Breadth component 0–1 */
  breadth: number;
}

/** Record that a practice session occurred (call once per session, not per step). */
export function logSession(skillName: string): void {
  const sessions = getSessions();
  sessions.push({ timestamp: Date.now(), skill: skillName });
  localStorage.setItem(SESSION_LOG_KEY, JSON.stringify(sessions.slice(-500)));
}

export function getSessions(): SessionEntry[] {
  try {
    const raw = localStorage.getItem(SESSION_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Compute the improvement / growth grade.
 * Returns a breakdown so the UI can show each dimension.
 */
export function getGrowthGrade(allTopicIds: string[]): GrowthBreakdown {
  // ── 1. Mastery Growth (averaged across practiced topics) ──────────────
  let totalGrowth = 0;
  let practicedCount = 0;

  for (const id of allTopicIds) {
    const history = getHistory(id);
    if (history.length === 0) continue;
    practicedCount++;

    const params = getParams(id);
    const startMastery = params.pL0; // where they started (BKT prior)
    const currentMastery = computeMastery(id, history);
    const actualGrowth = Math.max(0, currentMastery - startMastery);

    // Scale growth logarithmically so one problem can't max it out.
    // A student needs sustained practice across multiple sessions to
    // reach high growth scores.  Reaching mastery ~0.7 from a low prior
    // after many problems should be ~0.6-0.7 growth, not ~0.97.
    //
    // Formula: log(1 + growth * K) / log(1 + K), where K controls
    // how many "units" of growth are needed to approach 1.0.
    // With K=4, getting from 0.12→0.85 (one problem, all correct) gives
    // ~0.55 instead of 0.97. Multiple problems are needed to push higher.
    const K = 4;
    const normalizedGrowth = Math.log(1 + actualGrowth * K) / Math.log(1 + K);
    totalGrowth += normalizedGrowth;
  }

  const masteryGrowth =
    practicedCount > 0
      ? Math.max(0, Math.min(1, totalGrowth / practicedCount))
      : 0;

  // ── 2. Consistency (distinct practice days, normalized by 14-day window) ─
  const sessions = getSessions();
  const uniqueDays = new Set(
    sessions.map((s) => new Date(s.timestamp).toDateString()),
  );
  // 7 distinct days in 2 weeks = full consistency score
  const consistency = Math.min(1, uniqueDays.size / 7);

  // ── 3. Persistence (retry after failure + hint reduction over time) ──────
  let retryAfterFail = 0;
  let failCount = 0;
  let earlyHints = 0;
  let lateHints = 0;
  let earlyCount = 0;
  let lateCount = 0;

  for (const id of allTopicIds) {
    const history = getHistory(id);
    if (history.length < 2) continue;

    const mid = Math.floor(history.length / 2);

    for (let i = 0; i < history.length; i++) {
      const inter = history[i];
      // Count hint usage in first half vs second half
      if (i < mid) {
        earlyHints += inter.hintsUsed;
        earlyCount++;
      } else {
        lateHints += inter.hintsUsed;
        lateCount++;
      }

      // Did student continue after a failure?
      if (!inter.correct) {
        failCount++;
        if (i < history.length - 1) {
          retryAfterFail++; // they came back for another attempt
        }
      }
    }
  }

  const retryRate = failCount > 0 ? retryAfterFail / failCount : 1;
  const avgEarlyHints = earlyCount > 0 ? earlyHints / earlyCount : 0;
  const avgLateHints = lateCount > 0 ? lateHints / lateCount : 0;
  // If hints decreased, that's improvement (capped at 1)
  const hintReduction =
    avgEarlyHints > 0
      ? Math.min(1, Math.max(0, (avgEarlyHints - avgLateHints) / avgEarlyHints))
      : lateCount > 0
        ? 1
        : 0; // no hints at all is perfect
  const persistence =
    practicedCount > 0 ? retryRate * 0.6 + hintReduction * 0.4 : 0;

  // ── 4. Breadth (fraction of all topics attempted) ────────────────────────
  const breadth =
    allTopicIds.length > 0 ? practicedCount / allTopicIds.length : 0;

  // ── Combined weighted grade ──────────────────────────────────────────────
  const raw =
    masteryGrowth * 0.4 + consistency * 0.2 + persistence * 0.2 + breadth * 0.2;

  const grade = Math.round(Math.min(100, Math.max(0, raw * 100)));

  const letter =
    grade >= 90
      ? "A+"
      : grade >= 80
        ? "A"
        : grade >= 70
          ? "B+"
          : grade >= 60
            ? "B"
            : grade >= 50
              ? "C+"
              : grade >= 40
                ? "C"
                : grade >= 30
                  ? "D"
                  : "E";

  return { grade, letter, masteryGrowth, consistency, persistence, breadth };
}
