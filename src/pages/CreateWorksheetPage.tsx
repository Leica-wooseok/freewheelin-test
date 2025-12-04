import styles from "./CreateWorksheetPage.module.scss";
import EmptySimilarWorksheetPlaceholder from "./CreateWorksheetPage/EmptySimilarWorksheetPlaceholder";
import EmptyBasicWorksheetPlaceholer from "./CreateWorksheetPage/EmptyBasicWorksheetPlaceholer";
import WorksheetList from "./CreateWorksheetPage/WorksheetList";
import WorksheetCard from "@/components/WorksheetCard";
import WorksheetFooter, {
  type DifficultyCount,
} from "./CreateWorksheetPage/WorksheetFooter";

const MOCK_DATA = {
  DIFFICULTY_COUNT: {
    level1: 10,
    level2: 10,
    level3: 10,
    level4: 10,
    level5: 10,
  } as DifficultyCount,
} as const;

function CreateWorksheetPage() {
  const totalProblems = calculateTotalProblems(MOCK_DATA.DIFFICULTY_COUNT);

  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <SimilarProblemsSection />
        <BasicProblemsSection
          difficultyCount={MOCK_DATA.DIFFICULTY_COUNT}
          totalProblems={totalProblems}
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
};

function BasicProblemsSection({
  difficultyCount,
  totalProblems,
}: BasicProblemsSectionProps) {
  return (
    <WorksheetList type="basic">
      <h2 className={styles.worksheet_title}>학습지 상세 편집</h2>
      <WorksheetCardsArea />
      <EmptyBasicWorksheetPlaceholer />
      <WorksheetFooter
        difficultyCount={difficultyCount}
        totalProblems={totalProblems}
      />
    </WorksheetList>
  );
}

function WorksheetCardsArea() {
  return (
    <div className={styles.worksheet_list_wrap}>
      <WorksheetCard isActive={true} />
    </div>
  );
}

function calculateTotalProblems(difficultyCount: DifficultyCount): number {
  return Object.values(difficultyCount).reduce((sum, count) => sum + count, 0);
}

export default CreateWorksheetPage;
