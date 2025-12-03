import styles from "../CreateWorksheetPage.module.scss";

interface WorksheetListProps {
  type: "similar" | "basic";
  children?: React.ReactNode;
}

function WorksheetList({ type, children }: WorksheetListProps) {
  const className =
    type === "similar"
      ? styles.similar_problems_list
      : styles.basic_problems_list;

  return <section className={className}>{children}</section>;
}

export default WorksheetList;
