import styles from "./ProblemCard.module.scss";
import CardButton from "@/components/buttons/CardButton";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import DeleteIcon from "@/assets/images/delete.svg?react";
import { ProblemCardBase, CardTitleGroup, CardBody } from "./ProblemCardBase";
import type { Problem } from "@/types/problem";

type BasicProblemCardProps = {
  problem: Problem;
  index: number;
  isActive?: boolean;
  onSimilarClick: () => void;
  onDeleteClick: () => void;
};

function BasicProblemCard({
  problem,
  index,
  isActive = false,
  onSimilarClick,
  onDeleteClick,
}: BasicProblemCardProps) {
  const handleSimilarClick = onSimilarClick;
  const handleDeleteClick = onDeleteClick;

  return (
    <ProblemCardBase
      isActive={isActive}
      cardBody={
        <CardBody
          level={problem.level}
          answerRate={problem.answerRate}
          problemImageUrl={problem.problemImageUrl}
          problemType={problem.type}
        />
      }
    >
      <div className={styles.card_header}>
        <CardTitleGroup index={index} title={problem.title} />
        <div className={styles.card_header_button_group}>
          <CardButton
            icon={<AddCircleIcon />}
            active={isActive}
            label="유사문제"
            onClick={handleSimilarClick}
          />
          <CardButton
            icon={<DeleteIcon />}
            label="삭제"
            onClick={handleDeleteClick}
          />
        </div>
      </div>
    </ProblemCardBase>
  );
}

export default BasicProblemCard;
