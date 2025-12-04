import styles from "./CreateProblemsPage.module.scss";
import EmptySimilarProblemPlaceholder from "./CreateProblemPage/EmptySimilarProblemPlaceholder";
import EmptyBasicProblemPlaceholer from "./CreateProblemPage/EmptyBasicProblemPlaceholer";
import ProblemList from "./CreateProblemPage/ProblemList";
import ProblemCard from "@/components/ProblemCard";
import ProblemFooter, {
  type DifficultyCount,
} from "./CreateProblemPage/ProblemFooter";
import { useProblems } from "@/hooks/useProblems";
import type { DifficultyLevel, Problem } from "@/types/problem";

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

function SimilarProblemsSection() {
  return (
    <ProblemList type="similar">
      <EmptySimilarProblemPlaceholder />
    </ProblemList>
  );
}

type BasicProblemsSectionProps = {
  difficultyCount: DifficultyCount;
  totalProblems: number;
  problems: Problem[];
};

function BasicProblemsSection({
  difficultyCount,
  totalProblems,
  problems,
}: BasicProblemsSectionProps) {
  const hasProblems = problems.length > 0;

  return (
    <ProblemList type="basic">
      <h2 className={styles.problem_title}>학습지 상세 편집</h2>
      {hasProblems ? (
        <ProblemCardsArea problems={problems} />
      ) : (
        <EmptyBasicProblemPlaceholer />
      )}
      <ProblemFooter
        difficultyCount={difficultyCount}
        totalProblems={totalProblems}
      />
    </ProblemList>
  );
}

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
