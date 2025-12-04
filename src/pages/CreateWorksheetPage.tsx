import styles from "./CreateWorksheetPage.module.scss";
import EmptySimilarWorksheetView from "./CreateWorksheetPage/EmptySimilarWorksheetView";
import EmptyBasicWorksheetView from "./CreateWorksheetPage/EmptyBasicWorksheetView";
import WorksheetList from "./CreateWorksheetPage/WorksheetList";

function CreateWorksheetPage() {
  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <WorksheetList type="similar">
          {/* 유사문제 없는 경우의 view */}
          <EmptySimilarWorksheetView />
        </WorksheetList>

        <WorksheetList type="basic">
          {/* 기본 문제 없는 경우의 view */}
          <EmptyBasicWorksheetView />
        </WorksheetList>
      </main>
    </div>
  );
}

export default CreateWorksheetPage;
