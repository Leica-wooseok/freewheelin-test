import styles from "./ProblemCard.module.scss";
import clsx from "clsx";
import CardBadge from "../CardBadge";
import DifficultyBadge from "../DifficultyBadge";
import { colorsHex } from "@/styles/colors";
import type { DifficultyLevel, ProblemType } from "@/types/problem";

type ProblemCardBaseProps = {
  isActive?: boolean;
  children: React.ReactNode;
  cardBody: React.ReactNode;
};

export function ProblemCardBase({
  isActive = false,
  children,
  cardBody,
}: ProblemCardBaseProps) {
  const cardClassName = clsx(styles.problem_card, {
    [styles.active]: isActive,
  });

  return (
    <div className={cardClassName}>
      {children}
      {cardBody}
    </div>
  );
}

type CardTitleGroupProps = {
  index: number;
  title: string;
};

export function CardTitleGroup({ index, title }: CardTitleGroupProps) {
  return (
    <div className={styles.card_header_title_group}>
      <h4>{index}</h4>
      <p>{title}</p>
    </div>
  );
}

type CardBodyProps = {
  level: DifficultyLevel;
  answerRate: number;
  problemImageUrl?: string;
  problemType: ProblemType;
};

export function CardBody({
  level,
  answerRate,
  problemImageUrl,
  problemType,
}: CardBodyProps) {
  const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
    1: "객관식",
    2: "주관식",
  };

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
