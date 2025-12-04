import styles from "./ProblemCard.module.scss";
import CardButton from "@/components/buttons/CardButton";
import ChangeIcon from "@/assets/images/swap-horiz.svg?react";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import { ProblemCardBase, CardTitleGroup, CardBody } from "./ProblemCardBase";
import type { Problem } from "@/types/problem";

type SimilarProblemCardProps = {
  problem: Problem;
  index: number;
  isActive?: boolean;
  onChangeClick?: () => void;
  onAddClick?: () => void;
};

function SimilarProblemCard({
  problem,
  index,
  isActive = false,
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
