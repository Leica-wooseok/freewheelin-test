import styles from "./CreateWorksheetPage.module.scss";
import EmptySimilarWorksheetPlaceholder from "./CreateWorksheetPage/EmptySimilarWorksheetPlaceholder";
import EmptyBasicWorksheetPlaceholer from "./CreateWorksheetPage/EmptyBasicWorksheetPlaceholer";
import WorksheetList from "./CreateWorksheetPage/WorksheetList";
import clsx from "clsx";
import CardButton from "@/components/buttons/CardButton";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import DeleteIcon from "@/assets/images/delete.svg?react";

function WorksheetCard() {
  const isActive = true;

  const renderSimilarButton = () => {
    return (
      <CardButton
        icon={<AddCircleIcon />}
        label="유사문제"
        onClick={() => {}}
      />
    );
  };

  const renderDeleteButton = () => {
    return <CardButton icon={<DeleteIcon />} label="삭제" onClick={() => {}} />;
  };

  return (
    <div className={clsx(styles.worksheet_card, isActive && styles.active)}>
      <div className={styles.card_header}>
        <div className={styles.card_header_title_group}>
          <h4>index</h4>
          <p>Worksheet name title ~</p>
        </div>
        <div className={styles.card_header_button_group}>
          {renderSimilarButton()}
          {renderDeleteButton()}
        </div>
      </div>
      <div>Card Body</div>
    </div>
  );
}

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
            <WorksheetCard />
          </div>
          {/* 기본 문제 없는 경우의 view */}
          <EmptyBasicWorksheetPlaceholer />
        </WorksheetList>
      </main>
    </div>
  );
}

export default CreateWorksheetPage;
