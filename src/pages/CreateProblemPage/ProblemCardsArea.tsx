import styles from "../CreateProblemsPage.module.scss";
import ProblemCard from "@/components/ProblemCard";
import type { Problem } from "@/types/problem";

type ProblemCardsAreaProps = {
  problems: Problem[];
};

function ProblemCardsArea({ problems }: ProblemCardsAreaProps) {
  return (
    <div className={styles.problem_list_wrap}>
      {problems.map((problem, index) => (
        <ProblemCard
          key={problem.id}
          index={index + 1}
          title={problem.title}
          level={problem.level}
          answerRate={problem.answerRate}
          problemImageUrl={problem.problemImageUrl}
          problemType={problem.type}
          isActive={index === 0}
        />
      ))}
    </div>
  );
}

export default ProblemCardsArea;
