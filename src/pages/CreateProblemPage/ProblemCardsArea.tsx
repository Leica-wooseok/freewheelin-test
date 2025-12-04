import styles from "../CreateProblemsPage.module.scss";
import BasicProblemCard from "@/components/ProblemCard/BasicProblemCard";
import { useProblemContext } from "@/contexts/ProblemContext";

function ProblemCardsArea() {
  const { problems, activeProblemId, setActiveProblemId, deleteProblem } = useProblemContext();

  const handleSimilarClick = (problemId: number) => {
    setActiveProblemId(problemId);
  };

  const handleDeleteClick = (problemId: number) => {
    deleteProblem(problemId);
  };

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
