import styles from "./CreateWorksheetPage.module.scss";
import EmptyWorksheetView from "./CreateWorksheetPage/EmptyWorksheetView";
import WorksheetList from "./CreateWorksheetPage/WorksheetList";

function CreateWorksheetPage() {
  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <WorksheetList type="similar">
          <EmptyWorksheetView />
        </WorksheetList>
        <WorksheetList type="basic">2</WorksheetList>
      </main>
    </div>
  );
}

export default CreateWorksheetPage;
