import styles from "./ProblemCard.module.scss";
import clsx from "clsx";
import CardButton from "@/components/buttons/CardButton";
import CardBadge from "../CardBadge";
import DifficultyBadge from "../DifficultyBadge";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import DeleteIcon from "@/assets/images/delete.svg?react";
import { colorsHex } from "@/styles/colors";

type ProblemType = 1 | 2;
type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

type ProblemCardProps = {
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

const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
  1: "객관식",
  2: "주관식",
};

function ProblemCard({
  index,
  title,
  isActive = false,
  level,
  answerRate,
  problemImageUrl,
  problemType,
  onSimilarClick,
  onDeleteClick,
}: ProblemCardProps) {
  const cardClassName = clsx(styles.problem_card, {
    [styles.active]: isActive,
  });

  const handleSimilarClick = onSimilarClick ?? (() => {});
  const handleDeleteClick = onDeleteClick ?? (() => {});

  return (
    <div className={cardClassName}>
      <CardHeader
        index={index}
        title={title}
        onSimilarClick={handleSimilarClick}
        onDeleteClick={handleDeleteClick}
      />
      <CardBody
        level={level}
        answerRate={answerRate}
        problemImageUrl={problemImageUrl}
        problemType={problemType}
      />
    </div>
  );
}

type CardHeaderProps = {
  index: number | string;
  title: string;
  onSimilarClick: () => void;
  onDeleteClick: () => void;
};

function CardHeader({
  index,
  title,
  onSimilarClick,
  onDeleteClick,
}: CardHeaderProps) {
  return (
    <div className={styles.card_header}>
      <div className={styles.card_header_title_group}>
        <h4>{index}</h4>
        <p>{title}</p>
      </div>
      <div className={styles.card_header_button_group}>
        <CardButton
          icon={<AddCircleIcon />}
          label="유사문제"
          onClick={onSimilarClick}
        />
        <CardButton
          icon={<DeleteIcon />}
          label="삭제"
          onClick={onDeleteClick}
        />
      </div>
    </div>
  );
}

type CardBodyProps = {
  level: DifficultyLevel;
  answerRate: number;
  problemImageUrl?: string;
  problemType: ProblemType;
};

function CardBody({
  level,
  answerRate,
  problemImageUrl,
  problemType,
}: CardBodyProps) {
  const answerRateLabel = `${answerRate}%`;
  const problemTypeLabel = PROBLEM_TYPE_LABELS[problemType];

  return (
    <div className={styles.card_body}>
      <BadgeGroup
        level={level}
        answerRateLabel={answerRateLabel}
        problemTypeLabel={problemTypeLabel}
      />
      <ProblemImageBox imageUrl={problemImageUrl} />
    </div>
  );
}

type BadgeGroupProps = {
  level: DifficultyLevel;
  answerRateLabel: string;
  problemTypeLabel: string;
};

function BadgeGroup({
  level,
  answerRateLabel,
  problemTypeLabel,
}: BadgeGroupProps) {
  return (
    <div className={styles.card_body_badge_group}>
      <DifficultyBadge level={level} />
      <CardBadge label={answerRateLabel} color={colorsHex.gray700} />
      <CardBadge label={problemTypeLabel} color={colorsHex.gray600} />
    </div>
  );
}

type ProblemImageBoxProps = {
  imageUrl?: string;
};

function ProblemImageBox({ imageUrl }: ProblemImageBoxProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className={styles.card_problem_image_box}>
      <img src={imageUrl} alt={""} />
    </div>
  );
}

export default ProblemCard;
