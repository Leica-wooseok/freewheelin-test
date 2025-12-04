import styles from "./CreateProblemsPage.module.scss";
import SimilarProblemsSection from "./CreateProblemPage/SimilarProblemsSection";
import BasicProblemsSection from "./CreateProblemPage/BasicProblemsSection";
import { useProblems } from "@/hooks/useProblems";
import type { DifficultyLevel } from "@/types/problem";
import type { DifficultyCount } from "./CreateProblemPage/ProblemFooter";

function CreateProblemPage() {
  const { data, isLoading, error } = useProblems();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const problems = data || [];
  const difficultyCount = calculateDifficultyCount(problems);
  const totalProblems = problems.length;

  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <SimilarProblemsSection />
        <BasicProblemsSection
          difficultyCount={difficultyCount}
          totalProblems={totalProblems}
          problems={problems}
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
