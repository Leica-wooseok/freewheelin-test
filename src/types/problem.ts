export type ProblemType = 1 | 2; // 1: 객관식, 2: 주관식
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type Problem = {
  id: number;
  level: DifficultyLevel;
  type: ProblemType;
  problemImageUrl: string;
  title: string;
  answerRate: number;
};

export type ProblemsResponse = Problem[];
