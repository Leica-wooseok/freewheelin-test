import styles from "../CreateProblemsPage.module.scss";
import BasicProblemCard from "@/components/ProblemCard/BasicProblemCard";
import { useProblemContext } from "@/contexts/ProblemContext";
import { useProblemCardActions } from "@/hooks/useProblemCardActions";

function ProblemCardsArea() {
  const { problems, activeProblemId } = useProblemContext();
  const { handleSimilarClick, handleDeleteClick } = useProblemCardActions();

  return (
    <div className={styles.problem_list_wrap}>
      {problems.map((problem, index) => (
        <BasicProblemCard
          key={problem.id}
          problem={problem}
          index={index + 1}
          isActive={problem.id === activeProblemId}
          onSimilarClick={() => handleSimilarClick(problem.id)}
          onDeleteClick={() => handleDeleteClick(problem.id)}
        />
      ))}
    </div>
  );
}

export default ProblemCardsArea;
