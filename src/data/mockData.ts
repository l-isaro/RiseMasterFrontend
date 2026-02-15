import { User, Topic, PracticeQuestion } from "@/types";

export const mockUser: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  classLevel: "S3",
  overallMastery: 0.62,
  overallGain: 0.35,
  streak: 7,
  totalProblems: 84,
};

export const mockTopics: Topic[] = [
  { id: "algebra", name: "Algebra", icon: "Variable", mastery: 0.72, gain: 0.18, color: "primary" },
  { id: "geometry", name: "Geometry", icon: "Pentagon", mastery: 0.55, gain: 0.22, color: "accent" },
  { id: "trigonometry", name: "Trigonometry", icon: "Triangle", mastery: 0.48, gain: 0.12, color: "success" },
  { id: "statistics", name: "Statistics", icon: "BarChart3", mastery: 0.65, gain: 0.08, color: "primary" },
  { id: "calculus", name: "Calculus", icon: "TrendingUp", mastery: 0.38, gain: 0.15, color: "accent" },
  { id: "probability", name: "Probability", icon: "Dice5", mastery: 0.58, gain: 0.10, color: "success" },
];

export const mockQuestion: PracticeQuestion = {
  id: "q1",
  topic: "Algebra",
  year: 2023,
  questionText: "Solve for x: 2x² + 5x - 3 = 0",
  questionLatex: "2x^2 + 5x - 3 = 0",
  conceptTitle: "Quadratic Equations",
  conceptIntro: "Quadratic equations might sound fancy, but they're just equations where the highest power of x is 2. Think of them like puzzles — once you know the trick, they're actually pretty satisfying to solve! We'll use the quadratic formula here, which works every single time. No stress! 😊",
  steps: [
    {
      id: 1,
      instruction: "First, identify the values of a, b, and c from the equation 2x² + 5x - 3 = 0",
      hint1: "In ax² + bx + c = 0, compare with your equation...",
      hint2: "The number in front of x² is a, in front of x is b, and the constant is c",
      hint3: "a = 2, b = 5, c = -3",
      correctAnswer: "a=2, b=5, c=-3",
      latex: "ax^2 + bx + c = 0",
    },
    {
      id: 2,
      instruction: "Calculate the discriminant: b² - 4ac",
      hint1: "Plug in your values of a, b, and c",
      hint2: "That's 5² - 4(2)(-3)",
      hint3: "25 + 24 = 49",
      correctAnswer: "49",
      latex: "\\Delta = b^2 - 4ac",
    },
    {
      id: 3,
      instruction: "Apply the quadratic formula to find x",
      hint1: "x = (-b ± √Δ) / 2a",
      hint2: "x = (-5 ± √49) / 4 = (-5 ± 7) / 4",
      hint3: "x = 1/2 or x = -3",
      correctAnswer: "x=0.5, x=-3",
      latex: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}",
    },
  ],
  fullQuestion: "Now solve it all at once: 2x² + 5x - 3 = 0",
  fullQuestionLatex: "2x^2 + 5x - 3 = 0",
};
