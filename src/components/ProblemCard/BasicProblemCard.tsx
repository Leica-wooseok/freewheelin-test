import styles from "./ProblemCard.module.scss";
import CardButton from "@/components/buttons/CardButton";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import DeleteIcon from "@/assets/images/delete.svg?react";
import { ProblemCardBase, CardTitleGroup, CardBody } from "./ProblemCardBase";
import type { DifficultyLevel, ProblemType } from "@/types/problem";

type BasicProblemCardProps = {
  index: number;
  title: string;
  isActive?: boolean;
  level: DifficultyLevel;
  answerRate: number;
  problemImageUrl: string;
  problemType: ProblemType;
  onSimilarClick?: () => void;
  onDeleteClick?: () => void;
};

function BasicProblemCard({
  index,
  title,
  isActive = false,
  level,
  answerRate,
  problemImageUrl,
  problemType,
  onSimilarClick,
  onDeleteClick,
}: BasicProblemCardProps) {
  const handleSimilarClick = onSimilarClick ?? (() => {});
  const handleDeleteClick = onDeleteClick ?? (() => {});

  return (
    <ProblemCardBase
      isActive={isActive}
      cardBody={
        <CardBody
          level={level}
          answerRate={answerRate}
          problemImageUrl={problemImageUrl}
          problemType={problemType}
        />
      }
    >
      <div className={styles.card_header}>
        <CardTitleGroup index={index} title={title} />
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
