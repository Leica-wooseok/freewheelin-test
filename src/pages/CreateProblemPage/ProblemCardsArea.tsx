import { useState } from "react";
import styles from "../CreateProblemsPage.module.scss";
import BasicProblemCard from "@/components/ProblemCard/BasicProblemCard";
import type { Problem } from "@/types/problem";
import { useDeleteProblem } from "@/hooks/useProblems";

type ProblemCardsAreaProps = {
  problems: Problem[];
};

function ProblemCardsArea({ problems }: ProblemCardsAreaProps) {
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);
  const { mutate: deleteProblem } = useDeleteProblem();

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
