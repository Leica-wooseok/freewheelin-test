import styles from "./CreateWorksheetPage.module.scss";
import EmptySimilarWorksheetPlaceholder from "./CreateWorksheetPage/EmptySimilarWorksheetPlaceholder";
import EmptyBasicWorksheetPlaceholer from "./CreateWorksheetPage/EmptyBasicWorksheetPlaceholer";
import WorksheetList from "./CreateWorksheetPage/WorksheetList";
import WorksheetCard from "@/components/WorksheetCard";
import WorksheetFooter, {
  type DifficultyCount,
} from "./CreateWorksheetPage/WorksheetFooter";
import { useProblems } from "@/hooks/useProblems";
import type { DifficultyLevel, Problem } from "@/types/problem";

function CreateWorksheetPage() {
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
    <WorksheetList type="similar">
      <EmptySimilarWorksheetPlaceholder />
    </WorksheetList>
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
    <WorksheetList type="basic">
      <h2 className={styles.worksheet_title}>학습지 상세 편집</h2>
      {hasProblems ? (
        <WorksheetCardsArea problems={problems} />
      ) : (
        <EmptyBasicWorksheetPlaceholer />
      )}
      <WorksheetFooter
        difficultyCount={difficultyCount}
        totalProblems={totalProblems}
      />
    </WorksheetList>
  );
}

type WorksheetCardsAreaProps = {
  problems: Problem[];
};

function WorksheetCardsArea({ problems }: WorksheetCardsAreaProps) {
  return (
    <div className={styles.worksheet_list_wrap}>
      {problems.map((problem, index) => (
        <WorksheetCard
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

export default CreateWorksheetPage;
