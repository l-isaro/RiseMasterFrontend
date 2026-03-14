import { User, Topic, PracticeQuestion } from "@/types";

export const DEMO_TOPIC = "Geometric Progression";

export const mockUser: User = {
  name: "Aline Uwase",
  email: "aline.uwase@example.com",
  classLevel: "S6",
  overallMastery: 0.64,
  overallGain: 0.21,
  streak: 0,
  totalProblems: 19,
};

export const mockTopics: Topic[] = [
  {
    id: "exponentials",
    name: "Exponential Functions",
    icon: "TrendingUp",
    mastery: 0.58,
    gain: 0.16,
    color: "primary",
  },
  {
    id: "sequences",
    name: "Sequences",
    icon: "Variable",
    mastery: 0.66,
    gain: 0.12,
    color: "accent",
  },
  {
    id: "trig",
    name: "Trigonometry",
    icon: "Triangle",
    mastery: 0.49,
    gain: 0.09,
    color: "success",
  },
  {
    id: "calculus",
    name: "Calculus",
    icon: "Target",
    mastery: 0.41,
    gain: 0.14,
    color: "primary",
  },
  {
    id: "complex",
    name: "Complex Numbers",
    icon: "Sparkles",
    mastery: 0.52,
    gain: 0.11,
    color: "accent",
  },
  {
    id: "stats",
    name: "Statistics",
    icon: "BarChart3",
    mastery: 0.63,
    gain: 0.07,
    color: "success",
  },
];

/**
 * Demo practice question (scaffolded) — feels like a guided lesson
 * Topic: Exponential Decay (matches your backend seed vibe)
 */
export const mockQuestion1 = {
  id: "q-gp-insert-terms",
  topicKey: "geometric_progression",
  topic: "Sequences",
  year: 2023,
  questionText:
    "In a geometric progression, insert 4 geometric terms between 2 and 6250.",
  questionLatex: "2,\\ \\_,\\ \\_,\\ \\_,\\ \\_,\\ 6250",
  conceptTitle: "Geometric Progression (Insert Terms)",
  conceptIntro:
    "A geometric progression (GP) is a sequence where each term is made by multiplying by the same number (the common ratio r).\n\n" +
    "Key idea:\n" +
    "If a is the first term and r is the ratio, then:\n" +
    "a, ar, ar², ar³, ...\n\n" +
    "Today’s goal: find the missing 4 terms between 2 and 6250.\n\n" +
    "Before we start, answer 2 quick questions (multiple choice) to unlock the steps 👇",
  // We'll use these two concept-check questions in ConceptIntroCard (we'll add support)
  conceptChecks: [
    {
      id: "cc1",
      question: "In a GP, each new term is made by…",
      options: [
        {
          id: "a",
          text: "Adding the same number each time",
          correct: false,
          feedback: "That’s an arithmetic progression (AP).",
        },
        {
          id: "b",
          text: "Multiplying by the same number each time",
          correct: true,
          feedback: "Yes! That constant multiplier is the ratio r.",
        },
        {
          id: "c",
          text: "Squaring the previous term",
          correct: false,
          feedback: "Not for a GP. GP uses a constant multiplier.",
        },
        {
          id: "d",
          text: "Subtracting the same number each time",
          correct: false,
          feedback: "That’s also an arithmetic pattern, not GP.",
        },
      ],
    },
    {
      id: "cc2",
      question:
        "If you insert 4 terms between first and last, how many times is r multiplied from first to last?",
      options: [
        {
          id: "a",
          text: "4 times",
          correct: false,
          feedback:
            "Close — count the gaps. First + 4 inserted + last = 6 terms.",
        },
        {
          id: "b",
          text: "5 times",
          correct: true,
          feedback: "Correct! 6 terms means 5 jumps (multiplications) by r.",
        },
        {
          id: "c",
          text: "6 times",
          correct: false,
          feedback: "That would be too many jumps. There are 6 terms total.",
        },
        {
          id: "d",
          text: "3 times",
          correct: false,
          feedback: "Not enough jumps for 6 terms.",
        },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction:
        "How many total terms are there after inserting 4 terms between 2 and 6250?",
      hint1: "Count: first term + inserted terms + last term.",
      hint2: "That’s 1 + 4 + 1 = 6 terms.",
      hint3: "Total terms = 6",
      correctAnswer: "6|six",
      latex: "2,\\ \\_,\\ \\_,\\ \\_,\\ \\_,\\ 6250",
    },
    {
      id: 2,
      instruction:
        "So how many 'jumps' (multiplications by r) are there from 2 to 6250?",
      hint1: "If there are 6 terms, the exponent goes from 0 up to 5.",
      hint2: "That means r is multiplied 5 times to reach the last term.",
      hint3: "Number of jumps = 5",
      correctAnswer: "5|five",
      latex: "2 \\to 6250",
    },
    {
      id: 3,
      instruction:
        "Set up the equation using: last = first × r^(number of jumps).",
      hint1: "Use 6250 as last, 2 as first, and jumps = 5.",
      hint2: "Write: 6250 = 2 × r^5",
      hint3: "6250 = 2r^5",
      correctAnswer: "6250=2r^5|6250 = 2r^5|6250=2*r^5",
      latex: "6250 = 2r^5",
    },
    {
      id: 4,
      instruction: "Solve for r^5 by dividing both sides by 2.",
      hint1: "Divide 6250 by 2.",
      hint2: "6250 ÷ 2 = 3125",
      hint3: "r^5 = 3125",
      correctAnswer: "r^5=3125|3125",
      latex: "r^5 = \\frac{6250}{2}",
    },
    {
      id: 5,
      instruction: "Now find r (the 5th root of 3125). What is r?",
      hint1: "3125 is a power of 5.",
      hint2: "5^5 = 3125",
      hint3: "So r = 5",
      correctAnswer: "5|r=5",
      latex: "r = \\sqrt[5]{3125}",
    },
    {
      id: 6,
      instruction: "Write the 4 missing terms between 2 and 6250.",
      hint1: "Start multiplying by r=5: 2×5, then ×5 again…",
      hint2: "2→10→50→250→1250→6250",
      hint3: "Missing terms: 10, 50, 250, 1250",
      correctAnswer: "10,50,250,1250|10 50 250 1250|10;50;250;1250",
      latex: "2,\\ \\_,\\ \\_,\\ \\_,\\ \\_,\\ 6250",
    },
  ],
  fullQuestion: "Final answer: list the 4 inserted terms in order.",
  fullQuestionLatex: "10,\\ 50,\\ 250,\\ 1250",
};

export const mockQuestion2 = {
  id: "q2",
  topic: DEMO_TOPIC,
  topicKey: "geometric_progression",
  year: 2023,
  questionText:
    "In a geometric progression, the 1st term is 2 and the common ratio is 5. Find the 6th term.",
  questionLatex: "a_1=2,\\ r=5,\\ a_6=?",
  conceptTitle: "Geometric Progression (Nth Term)",
  conceptIntro:
    "You already know a GP grows by multiplying by the same ratio r.\n\n" +
    "To jump directly to a certain term, we use the nth-term formula:\n" +
    "aₙ = a × r^(n−1)\n\n" +
    "We’ll answer a quick concept check, then solve step by step.",
  conceptChecks: [
    {
      id: "cc1",
      question: "Which formula gives the nth term of a geometric progression?",
      options: [
        {
          id: "a",
          text: "aₙ = a + (n−1)d",
          correct: false,
          feedback: "That’s arithmetic progression (AP).",
        },
        {
          id: "b",
          text: "aₙ = a × r^(n−1)",
          correct: true,
          feedback: "Correct!  This is the GP nth-term formula.",
        },
        {
          id: "c",
          text: "aₙ = r^n",
          correct: false,
          feedback: "Missing the first term a.",
        },
        {
          id: "d",
          text: "aₙ = a × n × r",
          correct: false,
          feedback: "Not the GP formula.",
        },
      ],
    },
    {
      id: "cc2",
      question: "If n = 6, what is the exponent on r in aₙ = a × r^(n−1)?",
      options: [
        {
          id: "a",
          text: "6",
          correct: false,
          feedback: "Careful: it’s n−1, not n.",
        },
        {
          id: "b",
          text: "5",
          correct: true,
          feedback: "Yes because 6−1 = 5.",
        },
        {
          id: "c",
          text: "4",
          correct: false,
          feedback: "That would be for n=5.",
        },
        { id: "d", text: "1", correct: false, feedback: "Too small." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Write the nth term formula for a geometric progression.",
      hint1: "It uses the first term a and ratio r.",
      hint2: "Exponent is n−1.",
      hint3: "aₙ = a × r^(n−1)",
      correctAnswer: "a_n=ar^(n-1)|an=ar^(n-1)|a×r^(n-1)",
      latex: "a_n = a\\,r^{n-1}",
    },
    {
      id: 2,
      instruction: "Substitute a = 2, r = 5, n = 6 into the formula.",
      hint1: "Replace n with 6.",
      hint2: "a₆ = 2 × 5^(6−1).",
      hint3: "a₆ = 2 × 5^5",
      correctAnswer: "a6=2*5^5|a_6=2*5^5|2*5^5",
      latex: "a_6 = 2\\cdot 5^5",
    },
    {
      id: 3,
      instruction: "Compute 5^5.",
      hint1: "5^2=25, 5^3=125.",
      hint2: "5^4=625, 5^5=3125.",
      hint3: "5^5 = 3125",
      correctAnswer: "3125",
      latex: "5^5 = 3125",
    },
    {
      id: 4,
      instruction: "Now compute a₆ = 2 × 3125.",
      hint1: "Multiply by 2.",
      hint2: "3125×2 = 6250.",
      hint3: "a₆ = 6250",
      correctAnswer: "6250|a6=6250|a_6=6250",
      latex: "a_6 = 6250",
    },
    {
      id: 5,
      instruction:
        "Quick check: what is the sequence up to the 6th term (comma-separated)?",
      hint1: "Start at 2 and multiply by 5 each time.",
      hint2: "2, 10, 50, 250, 1250, 6250",
      hint3: "That confirms the 6th term is 6250.",
      correctAnswer: "2,10,50,250,1250,6250|2 10 50 250 1250 6250",
      latex: "2,10,50,250,1250,6250",
    },
    {
      id: 6,
      instruction: "Final: state the 6th term clearly.",
      hint1: "Just write a₆ = …",
      hint2: "a₆ = 6250",
      hint3: "Final answer: 6250",
      correctAnswer: "6250|a6=6250|a_6=6250",
      latex: "a_6 = 6250",
    },
  ],
  fullQuestion: "Final answer: Find the 6th term of the GP.",
  fullQuestionLatex: "a_6 = 6250",
};

// ✅ Use this in PracticeSession
export const mockQuestions = [mockQuestion1, mockQuestion2];

// Optional: keep mockQuestion pointing to Q1 to avoid breaking other pages
export const mockQuestion = mockQuestion1;
