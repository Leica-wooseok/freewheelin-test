import styles from "../CreateProblemsPage.module.scss";

interface ProblemListProps {
  type: "similar" | "basic";
  children?: React.ReactNode;
}

function ProblemList({ type, children }: ProblemListProps) {
  const className =
    type === "similar"
      ? styles.similar_problems_list
      : styles.basic_problems_list;

  return <section className={className}>{children}</section>;
}

export default ProblemList;
