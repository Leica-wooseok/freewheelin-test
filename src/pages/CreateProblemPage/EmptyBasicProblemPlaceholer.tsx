import styles from "../CreateProblemsPage.module.scss";

function EmptyBasicProblemPlaceholer() {
  return (
    <div className={styles.empty_problem_wrap}>
      <p className={"typo_body2"}>학습지 문제수가 없습니다.</p>
      <p className={"typo_body2"}>
        다음단계로 넘어가기 위해 문제를 추가해주세요.
      </p>
    </div>
  );
}

export default EmptyBasicProblemPlaceholer;
