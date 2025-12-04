import styles from "./ProblemCard.module.scss";
import CardButton from "@/components/buttons/CardButton";
import ChangeIcon from "@/assets/images/swap-horiz.svg?react";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import { ProblemCardBase, CardTitleGroup, CardBody } from "./ProblemCardBase";
import type { DifficultyLevel, ProblemType } from "@/types/problem";

type SimilarProblemCardProps = {
  index: number;
  title: string;
  isActive?: boolean;
  level: DifficultyLevel;
  answerRate: number;
  problemImageUrl: string;
  problemType: ProblemType;
  onChangeClick?: () => void;
  onAddClick?: () => void;
};

function SimilarProblemCard({
  index,
  title,
  isActive = false,
  level,
  answerRate,
  problemImageUrl,
  problemType,
  onChangeClick,
  onAddClick,
}: SimilarProblemCardProps) {
  const handleChangeClick = onChangeClick ?? (() => {});
  const handleAddClick = onAddClick ?? (() => {});

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
            icon={<ChangeIcon />}
            label="교체"
            onClick={handleChangeClick}
          />
          <CardButton
            icon={<AddCircleIcon />}
            label="추가"
            onClick={handleAddClick}
          />
        </div>
      </div>
    </ProblemCardBase>
  );
}

export default SimilarProblemCard;
