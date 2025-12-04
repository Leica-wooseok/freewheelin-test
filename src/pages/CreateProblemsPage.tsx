import { useState } from "react";
import styles from "./CreateProblemsPage.module.scss";
import SimilarProblemsSection from "./CreateProblemPage/SimilarProblemsSection";
import BasicProblemsSection from "./CreateProblemPage/BasicProblemsSection";
import { useProblems, useSimilarProblems } from "@/hooks/useProblems";
import type { DifficultyLevel } from "@/types/problem";
import type { DifficultyCount } from "./CreateProblemPage/ProblemFooter";

function CreateProblemPage() {
  const { data, isLoading, error } = useProblems();
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  const problems = data || [];
  const excludedIds = problems.map((p) => p.id);

  // activeProblemId가 설정되면 자동으로 유사 문제 fetch
  const { data: similarProblems } = useSimilarProblems(activeProblemId, excludedIds);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const difficultyCount = calculateDifficultyCount(problems);
  const totalProblems = problems.length;

  const handleSimilarClick = (problemId: number) => {
    setActiveProblemId(problemId);
  };

  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <SimilarProblemsSection problems={similarProblems} />
        <BasicProblemsSection
          difficultyCount={difficultyCount}
          totalProblems={totalProblems}
          problems={problems}
          activeProblemId={activeProblemId}
          onSimilarClick={handleSimilarClick}
        />
      </main>
    </div>
  );
}

function calculateDifficultyCount(
  problems: Array<{ level: DifficultyLevel }>
): DifficultyCount {
  const count: DifficultyCount = {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  };

  problems.forEach((problem) => {
    const key = `level${problem.level}` as keyof DifficultyCount;
    count[key]++;
  });

  return count;
}

export default CreateProblemPage;
