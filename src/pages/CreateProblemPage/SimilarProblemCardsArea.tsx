import styles from "../CreateProblemsPage.module.scss";
import SimilarProblemCard from "@/components/ProblemCard/SimilarProblemCard";
import { useProblemContext } from "@/contexts/ProblemContext";
import { useProblemCardActions } from "@/hooks/useProblemCardActions";

function SimilarProblemCardsArea() {
  const { similarProblems } = useProblemContext();
  const { handleChangeClick, handleAddClick } = useProblemCardActions();

  const problems = similarProblems || [];

  return (
    <div className={styles.problem_list_wrap}>
      {problems.map((problem, index) => (
        <SimilarProblemCard
          key={problem.id}
          problem={problem}
          index={index + 1}
          onChangeClick={() => handleChangeClick(problem.id)}
          onAddClick={() => handleAddClick(problem.id)}
        />
      ))}
    </div>
  );
}

export default SimilarProblemCardsArea;
