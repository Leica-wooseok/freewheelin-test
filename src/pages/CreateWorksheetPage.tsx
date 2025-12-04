import styles from "./CreateWorksheetPage.module.scss";
import EmptySimilarWorksheetPlaceholder from "./CreateWorksheetPage/EmptySimilarWorksheetPlaceholder";
import EmptyBasicWorksheetPlaceholer from "./CreateWorksheetPage/EmptyBasicWorksheetPlaceholer";
import WorksheetList from "./CreateWorksheetPage/WorksheetList";
import WorksheetCard from "@/components/WorksheetCard";

function CreateWorksheetPage() {
  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <WorksheetList type="similar">
          {/* 유사문제 없는 경우의 view */}
          <EmptySimilarWorksheetPlaceholder />
        </WorksheetList>

        <WorksheetList type="basic">
          <h2 className={styles.worksheet_title}>학습지 상세 편집</h2>
          <div className={styles.worksheet_list_wrap}>
            <WorksheetCard isActive={true} />
          </div>
          {/* 기본 문제 없는 경우의 view */}
          <EmptyBasicWorksheetPlaceholer />
        </WorksheetList>
      </main>
    </div>
  );
}

export default CreateWorksheetPage;
