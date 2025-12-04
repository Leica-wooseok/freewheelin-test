import { useState } from "react";
import ProblemList from "./ProblemList";
import EmptySimilarProblemPlaceholder from "./EmptySimilarProblemPlaceholder";
import SimilarProblemCard from "@/components/ProblemCard/SimilarProblemCard";
import type { Problem } from "@/types/problem";

type SimilarProblemsSectionProps = {
  problems?: Problem[];
};

function SimilarProblemsSection({ problems = [] }: SimilarProblemsSectionProps) {
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  const handleChangeClick = (problemId: number) => {
    setActiveProblemId(problemId);
    // TODO: 교체 로직 구현
  };

  const handleAddClick = (_problemId: number) => {
    // TODO: 추가 로직 구현
  };

  const hasProblems = problems.length > 0;

  return (
    <ProblemList type="similar">
      {hasProblems ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {problems.map((problem, index) => (
            <SimilarProblemCard
              key={problem.id}
              problem={problem}
              index={index + 1}
              isActive={problem.id === activeProblemId}
              onChangeClick={() => handleChangeClick(problem.id)}
              onAddClick={() => handleAddClick(problem.id)}
            />
          ))}
        </div>
      ) : (
        <EmptySimilarProblemPlaceholder />
      )}
    </ProblemList>
  );
}

export default SimilarProblemsSection;
