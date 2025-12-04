import styles from "../CreateWorksheetPage.module.scss";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";

function EmptySimilarProblemPlaceholder() {
  return (
    <div className={styles.empty_worksheet_wrap}>
      <p className={"typo_body2"}>
        <span className={styles.button_view}>
          <AddCircleIcon className={styles.button_view_icon} />
          유사문제
        </span>
        버튼을 누르면
      </p>
      <p className={"typo_body2"}>문제를 추가 또는 교체할수 있습니다.</p>
    </div>
  );
}

export default EmptySimilarProblemPlaceholder;
