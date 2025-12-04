import { useState } from "react";
import styles from "../CreateProblemsPage.module.scss";
import BasicProblemCard from "@/components/ProblemCard/BasicProblemCard";
import type { Problem } from "@/types/problem";

type ProblemCardsAreaProps = {
  problems: Problem[];
};

function ProblemCardsArea({ problems }: ProblemCardsAreaProps) {
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  const handleSimilarClick = (problemId: number) => {
    setActiveProblemId(problemId);
  };

  return (
    <div className={styles.problem_list_wrap}>
      {problems.map((problem, index) => (
        <BasicProblemCard
          key={problem.id}
          index={index + 1}
          title={problem.title}
          level={problem.level}
          answerRate={problem.answerRate}
          problemImageUrl={problem.problemImageUrl}
          problemType={problem.type}
          isActive={problem.id === activeProblemId}
          onSimilarClick={() => handleSimilarClick(problem.id)}
        />
      ))}
    </div>
  );
}

export default ProblemCardsArea;
