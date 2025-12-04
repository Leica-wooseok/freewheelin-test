import styles from "../styles.module.scss";
import ProblemList from "./ProblemList";
import EmptyBasicProblemPlaceholer from "./EmptyBasicProblemPlaceholer";
import ProblemFooter, { type DifficultyCount } from "./ProblemFooter";
import ProblemCardsArea from "./ProblemCardsArea";
import { useProblemContext } from "@/contexts/ProblemContext";
import type { DifficultyLevel, Problem } from "@/types/problem";

function calculateDifficultyCount(
  problems: Array<{ level: DifficultyLevel }>
): DifficultyCount {
  const count: DifficultyCount = {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  };

  problems.forEach((problem) => {
    const key = `level${problem.level}` as keyof DifficultyCount;
    count[key]++;
  });

  return count;
}

function BasicProblemsSection() {
  const { problems } = useProblemContext();
  const hasProblems = problems.length > 0;
  const difficultyCount = calculateDifficultyCount(problems);
  const totalProblems = problems.length;

  return (
    <ProblemList type="basic">
      <h2 className={styles.problem_title}>학습지 상세 편집</h2>
      {hasProblems ? (
        <ProblemCardsArea />
      ) : (
        <EmptyBasicProblemPlaceholer />
      )}
      <ProblemFooter
        difficultyCount={difficultyCount}
        totalProblems={totalProblems}
      />
    </ProblemList>
  );
}

export default BasicProblemsSection;
