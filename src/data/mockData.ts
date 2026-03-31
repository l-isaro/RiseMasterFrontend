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

// ============================================================================
// SEQUENCES
// ============================================================================

export const mockQuestion1 = {
  id: "q-gp-insert-terms",
  topicKey: "sequences",
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
    "a, ar, ar\u00B2, ar\u00B3, ...\n\n" +
    "Today's goal: find the missing 4 terms between 2 and 6250.\n\n" +
    "Before we start, answer 2 quick questions (multiple choice) to unlock the steps \uD83D\uDC47",
  conceptChecks: [
    {
      id: "cc1",
      question: "In a GP, each new term is made by\u2026",
      options: [
        { id: "a", text: "Adding the same number each time", correct: false, feedback: "That's an arithmetic progression (AP)." },
        { id: "b", text: "Multiplying by the same number each time", correct: true, feedback: "Yes! That constant multiplier is the ratio r." },
        { id: "c", text: "Squaring the previous term", correct: false, feedback: "Not for a GP. GP uses a constant multiplier." },
        { id: "d", text: "Subtracting the same number each time", correct: false, feedback: "That's also an arithmetic pattern, not GP." },
      ],
    },
    {
      id: "cc2",
      question: "If you insert 4 terms between first and last, how many times is r multiplied from first to last?",
      options: [
        { id: "a", text: "4 times", correct: false, feedback: "Close \u2014 count the gaps. First + 4 inserted + last = 6 terms." },
        { id: "b", text: "5 times", correct: true, feedback: "Correct! 6 terms means 5 jumps (multiplications) by r." },
        { id: "c", text: "6 times", correct: false, feedback: "That would be too many jumps. There are 6 terms total." },
        { id: "d", text: "3 times", correct: false, feedback: "Not enough jumps for 6 terms." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "How many total terms are there after inserting 4 terms between 2 and 6250?",
      hint1: "Count: first term + inserted terms + last term.",
      hint2: "That's 1 + 4 + 1 = 6 terms.",
      hint3: "Total terms = 6",
      correctAnswer: "6|six",
      latex: "2,\\ \\_,\\ \\_,\\ \\_,\\ \\_,\\ 6250",
    },
    {
      id: 2,
      instruction: "So how many 'jumps' (multiplications by r) are there from 2 to 6250?",
      hint1: "If there are 6 terms, the exponent goes from 0 up to 5.",
      hint2: "That means r is multiplied 5 times to reach the last term.",
      hint3: "Number of jumps = 5",
      correctAnswer: "5|five",
      latex: "2 \\to 6250",
    },
    {
      id: 3,
      instruction: "Set up the equation using: last = first \u00D7 r^(number of jumps).",
      hint1: "Use 6250 as last, 2 as first, and jumps = 5.",
      hint2: "Write: 6250 = 2 \u00D7 r^5",
      hint3: "6250 = 2r^5",
      correctAnswer: "6250=2r^5|6250 = 2r^5|6250=2*r^5",
      latex: "6250 = 2r^5",
    },
    {
      id: 4,
      instruction: "Solve for r^5 by dividing both sides by 2.",
      hint1: "Divide 6250 by 2.",
      hint2: "6250 \u00F7 2 = 3125",
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
      hint1: "Start multiplying by r=5: 2\u00D75, then \u00D75 again\u2026",
      hint2: "2\u219210\u219250\u2192250\u21921250\u21926250",
      hint3: "Missing terms: 10, 50, 250, 1250",
      correctAnswer: "10,50,250,1250|10 50 250 1250|10;50;250;1250",
      latex: "2,\\ \\_,\\ \\_,\\ \\_,\\ \\_,\\ 6250",
    },
  ],
  fullQuestion: "Final answer: list the 4 inserted terms in order.",
  fullQuestionLatex: "10,\\ 50,\\ 250,\\ 1250",
};

export const mockQuestion2 = {
  id: "q-gp-nth-term",
  topic: "Sequences",
  topicKey: "sequences",
  year: 2023,
  questionText:
    "In a geometric progression, the 1st term is 2 and the common ratio is 5. Find the 6th term.",
  questionLatex: "a_1=2,\\ r=5,\\ a_6=?",
  conceptTitle: "Geometric Progression (Nth Term)",
  conceptIntro:
    "You already know a GP grows by multiplying by the same ratio r.\n\n" +
    "To jump directly to a certain term, we use the nth-term formula:\n" +
    "a\u2099 = a \u00D7 r^(n\u22121)\n\n" +
    "We'll answer a quick concept check, then solve step by step.",
  conceptChecks: [
    {
      id: "cc1",
      question: "Which formula gives the nth term of a geometric progression?",
      options: [
        { id: "a", text: "a\u2099 = a + (n\u22121)d", correct: false, feedback: "That's arithmetic progression (AP)." },
        { id: "b", text: "a\u2099 = a \u00D7 r^(n\u22121)", correct: true, feedback: "Correct! This is the GP nth-term formula." },
        { id: "c", text: "a\u2099 = r^n", correct: false, feedback: "Missing the first term a." },
        { id: "d", text: "a\u2099 = a \u00D7 n \u00D7 r", correct: false, feedback: "Not the GP formula." },
      ],
    },
    {
      id: "cc2",
      question: "If n = 6, what is the exponent on r in a\u2099 = a \u00D7 r^(n\u22121)?",
      options: [
        { id: "a", text: "6", correct: false, feedback: "Careful: it's n\u22121, not n." },
        { id: "b", text: "5", correct: true, feedback: "Yes because 6\u22121 = 5." },
        { id: "c", text: "4", correct: false, feedback: "That would be for n=5." },
        { id: "d", text: "1", correct: false, feedback: "Too small." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Write the nth term formula for a geometric progression.",
      hint1: "It uses the first term a and ratio r.",
      hint2: "Exponent is n\u22121.",
      hint3: "a\u2099 = a \u00D7 r^(n\u22121)",
      correctAnswer: "a_n=ar^(n-1)|an=ar^(n-1)|a\u00D7r^(n-1)",
      latex: "a_n = a\\,r^{n-1}",
    },
    {
      id: 2,
      instruction: "Substitute a = 2, r = 5, n = 6 into the formula.",
      hint1: "Replace n with 6.",
      hint2: "a\u2086 = 2 \u00D7 5^(6\u22121).",
      hint3: "a\u2086 = 2 \u00D7 5^5",
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
      instruction: "Now compute a\u2086 = 2 \u00D7 3125.",
      hint1: "Multiply by 2.",
      hint2: "3125\u00D72 = 6250.",
      hint3: "a\u2086 = 6250",
      correctAnswer: "6250|a6=6250|a_6=6250",
      latex: "a_6 = 6250",
    },
    {
      id: 5,
      instruction: "Quick check: what is the sequence up to the 6th term (comma-separated)?",
      hint1: "Start at 2 and multiply by 5 each time.",
      hint2: "2, 10, 50, 250, 1250, 6250",
      hint3: "That confirms the 6th term is 6250.",
      correctAnswer: "2,10,50,250,1250,6250|2 10 50 250 1250 6250",
      latex: "2,10,50,250,1250,6250",
    },
    {
      id: 6,
      instruction: "Final: state the 6th term clearly.",
      hint1: "Just write a\u2086 = \u2026",
      hint2: "a\u2086 = 6250",
      hint3: "Final answer: 6250",
      correctAnswer: "6250|a6=6250|a_6=6250",
      latex: "a_6 = 6250",
    },
  ],
  fullQuestion: "Final answer: Find the 6th term of the GP.",
  fullQuestionLatex: "a_6 = 6250",
};

const sequencesQ3 = {
  id: "q-ap-sum",
  topicKey: "sequences",
  topic: "Sequences",
  year: 2022,
  questionText: "Find the sum of the first 20 terms of the arithmetic progression: 3, 7, 11, 15, \u2026",
  questionLatex: "S_{20} = ?",
  conceptTitle: "Arithmetic Progression (Sum)",
  conceptIntro:
    "An arithmetic progression (AP) is a sequence where each term increases by a constant difference d.\n\n" +
    "The sum of the first n terms is:\n" +
    "S\u2099 = n/2 \u00D7 (2a + (n\u22121)d)\n\n" +
    "or equivalently S\u2099 = n/2 \u00D7 (first + last).\n\n" +
    "Let's find S\u2082\u2080 for the sequence 3, 7, 11, 15, \u2026",
  conceptChecks: [
    {
      id: "cc1",
      question: "What is the common difference d of the AP: 3, 7, 11, 15, \u2026?",
      options: [
        { id: "a", text: "3", correct: false, feedback: "That's the first term, not the difference." },
        { id: "b", text: "4", correct: true, feedback: "Correct! 7\u22123 = 4." },
        { id: "c", text: "5", correct: false, feedback: "Check: 7\u22123 = ?" },
        { id: "d", text: "2", correct: false, feedback: "7\u22123 \u2260 2." },
      ],
    },
    {
      id: "cc2",
      question: "Which formula gives the sum of the first n terms of an AP?",
      options: [
        { id: "a", text: "S\u2099 = a \u00D7 r^n", correct: false, feedback: "That's related to GP, not AP." },
        { id: "b", text: "S\u2099 = n/2 \u00D7 (2a + (n\u22121)d)", correct: true, feedback: "Yes! This is the AP sum formula." },
        { id: "c", text: "S\u2099 = n \u00D7 d", correct: false, feedback: "Missing the first term a." },
        { id: "d", text: "S\u2099 = a + nd", correct: false, feedback: "That's closer to the nth term, not the sum." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Identify the first term a and the common difference d.",
      hint1: "The first term is the first number in the sequence.",
      hint2: "a = 3, and d = 7 \u2212 3 = 4.",
      hint3: "a = 3, d = 4",
      correctAnswer: "a=3,d=4|a=3 d=4|3,4",
      latex: "a = 3,\\quad d = 4",
    },
    {
      id: 2,
      instruction: "Write the sum formula with n = 20.",
      hint1: "S\u2099 = n/2 \u00D7 (2a + (n\u22121)d).",
      hint2: "S\u2082\u2080 = 20/2 \u00D7 (2(3) + (20\u22121)(4)).",
      hint3: "S\u2082\u2080 = 10 \u00D7 (6 + 76)",
      correctAnswer: "S20=10*(6+76)|10*(6+76)|10(6+76)",
      latex: "S_{20} = 10(6 + 76)",
    },
    {
      id: 3,
      instruction: "Compute the value inside the brackets: 6 + 76.",
      hint1: "Add 6 and 76.",
      hint2: "6 + 76 = 82.",
      hint3: "82",
      correctAnswer: "82",
      latex: "6 + 76 = 82",
    },
    {
      id: 4,
      instruction: "Now multiply: S\u2082\u2080 = 10 \u00D7 82.",
      hint1: "Multiply 10 by 82.",
      hint2: "10 \u00D7 82 = 820.",
      hint3: "S\u2082\u2080 = 820",
      correctAnswer: "820|S20=820",
      latex: "S_{20} = 820",
    },
  ],
  fullQuestion: "Final answer: What is S\u2082\u2080?",
  fullQuestionLatex: "S_{20} = 820",
};

// ============================================================================
// EXPONENTIAL FUNCTIONS
// ============================================================================

const expQ1 = {
  id: "q-exp-solve",
  topicKey: "exponentials",
  topic: "Exponential Functions",
  year: 2022,
  questionText: "Solve for x: 3^(2x\u22121) = 27",
  questionLatex: "3^{2x-1} = 27",
  conceptTitle: "Solving Exponential Equations",
  conceptIntro:
    "When both sides of an equation can be written with the same base, we can equate the exponents.\n\n" +
    "Key idea: if a^m = a^n then m = n.\n\n" +
    "Here we need to express 27 as a power of 3, then solve for x.",
  conceptChecks: [
    {
      id: "cc1",
      question: "27 expressed as a power of 3 is\u2026",
      options: [
        { id: "a", text: "3\u00B2", correct: false, feedback: "3\u00B2 = 9, not 27." },
        { id: "b", text: "3\u00B3", correct: true, feedback: "Correct! 3\u00B3 = 27." },
        { id: "c", text: "3\u2074", correct: false, feedback: "3\u2074 = 81." },
        { id: "d", text: "3\u00B9", correct: false, feedback: "3\u00B9 = 3." },
      ],
    },
    {
      id: "cc2",
      question: "If 3^(2x\u22121) = 3\u00B3, what can we conclude?",
      options: [
        { id: "a", text: "2x\u22121 = 3", correct: true, feedback: "Yes! Same base means exponents are equal." },
        { id: "b", text: "2x = 3", correct: false, feedback: "Don't forget the \u22121 in the exponent." },
        { id: "c", text: "x = 3", correct: false, feedback: "We need to solve the exponent equation first." },
        { id: "d", text: "2x\u22121 = 27", correct: false, feedback: "We compare exponents, not the value." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Express 27 as a power of 3.",
      hint1: "What is 3 \u00D7 3 \u00D7 3?",
      hint2: "3\u00B3 = 27.",
      hint3: "27 = 3\u00B3",
      correctAnswer: "3^3|27=3^3",
      latex: "27 = 3^3",
    },
    {
      id: 2,
      instruction: "Rewrite the equation with the same base on both sides.",
      hint1: "Replace 27 with 3\u00B3.",
      hint2: "3^(2x\u22121) = 3\u00B3.",
      hint3: "3^(2x\u22121) = 3^3",
      correctAnswer: "3^(2x-1)=3^3",
      latex: "3^{2x-1} = 3^3",
    },
    {
      id: 3,
      instruction: "Since the bases are equal, set the exponents equal.",
      hint1: "If a^m = a^n, then m = n.",
      hint2: "2x \u2212 1 = 3.",
      hint3: "2x \u2212 1 = 3",
      correctAnswer: "2x-1=3",
      latex: "2x - 1 = 3",
    },
    {
      id: 4,
      instruction: "Solve for x.",
      hint1: "Add 1 to both sides: 2x = 4.",
      hint2: "Divide by 2: x = 2.",
      hint3: "x = 2",
      correctAnswer: "2|x=2",
      latex: "x = 2",
    },
  ],
  fullQuestion: "Final answer: What is x?",
  fullQuestionLatex: "x = 2",
};

const expQ2 = {
  id: "q-exp-decay",
  topicKey: "exponentials",
  topic: "Exponential Functions",
  year: 2021,
  questionText:
    "A radioactive substance decays so that after t years the mass is M = 100\u00B7e^(\u22120.03t) grams. Find the mass after 10 years (round to 1 decimal).",
  questionLatex: "M = 100e^{-0.03t},\\quad t = 10",
  conceptTitle: "Exponential Decay",
  conceptIntro:
    "Exponential decay models describe quantities that decrease at a rate proportional to their current value.\n\n" +
    "The general form is M = M\u2080\u00B7e^(\u2212kt), where:\n" +
    "\u2022 M\u2080 is the initial amount\n" +
    "\u2022 k is the decay constant\n" +
    "\u2022 t is time\n\n" +
    "We just substitute t = 10 and compute.",
  conceptChecks: [
    {
      id: "cc1",
      question: "In M = 100\u00B7e^(\u22120.03t), what is the initial mass (at t = 0)?",
      options: [
        { id: "a", text: "0 grams", correct: false, feedback: "e^0 = 1, so M = 100\u00B71 = 100." },
        { id: "b", text: "100 grams", correct: true, feedback: "Correct! At t=0, e^0=1, so M=100." },
        { id: "c", text: "0.03 grams", correct: false, feedback: "0.03 is the decay constant, not the mass." },
        { id: "d", text: "97 grams", correct: false, feedback: "That's not how substitution works at t=0." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Substitute t = 10 into the formula.",
      hint1: "Replace t with 10.",
      hint2: "M = 100\u00B7e^(\u22120.03 \u00D7 10).",
      hint3: "M = 100\u00B7e^(\u22120.3)",
      correctAnswer: "100*e^(-0.3)|100e^(-0.3)|100e^-0.3",
      latex: "M = 100\\cdot e^{-0.3}",
    },
    {
      id: 2,
      instruction: "Compute e^(\u22120.3) (to 4 decimal places).",
      hint1: "Use a calculator or recall e^(\u22120.3) \u2248 0.7408.",
      hint2: "e^(\u22120.3) \u2248 0.7408.",
      hint3: "0.7408",
      correctAnswer: "0.7408|0.741",
      latex: "e^{-0.3} \\approx 0.7408",
    },
    {
      id: 3,
      instruction: "Multiply: M = 100 \u00D7 0.7408.",
      hint1: "Move the decimal.",
      hint2: "100 \u00D7 0.7408 = 74.08.",
      hint3: "M \u2248 74.1 grams",
      correctAnswer: "74.1|74.08",
      latex: "M \\approx 74.1\\text{ g}",
    },
  ],
  fullQuestion: "Final answer: What is the mass after 10 years?",
  fullQuestionLatex: "M \\approx 74.1\\text{ grams}",
};

const expQ3 = {
  id: "q-exp-growth",
  topicKey: "exponentials",
  topic: "Exponential Functions",
  year: 2023,
  questionText: "Solve for x: 2^x = 64",
  questionLatex: "2^x = 64",
  conceptTitle: "Exponential Equations (Same Base)",
  conceptIntro:
    "When we can express both sides with the same base, we equate exponents.\n\n" +
    "64 is a power of 2. Find which power, then solve.",
  conceptChecks: [
    {
      id: "cc1",
      question: "64 as a power of 2 is\u2026",
      options: [
        { id: "a", text: "2\u2075 = 32", correct: false, feedback: "2\u2075 = 32, not 64." },
        { id: "b", text: "2\u2076 = 64", correct: true, feedback: "Correct! 2\u2076 = 64." },
        { id: "c", text: "2\u2077 = 128", correct: false, feedback: "That's too large." },
        { id: "d", text: "2\u2074 = 16", correct: false, feedback: "Too small." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Express 64 as a power of 2.",
      hint1: "2, 4, 8, 16, 32, 64 \u2014 count the powers.",
      hint2: "2\u2076 = 64.",
      hint3: "64 = 2^6",
      correctAnswer: "2^6|64=2^6",
      latex: "64 = 2^6",
    },
    {
      id: 2,
      instruction: "Set the exponents equal: 2^x = 2^6.",
      hint1: "Same base \u2192 same exponent.",
      hint2: "x = 6.",
      hint3: "x = 6",
      correctAnswer: "6|x=6",
      latex: "x = 6",
    },
  ],
  fullQuestion: "Final answer: What is x?",
  fullQuestionLatex: "x = 6",
};

// ============================================================================
// TRIGONOMETRY
// ============================================================================

const trigQ1 = {
  id: "q-trig-exact",
  topicKey: "trig",
  topic: "Trigonometry",
  year: 2022,
  questionText: "Find the exact value of sin(60\u00B0) + cos(30\u00B0).",
  questionLatex: "\\sin 60\\degree + \\cos 30\\degree",
  conceptTitle: "Exact Trigonometric Values",
  conceptIntro:
    "For angles 30\u00B0, 45\u00B0, and 60\u00B0 we have exact values:\n\n" +
    "sin(30\u00B0) = 1/2,  cos(30\u00B0) = \u221A3/2\n" +
    "sin(45\u00B0) = \u221A2/2, cos(45\u00B0) = \u221A2/2\n" +
    "sin(60\u00B0) = \u221A3/2, cos(60\u00B0) = 1/2\n\n" +
    "Just look up and add!",
  conceptChecks: [
    {
      id: "cc1",
      question: "What is sin(60\u00B0)?",
      options: [
        { id: "a", text: "1/2", correct: false, feedback: "That's sin(30\u00B0)." },
        { id: "b", text: "\u221A3/2", correct: true, feedback: "Correct!" },
        { id: "c", text: "\u221A2/2", correct: false, feedback: "That's sin(45\u00B0)." },
        { id: "d", text: "1", correct: false, feedback: "sin(90\u00B0) = 1, not sin(60\u00B0)." },
      ],
    },
    {
      id: "cc2",
      question: "What is cos(30\u00B0)?",
      options: [
        { id: "a", text: "1/2", correct: false, feedback: "That's cos(60\u00B0)." },
        { id: "b", text: "\u221A3/2", correct: true, feedback: "Correct! cos(30\u00B0) = \u221A3/2." },
        { id: "c", text: "\u221A2/2", correct: false, feedback: "That's cos(45\u00B0)." },
        { id: "d", text: "0", correct: false, feedback: "cos(90\u00B0) = 0." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Write the exact value of sin(60\u00B0).",
      hint1: "It's one of the standard angles.",
      hint2: "sin(60\u00B0) = \u221A3/2.",
      hint3: "\u221A3/2",
      correctAnswer: "\u221A3/2|sqrt(3)/2",
      latex: "\\sin 60\\degree = \\frac{\\sqrt{3}}{2}",
    },
    {
      id: 2,
      instruction: "Write the exact value of cos(30\u00B0).",
      hint1: "cos(30\u00B0) and sin(60\u00B0) are co-functions.",
      hint2: "cos(30\u00B0) = \u221A3/2.",
      hint3: "\u221A3/2",
      correctAnswer: "\u221A3/2|sqrt(3)/2",
      latex: "\\cos 30\\degree = \\frac{\\sqrt{3}}{2}",
    },
    {
      id: 3,
      instruction: "Add them together.",
      hint1: "\u221A3/2 + \u221A3/2.",
      hint2: "= 2\u221A3/2 = \u221A3.",
      hint3: "\u221A3",
      correctAnswer: "\u221A3|sqrt(3)|1.732",
      latex: "\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{3}}{2} = \\sqrt{3}",
    },
  ],
  fullQuestion: "Final answer: sin(60\u00B0) + cos(30\u00B0) = ?",
  fullQuestionLatex: "\\sqrt{3}",
};

const trigQ2 = {
  id: "q-trig-identity",
  topicKey: "trig",
  topic: "Trigonometry",
  year: 2023,
  questionText: "Prove that (sin\u00B2\u03B8 + cos\u00B2\u03B8) / cos\u00B2\u03B8 = 1 + tan\u00B2\u03B8, then evaluate at \u03B8 = 45\u00B0.",
  questionLatex: "\\frac{\\sin^2\\theta + \\cos^2\\theta}{\\cos^2\\theta} = 1 + \\tan^2\\theta",
  conceptTitle: "Trigonometric Identities",
  conceptIntro:
    "The Pythagorean identity states sin\u00B2\u03B8 + cos\u00B2\u03B8 = 1.\n\n" +
    "We can divide each term by cos\u00B2\u03B8 to derive related identities.\n\n" +
    "Remember: tan\u03B8 = sin\u03B8/cos\u03B8.",
  conceptChecks: [
    {
      id: "cc1",
      question: "What is sin\u00B2\u03B8 + cos\u00B2\u03B8?",
      options: [
        { id: "a", text: "0", correct: false, feedback: "The Pythagorean identity gives 1." },
        { id: "b", text: "1", correct: true, feedback: "Yes! This is the Pythagorean identity." },
        { id: "c", text: "2", correct: false, feedback: "Not quite." },
        { id: "d", text: "tan\u00B2\u03B8", correct: false, feedback: "That's a different identity." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Split the fraction: (sin\u00B2\u03B8/cos\u00B2\u03B8) + (cos\u00B2\u03B8/cos\u00B2\u03B8).",
      hint1: "Divide each term in the numerator by cos\u00B2\u03B8.",
      hint2: "sin\u00B2\u03B8/cos\u00B2\u03B8 = tan\u00B2\u03B8 and cos\u00B2\u03B8/cos\u00B2\u03B8 = 1.",
      hint3: "tan\u00B2\u03B8 + 1",
      correctAnswer: "tan^2+1|1+tan^2",
      latex: "\\tan^2\\theta + 1",
    },
    {
      id: 2,
      instruction: "This confirms the identity. Now evaluate at \u03B8 = 45\u00B0: what is tan(45\u00B0)?",
      hint1: "tan(45\u00B0) is a standard value.",
      hint2: "tan(45\u00B0) = 1.",
      hint3: "1",
      correctAnswer: "1|tan(45)=1",
      latex: "\\tan 45\\degree = 1",
    },
    {
      id: 3,
      instruction: "Compute 1 + tan\u00B2(45\u00B0).",
      hint1: "1 + 1\u00B2 = ?",
      hint2: "1 + 1 = 2.",
      hint3: "2",
      correctAnswer: "2",
      latex: "1 + \\tan^2 45\\degree = 1 + 1 = 2",
    },
  ],
  fullQuestion: "Final answer: 1 + tan\u00B2(45\u00B0) = ?",
  fullQuestionLatex: "2",
};

const trigQ3 = {
  id: "q-trig-equation",
  topicKey: "trig",
  topic: "Trigonometry",
  year: 2021,
  questionText: "Solve 2sin(x) \u2212 1 = 0 for 0\u00B0 \u2264 x \u2264 360\u00B0.",
  questionLatex: "2\\sin x - 1 = 0,\\quad 0\\degree \\le x \\le 360\\degree",
  conceptTitle: "Solving Trigonometric Equations",
  conceptIntro:
    "To solve trig equations, isolate the trig function, find the reference angle, then use the CAST rule (or unit circle) to find all solutions in the given range.\n\n" +
    "sin(x) = 1/2 \u2192 reference angle is 30\u00B0.",
  conceptChecks: [
    {
      id: "cc1",
      question: "If sin(x) = 1/2, the reference angle is\u2026",
      options: [
        { id: "a", text: "30\u00B0", correct: true, feedback: "Yes! sin(30\u00B0) = 1/2." },
        { id: "b", text: "45\u00B0", correct: false, feedback: "sin(45\u00B0) = \u221A2/2." },
        { id: "c", text: "60\u00B0", correct: false, feedback: "sin(60\u00B0) = \u221A3/2." },
        { id: "d", text: "90\u00B0", correct: false, feedback: "sin(90\u00B0) = 1." },
      ],
    },
    {
      id: "cc2",
      question: "Sine is positive in which quadrants?",
      options: [
        { id: "a", text: "Q1 and Q2", correct: true, feedback: "Correct! (All-Sin-Tan-Cos or the CAST rule)." },
        { id: "b", text: "Q1 and Q4", correct: false, feedback: "Q4 has positive cosine, not sine." },
        { id: "c", text: "Q1 only", correct: false, feedback: "Also positive in Q2." },
        { id: "d", text: "Q2 and Q3", correct: false, feedback: "Sine is negative in Q3." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Isolate sin(x): 2sin(x) = 1 \u2192 sin(x) = ?",
      hint1: "Divide both sides by 2.",
      hint2: "sin(x) = 1/2.",
      hint3: "sin(x) = 1/2",
      correctAnswer: "1/2|0.5|sin(x)=1/2|sin(x)=0.5",
      latex: "\\sin x = \\frac{1}{2}",
    },
    {
      id: 2,
      instruction: "What is the reference angle where sin = 1/2?",
      hint1: "Think of standard angles: 30\u00B0, 45\u00B0, 60\u00B0.",
      hint2: "sin(30\u00B0) = 1/2.",
      hint3: "30\u00B0",
      correctAnswer: "30|30\u00B0",
      latex: "\\text{ref angle} = 30\\degree",
    },
    {
      id: 3,
      instruction: "Sine is positive in Q1 and Q2. Give both solutions.",
      hint1: "Q1: x = 30\u00B0. Q2: x = 180\u00B0 \u2212 30\u00B0.",
      hint2: "x = 30\u00B0 or x = 150\u00B0.",
      hint3: "30\u00B0, 150\u00B0",
      correctAnswer: "30,150|x=30,x=150|30 and 150",
      latex: "x = 30\\degree,\\; x = 150\\degree",
    },
  ],
  fullQuestion: "Final answer: x = ?",
  fullQuestionLatex: "x = 30\\degree\\text{ or } x = 150\\degree",
};

// ============================================================================
// CALCULUS
// ============================================================================

const calcQ1 = {
  id: "q-calc-derivative",
  topicKey: "calculus",
  topic: "Calculus",
  year: 2023,
  questionText: "Differentiate f(x) = 3x\u2074 \u2212 2x\u00B2 + 5x \u2212 7.",
  questionLatex: "f(x) = 3x^4 - 2x^2 + 5x - 7",
  conceptTitle: "Basic Differentiation (Power Rule)",
  conceptIntro:
    "The power rule is the most fundamental rule of differentiation:\n\n" +
    "If f(x) = x\u207F, then f'(x) = n\u00B7x^(n\u22121)\n\n" +
    "Apply it term by term. Constants vanish.",
  conceptChecks: [
    {
      id: "cc1",
      question: "Using the power rule, the derivative of x\u2074 is\u2026",
      options: [
        { id: "a", text: "4x\u00B3", correct: true, feedback: "Correct! Bring down the 4, reduce power by 1." },
        { id: "b", text: "x\u00B3", correct: false, feedback: "Don't forget the coefficient." },
        { id: "c", text: "4x\u2074", correct: false, feedback: "The exponent should decrease." },
        { id: "d", text: "3x\u00B3", correct: false, feedback: "The power was 4, not 3." },
      ],
    },
    {
      id: "cc2",
      question: "What is the derivative of a constant (like \u22127)?",
      options: [
        { id: "a", text: "\u22127", correct: false, feedback: "Constants don't survive differentiation." },
        { id: "b", text: "0", correct: true, feedback: "Yes! The derivative of any constant is 0." },
        { id: "c", text: "1", correct: false, feedback: "Only d/dx(x) = 1." },
        { id: "d", text: "\u22121", correct: false, feedback: "Not for a constant." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Differentiate the first term: d/dx(3x\u2074).",
      hint1: "Use the power rule: multiply by exponent, reduce by 1.",
      hint2: "3 \u00D7 4 = 12, x^(4\u22121) = x\u00B3.",
      hint3: "12x\u00B3",
      correctAnswer: "12x^3",
      latex: "\\frac{d}{dx}(3x^4) = 12x^3",
    },
    {
      id: 2,
      instruction: "Differentiate \u22122x\u00B2.",
      hint1: "\u22122 \u00D7 2 = \u22124.",
      hint2: "x^(2\u22121) = x.",
      hint3: "\u22124x",
      correctAnswer: "-4x",
      latex: "\\frac{d}{dx}(-2x^2) = -4x",
    },
    {
      id: 3,
      instruction: "Differentiate 5x.",
      hint1: "5x = 5x\u00B9.",
      hint2: "5 \u00D7 1 = 5, x\u2070 = 1.",
      hint3: "5",
      correctAnswer: "5",
      latex: "\\frac{d}{dx}(5x) = 5",
    },
    {
      id: 4,
      instruction: "Differentiate \u22127.",
      hint1: "What is the derivative of a constant?",
      hint2: "It's 0.",
      hint3: "0",
      correctAnswer: "0",
      latex: "\\frac{d}{dx}(-7) = 0",
    },
    {
      id: 5,
      instruction: "Write the full derivative f'(x).",
      hint1: "Combine all term derivatives.",
      hint2: "12x\u00B3 \u2212 4x + 5.",
      hint3: "f'(x) = 12x\u00B3 \u2212 4x + 5",
      correctAnswer: "12x^3-4x+5|12x^3 - 4x + 5",
      latex: "f'(x) = 12x^3 - 4x + 5",
    },
  ],
  fullQuestion: "Final answer: f'(x) = ?",
  fullQuestionLatex: "f'(x) = 12x^3 - 4x + 5",
};

const calcQ2 = {
  id: "q-calc-integral",
  topicKey: "calculus",
  topic: "Calculus",
  year: 2022,
  questionText: "Evaluate the definite integral: \u222B\u2080\u00B2 (3x\u00B2 + 2) dx.",
  questionLatex: "\\int_0^2 (3x^2 + 2)\\,dx",
  conceptTitle: "Definite Integrals",
  conceptIntro:
    "To evaluate a definite integral:\n" +
    "1. Find the antiderivative F(x)\n" +
    "2. Compute F(b) \u2212 F(a)\n\n" +
    "The reverse power rule: \u222Bx\u207F dx = x^(n+1)/(n+1) + C",
  conceptChecks: [
    {
      id: "cc1",
      question: "The antiderivative of x\u00B2 is\u2026",
      options: [
        { id: "a", text: "x\u00B3/3", correct: true, feedback: "Correct! \u222Bx\u00B2 dx = x\u00B3/3 + C." },
        { id: "b", text: "2x", correct: false, feedback: "That's the derivative of x\u00B2, not its antiderivative." },
        { id: "c", text: "x\u00B3", correct: false, feedback: "Don't forget to divide by the new exponent." },
        { id: "d", text: "x\u00B2/2", correct: false, feedback: "Increase the power first." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Find the antiderivative of 3x\u00B2.",
      hint1: "\u222B3x\u00B2 dx = 3 \u00D7 x\u00B3/3.",
      hint2: "= x\u00B3.",
      hint3: "x\u00B3",
      correctAnswer: "x^3",
      latex: "\\int 3x^2\\,dx = x^3",
    },
    {
      id: 2,
      instruction: "Find the antiderivative of 2.",
      hint1: "\u222B2 dx = 2x.",
      hint2: "Just 2x.",
      hint3: "2x",
      correctAnswer: "2x",
      latex: "\\int 2\\,dx = 2x",
    },
    {
      id: 3,
      instruction: "So F(x) = x\u00B3 + 2x. Compute F(2).",
      hint1: "Substitute x = 2.",
      hint2: "2\u00B3 + 2(2) = 8 + 4 = 12.",
      hint3: "12",
      correctAnswer: "12",
      latex: "F(2) = 8 + 4 = 12",
    },
    {
      id: 4,
      instruction: "Compute F(0).",
      hint1: "Substitute x = 0.",
      hint2: "0\u00B3 + 2(0) = 0.",
      hint3: "0",
      correctAnswer: "0",
      latex: "F(0) = 0",
    },
    {
      id: 5,
      instruction: "Final: F(2) \u2212 F(0) = ?",
      hint1: "12 \u2212 0 = 12.",
      hint2: "The definite integral equals 12.",
      hint3: "12",
      correctAnswer: "12",
      latex: "\\int_0^2 (3x^2+2)\\,dx = 12",
    },
  ],
  fullQuestion: "Final answer: \u222B\u2080\u00B2 (3x\u00B2 + 2) dx = ?",
  fullQuestionLatex: "12",
};

const calcQ3 = {
  id: "q-calc-chain",
  topicKey: "calculus",
  topic: "Calculus",
  year: 2023,
  questionText: "Differentiate f(x) = (2x + 3)\u2075 using the chain rule.",
  questionLatex: "f(x) = (2x+3)^5",
  conceptTitle: "Chain Rule",
  conceptIntro:
    "The chain rule lets us differentiate composite functions:\n\n" +
    "If f(x) = [g(x)]\u207F, then f'(x) = n\u00B7[g(x)]^(n\u22121)\u00B7g'(x)\n\n" +
    "Here g(x) = 2x+3 and n = 5.",
  conceptChecks: [
    {
      id: "cc1",
      question: "If g(x) = 2x + 3, what is g'(x)?",
      options: [
        { id: "a", text: "2", correct: true, feedback: "Correct! The derivative of 2x+3 is 2." },
        { id: "b", text: "2x", correct: false, feedback: "Differentiate the constant too \u2014 it vanishes." },
        { id: "c", text: "3", correct: false, feedback: "The derivative of 3 is 0, and d/dx(2x)=2." },
        { id: "d", text: "5", correct: false, feedback: "5 is the outer exponent, not the derivative of g." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Identify the outer function and inner function.",
      hint1: "Outer: ( )\u2075, Inner: 2x+3.",
      hint2: "We'll apply the power rule to the outer and multiply by the derivative of the inner.",
      hint3: "Outer: u\u2075, Inner: u = 2x+3",
      correctAnswer: "u^5,u=2x+3|outer=u^5,inner=2x+3|(2x+3)^5",
      latex: "u = 2x+3,\\quad f = u^5",
    },
    {
      id: 2,
      instruction: "Apply the chain rule: f'(x) = 5\u00B7(2x+3)\u2074 \u00B7 d/dx(2x+3).",
      hint1: "d/dx(2x+3) = 2.",
      hint2: "f'(x) = 5\u00B7(2x+3)\u2074 \u00B7 2.",
      hint3: "= 10(2x+3)\u2074",
      correctAnswer: "10(2x+3)^4|10*(2x+3)^4",
      latex: "f'(x) = 10(2x+3)^4",
    },
  ],
  fullQuestion: "Final answer: f'(x) = ?",
  fullQuestionLatex: "f'(x) = 10(2x+3)^4",
};

// ============================================================================
// COMPLEX NUMBERS
// ============================================================================

const complexQ1 = {
  id: "q-complex-add-mult",
  topicKey: "complex",
  topic: "Complex Numbers",
  year: 2022,
  questionText: "Let z\u2081 = 3 + 2i and z\u2082 = 1 \u2212 4i. Find z\u2081 \u00B7 z\u2082.",
  questionLatex: "z_1 = 3+2i,\\quad z_2 = 1-4i,\\quad z_1 z_2 = ?",
  conceptTitle: "Multiplying Complex Numbers",
  conceptIntro:
    "To multiply complex numbers, use FOIL (or distribution) and remember that i\u00B2 = \u22121.\n\n" +
    "(a + bi)(c + di) = ac + adi + bci + bdi\u00B2\n" +
    "= (ac \u2212 bd) + (ad + bc)i",
  conceptChecks: [
    {
      id: "cc1",
      question: "What is i\u00B2?",
      options: [
        { id: "a", text: "1", correct: false, feedback: "i\u00B2 = \u22121 by definition." },
        { id: "b", text: "\u22121", correct: true, feedback: "Correct! This is the defining property of i." },
        { id: "c", text: "i", correct: false, feedback: "i\u00B2 \u2260 i." },
        { id: "d", text: "\u2212i", correct: false, feedback: "That's i\u00B3." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Expand (3 + 2i)(1 \u2212 4i) using FOIL.",
      hint1: "First: 3\u00D71, Outer: 3\u00D7(\u22124i), Inner: 2i\u00D71, Last: 2i\u00D7(\u22124i).",
      hint2: "= 3 \u2212 12i + 2i \u2212 8i\u00B2.",
      hint3: "3 \u2212 12i + 2i \u2212 8i\u00B2",
      correctAnswer: "3-12i+2i-8i^2",
      latex: "3 - 12i + 2i - 8i^2",
    },
    {
      id: 2,
      instruction: "Replace i\u00B2 with \u22121 and simplify.",
      hint1: "\u22128i\u00B2 = \u22128(\u22121) = 8.",
      hint2: "3 + 8 = 11 and \u221212i + 2i = \u221210i.",
      hint3: "11 \u2212 10i",
      correctAnswer: "11-10i|11 - 10i",
      latex: "11 - 10i",
    },
  ],
  fullQuestion: "Final answer: z\u2081 \u00B7 z\u2082 = ?",
  fullQuestionLatex: "11 - 10i",
};

const complexQ2 = {
  id: "q-complex-modulus",
  topicKey: "complex",
  topic: "Complex Numbers",
  year: 2023,
  questionText: "Find the modulus and argument of z = 1 + \u221A3\u00B7i.",
  questionLatex: "z = 1 + \\sqrt{3}\\,i",
  conceptTitle: "Modulus and Argument",
  conceptIntro:
    "For z = a + bi:\n" +
    "\u2022 Modulus |z| = \u221A(a\u00B2 + b\u00B2)\n" +
    "\u2022 Argument \u03B8 = arctan(b/a) (adjusted for the correct quadrant)\n\n" +
    "The modulus is the 'distance' from the origin; the argument is the angle.",
  conceptChecks: [
    {
      id: "cc1",
      question: "The modulus of z = a + bi is\u2026",
      options: [
        { id: "a", text: "a + b", correct: false, feedback: "Not a simple sum." },
        { id: "b", text: "\u221A(a\u00B2 + b\u00B2)", correct: true, feedback: "Yes! Like the Pythagorean theorem." },
        { id: "c", text: "a\u00B2 + b\u00B2", correct: false, feedback: "That's |z|\u00B2 (modulus squared)." },
        { id: "d", text: "|a \u2212 b|", correct: false, feedback: "Not the modulus formula." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Identify a and b for z = 1 + \u221A3\u00B7i.",
      hint1: "a is the real part, b is the imaginary coefficient.",
      hint2: "a = 1, b = \u221A3.",
      hint3: "a = 1, b = \u221A3",
      correctAnswer: "a=1,b=sqrt(3)|1,sqrt(3)",
      latex: "a = 1,\\; b = \\sqrt{3}",
    },
    {
      id: 2,
      instruction: "Compute |z| = \u221A(a\u00B2 + b\u00B2).",
      hint1: "1\u00B2 + (\u221A3)\u00B2 = 1 + 3 = 4.",
      hint2: "\u221A4 = 2.",
      hint3: "|z| = 2",
      correctAnswer: "2||z|=2",
      latex: "|z| = \\sqrt{1 + 3} = 2",
    },
    {
      id: 3,
      instruction: "Find the argument \u03B8 = arctan(b/a).",
      hint1: "arctan(\u221A3/1) = arctan(\u221A3).",
      hint2: "arctan(\u221A3) = 60\u00B0 (or \u03C0/3).",
      hint3: "\u03B8 = 60\u00B0",
      correctAnswer: "60|60\u00B0|pi/3",
      latex: "\\theta = \\arctan(\\sqrt{3}) = 60\\degree",
    },
  ],
  fullQuestion: "Final answer: |z| and arg(z)?",
  fullQuestionLatex: "|z| = 2,\\quad \\arg(z) = 60\\degree",
};

const complexQ3 = {
  id: "q-complex-conjugate",
  topicKey: "complex",
  topic: "Complex Numbers",
  year: 2021,
  questionText: "Given z = 4 \u2212 3i, find z\u00B7z\u0305 (product of z and its conjugate).",
  questionLatex: "z = 4 - 3i,\\quad z\\bar{z} = ?",
  conceptTitle: "Complex Conjugate",
  conceptIntro:
    "The conjugate of z = a + bi is z\u0305 = a \u2212 bi.\n\n" +
    "A key property: z \u00B7 z\u0305 = a\u00B2 + b\u00B2 = |z|\u00B2\n\n" +
    "This is always a real number!",
  conceptChecks: [
    {
      id: "cc1",
      question: "The conjugate of 4 \u2212 3i is\u2026",
      options: [
        { id: "a", text: "4 + 3i", correct: true, feedback: "Correct! Flip the sign of the imaginary part." },
        { id: "b", text: "\u22124 + 3i", correct: false, feedback: "Only the imaginary sign flips." },
        { id: "c", text: "\u22124 \u2212 3i", correct: false, feedback: "That's \u2212z." },
        { id: "d", text: "3 \u2212 4i", correct: false, feedback: "Don't swap real and imaginary." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Write the conjugate z\u0305 of z = 4 \u2212 3i.",
      hint1: "Flip the sign of the imaginary part.",
      hint2: "z\u0305 = 4 + 3i.",
      hint3: "4 + 3i",
      correctAnswer: "4+3i|4 + 3i",
      latex: "\\bar{z} = 4 + 3i",
    },
    {
      id: 2,
      instruction: "Compute z \u00B7 z\u0305 using the formula a\u00B2 + b\u00B2.",
      hint1: "a = 4, b = 3.",
      hint2: "4\u00B2 + 3\u00B2 = 16 + 9 = 25.",
      hint3: "25",
      correctAnswer: "25",
      latex: "z\\bar{z} = 16 + 9 = 25",
    },
  ],
  fullQuestion: "Final answer: z\u00B7z\u0305 = ?",
  fullQuestionLatex: "25",
};

// ============================================================================
// STATISTICS
// ============================================================================

const statsQ1 = {
  id: "q-stats-mean-sd",
  topicKey: "stats",
  topic: "Statistics",
  year: 2022,
  questionText: "Find the mean and standard deviation of: 4, 8, 6, 5, 3, 2, 8, 9, 5, 10.",
  questionLatex: "\\{4, 8, 6, 5, 3, 2, 8, 9, 5, 10\\}",
  conceptTitle: "Mean & Standard Deviation",
  conceptIntro:
    "The mean (average) is the sum of values divided by the count.\n\n" +
    "Standard deviation measures the spread:\n" +
    "\u03C3 = \u221A[ \u03A3(x\u1D62 \u2212 x\u0305)\u00B2 / n ]\n\n" +
    "Let's compute both step by step.",
  conceptChecks: [
    {
      id: "cc1",
      question: "How do you calculate the mean of a data set?",
      options: [
        { id: "a", text: "Sum / Count", correct: true, feedback: "Yes! Mean = total of values \u00F7 number of values." },
        { id: "b", text: "Max \u2212 Min", correct: false, feedback: "That's the range." },
        { id: "c", text: "Middle value", correct: false, feedback: "That's the median." },
        { id: "d", text: "Most frequent value", correct: false, feedback: "That's the mode." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Find the sum of all values.",
      hint1: "4+8+6+5+3+2+8+9+5+10.",
      hint2: "= 60.",
      hint3: "Sum = 60",
      correctAnswer: "60",
      latex: "\\sum x_i = 60",
    },
    {
      id: 2,
      instruction: "How many values are there?",
      hint1: "Count them.",
      hint2: "n = 10.",
      hint3: "10",
      correctAnswer: "10",
      latex: "n = 10",
    },
    {
      id: 3,
      instruction: "Compute the mean: x\u0305 = sum / n.",
      hint1: "60 / 10 = ?",
      hint2: "= 6.",
      hint3: "x\u0305 = 6",
      correctAnswer: "6",
      latex: "\\bar{x} = \\frac{60}{10} = 6",
    },
    {
      id: 4,
      instruction: "Compute \u03A3(x\u1D62 \u2212 6)\u00B2. (Subtract mean, square, sum all.)",
      hint1: "(4\u22126)\u00B2=4, (8\u22126)\u00B2=4, (6\u22126)\u00B2=0, (5\u22126)\u00B2=1, (3\u22126)\u00B2=9, (2\u22126)\u00B2=16, (8\u22126)\u00B2=4, (9\u22126)\u00B2=9, (5\u22126)\u00B2=1, (10\u22126)\u00B2=16.",
      hint2: "4+4+0+1+9+16+4+9+1+16 = 64.",
      hint3: "64",
      correctAnswer: "64",
      latex: "\\sum(x_i - 6)^2 = 64",
    },
    {
      id: 5,
      instruction: "Compute the standard deviation: \u03C3 = \u221A(64/10).",
      hint1: "64/10 = 6.4.",
      hint2: "\u221A6.4 \u2248 2.53.",
      hint3: "\u03C3 \u2248 2.53",
      correctAnswer: "2.53|2.5",
      latex: "\\sigma = \\sqrt{6.4} \\approx 2.53",
    },
  ],
  fullQuestion: "Final answer: Mean and Standard Deviation?",
  fullQuestionLatex: "\\bar{x} = 6,\\quad \\sigma \\approx 2.53",
};

const statsQ2 = {
  id: "q-stats-probability",
  topicKey: "stats",
  topic: "Statistics",
  year: 2023,
  questionText: "A bag contains 5 red, 3 blue, and 2 green balls. What is the probability of drawing a blue ball?",
  questionLatex: "P(\\text{blue}) = ?",
  conceptTitle: "Basic Probability",
  conceptIntro:
    "Probability of an event = (favorable outcomes) / (total outcomes).\n\n" +
    "P(A) = n(A) / n(S)\n\n" +
    "where n(S) is the total sample space.",
  conceptChecks: [
    {
      id: "cc1",
      question: "What is the total number of balls?",
      options: [
        { id: "a", text: "8", correct: false, feedback: "5+3+2 = 10, not 8." },
        { id: "b", text: "10", correct: true, feedback: "Correct! 5+3+2 = 10." },
        { id: "c", text: "3", correct: false, feedback: "That's just the blue balls." },
        { id: "d", text: "15", correct: false, feedback: "Too many." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "What is the total number of balls in the bag?",
      hint1: "Add: 5 red + 3 blue + 2 green.",
      hint2: "= 10.",
      hint3: "10",
      correctAnswer: "10",
      latex: "n(S) = 5 + 3 + 2 = 10",
    },
    {
      id: 2,
      instruction: "How many favorable outcomes (blue balls)?",
      hint1: "Count the blue balls.",
      hint2: "There are 3.",
      hint3: "3",
      correctAnswer: "3",
      latex: "n(\\text{blue}) = 3",
    },
    {
      id: 3,
      instruction: "Compute P(blue) = favorable / total.",
      hint1: "3 / 10.",
      hint2: "= 0.3 or 3/10.",
      hint3: "3/10",
      correctAnswer: "3/10|0.3|0.30",
      latex: "P(\\text{blue}) = \\frac{3}{10} = 0.3",
    },
  ],
  fullQuestion: "Final answer: P(blue) = ?",
  fullQuestionLatex: "\\frac{3}{10}",
};

const statsQ3 = {
  id: "q-stats-combination",
  topicKey: "stats",
  topic: "Statistics",
  year: 2021,
  questionText: "In how many ways can a committee of 3 be chosen from 8 people?",
  questionLatex: "\\binom{8}{3} = ?",
  conceptTitle: "Combinations",
  conceptIntro:
    "A combination counts selections where order doesn't matter.\n\n" +
    "C(n, r) = n! / [r! \u00D7 (n\u2212r)!]\n\n" +
    "Also written as \u207FCr or (n choose r).",
  conceptChecks: [
    {
      id: "cc1",
      question: "What is 3! (3 factorial)?",
      options: [
        { id: "a", text: "3", correct: false, feedback: "3! = 3\u00D72\u00D71 = 6." },
        { id: "b", text: "6", correct: true, feedback: "Correct! 3! = 3\u00D72\u00D71 = 6." },
        { id: "c", text: "9", correct: false, feedback: "That's 3\u00B2." },
        { id: "d", text: "1", correct: false, feedback: "That's 0! or 1!." },
      ],
    },
  ],
  steps: [
    {
      id: 1,
      instruction: "Write the combination formula for C(8,3).",
      hint1: "C(n,r) = n! / [r!\u00B7(n\u2212r)!].",
      hint2: "C(8,3) = 8! / (3! \u00D7 5!).",
      hint3: "8! / (3! \u00D7 5!)",
      correctAnswer: "8!/(3!*5!)|8!/(3!5!)",
      latex: "\\binom{8}{3} = \\frac{8!}{3!\\cdot 5!}",
    },
    {
      id: 2,
      instruction: "Simplify: 8! / 5! = 8 \u00D7 7 \u00D7 6. Compute that.",
      hint1: "8 \u00D7 7 = 56.",
      hint2: "56 \u00D7 6 = 336.",
      hint3: "336",
      correctAnswer: "336",
      latex: "\\frac{8!}{5!} = 8 \\times 7 \\times 6 = 336",
    },
    {
      id: 3,
      instruction: "Divide by 3! = 6.",
      hint1: "336 / 6 = ?",
      hint2: "= 56.",
      hint3: "56",
      correctAnswer: "56",
      latex: "\\frac{336}{6} = 56",
    },
  ],
  fullQuestion: "Final answer: C(8,3) = ?",
  fullQuestionLatex: "56",
};

// ============================================================================
// QUESTION BANK
// ============================================================================

export type MockQuestion = typeof mockQuestion1;

/** All questions keyed by topic ID (matches the `id` field in mockTopics). */
export const questionsByTopic: Record<string, MockQuestion[]> = {
  sequences:    [mockQuestion1, mockQuestion2, sequencesQ3],
  exponentials: [expQ1, expQ2, expQ3],
  trig:         [trigQ1, trigQ2, trigQ3],
  calculus:     [calcQ1, calcQ2, calcQ3],
  complex:      [complexQ1, complexQ2, complexQ3],
  stats:        [statsQ1, statsQ2, statsQ3],
};

/** Flat list of all questions (for backward compatibility). */
export const allQuestions: MockQuestion[] = Object.values(questionsByTopic).flat();

/** Legacy exports. */
export const mockQuestions = allQuestions;
export const mockQuestion = mockQuestion1;
