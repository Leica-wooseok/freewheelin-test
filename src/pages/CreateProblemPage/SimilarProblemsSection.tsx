import styles from "../CreateProblemsPage.module.scss";
import ProblemList from "./ProblemList";
import EmptySimilarProblemPlaceholder from "./EmptySimilarProblemPlaceholder";
import { useProblemContext } from "@/contexts/ProblemContext";
import SimilarProblemCardsArea from "./SimilarProblemCardsArea";

function SimilarProblemsSection() {
  const { similarProblems } = useProblemContext();

  const hasProblems = similarProblems && similarProblems.length > 0;

  return (
    <ProblemList type="similar">
      {hasProblems ? (
        <>
          <h2 className={styles.problem_title}>유사 문항</h2>
          <SimilarProblemCardsArea />
        </>
      ) : (
        <EmptySimilarProblemPlaceholder />
      )}
    </ProblemList>
  );
}

export default SimilarProblemsSection;
