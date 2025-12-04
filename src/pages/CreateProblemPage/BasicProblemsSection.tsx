import styles from "../CreateProblemsPage.module.scss";
import ProblemList from "./ProblemList";
import EmptyBasicProblemPlaceholer from "./EmptyBasicProblemPlaceholer";
import ProblemFooter, { type DifficultyCount } from "./ProblemFooter";
import ProblemCardsArea from "./ProblemCardsArea";
import type { Problem } from "@/types/problem";

type BasicProblemsSectionProps = {
  difficultyCount: DifficultyCount;
  totalProblems: number;
  problems: Problem[];
  activeProblemId: number | null;
  onSimilarClick: (problemId: number) => void;
};

function BasicProblemsSection({
  difficultyCount,
  totalProblems,
  problems,
  activeProblemId,
  onSimilarClick,
}: BasicProblemsSectionProps) {
  const hasProblems = problems.length > 0;

  return (
    <ProblemList type="basic">
      <h2 className={styles.problem_title}>학습지 상세 편집</h2>
      {hasProblems ? (
        <ProblemCardsArea
          problems={problems}
          activeProblemId={activeProblemId}
          onSimilarClick={onSimilarClick}
        />
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
