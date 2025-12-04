import styles from "../CreateProblemsPage.module.scss";
import BasicProblemCard from "@/components/ProblemCard/BasicProblemCard";
import type { Problem } from "@/types/problem";
import { useDeleteProblem } from "@/hooks/useProblems";

type ProblemCardsAreaProps = {
  problems: Problem[];
  activeProblemId: number | null;
  onSimilarClick: (problemId: number) => void;
};

function ProblemCardsArea({ problems, activeProblemId, onSimilarClick }: ProblemCardsAreaProps) {
  const { mutate: deleteProblem } = useDeleteProblem();

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
          onSimilarClick={() => onSimilarClick(problem.id)}
          onDeleteClick={() => handleDeleteClick(problem.id)}
        />
      ))}
    </div>
  );
}

export default ProblemCardsArea;
