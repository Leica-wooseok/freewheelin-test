import styles from "../CreateWorksheetPage.module.scss";

type DifficultyCount = {
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
};

type WorksheetFooterProps = {
  difficultyCount: DifficultyCount;
  totalProblems: number;
};

function WorksheetFooter({
  difficultyCount,
  totalProblems,
}: WorksheetFooterProps) {
  const difficultySummary = formatDifficultySummary(difficultyCount);

  return (
    <div className={styles.worksheet_list_footer}>
      <p>{difficultySummary}</p>
      <div>|</div>
      <p className={styles.total}>문제 수 {totalProblems} 개</p>
    </div>
  );
}

function formatDifficultySummary(difficultyCount: DifficultyCount): string {
  const { level1, level2, level3, level4, level5 } = difficultyCount;
  return `하${level1} · 중하${level2} · 중${level3} · 상${level4} · 최상${level5}`;
}

export default WorksheetFooter;
export type { DifficultyCount };
