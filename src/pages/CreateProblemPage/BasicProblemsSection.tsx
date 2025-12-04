import styles from "../CreateProblemsPage.module.scss";
import ProblemList from "./ProblemList";
import EmptyBasicProblemPlaceholer from "./EmptyBasicProblemPlaceholer";
import ProblemFooter, { type DifficultyCount } from "./ProblemFooter";
import ProblemCardsArea from "./ProblemCardsArea";
import { useProblemContext } from "@/contexts/ProblemContext";

type BasicProblemsSectionProps = {
  difficultyCount: DifficultyCount;
  totalProblems: number;
};

function BasicProblemsSection({
  difficultyCount,
  totalProblems,
}: BasicProblemsSectionProps) {
  const { problems } = useProblemContext();
  const hasProblems = problems.length > 0;

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
