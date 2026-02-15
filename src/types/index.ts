export interface User {
  name: string;
  email: string;
  classLevel: string;
  overallMastery: number;
  overallGain: number;
  streak: number;
  totalProblems: number;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  mastery: number;
  gain: number;
  color: string;
}

export interface PracticeStep {
  id: number;
  instruction: string;
  hint1: string;
  hint2: string;
  hint3: string;
  correctAnswer: string;
  latex?: string;
}

export interface PracticeQuestion {
  id: string;
  topic: string;
  year: number;
  questionText: string;
  questionLatex?: string;
  conceptTitle: string;
  conceptIntro: string;
  steps: PracticeStep[];
  fullQuestion: string;
  fullQuestionLatex?: string;
}
