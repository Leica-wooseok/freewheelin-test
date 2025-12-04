import styles from "./WorksheetCard.module.scss";
import clsx from "clsx";
import CardButton from "@/components/buttons/CardButton";
import CardBadge from "../CardBadge";
import DifficultyBadge from "../DifficultyBadge";
import AddCircleIcon from "@/assets/images/add-circle.svg?react";
import DeleteIcon from "@/assets/images/delete.svg?react";
import { colorsHex } from "@/styles/colors";

interface WorksheetCardProps {
  index?: number | string;
  title?: string;
  isActive?: boolean;
  onSimilarClick?: () => void;
  onDeleteClick?: () => void;
  children?: React.ReactNode;
}

const DEFAULT_INDEX = "1";
const DEFAULT_TITLE = "Worksheet name title ~";
const DEFAULT_BODY = "Card Body";

function WorksheetCard({
  index = DEFAULT_INDEX,
  title = DEFAULT_TITLE,
  isActive = false,
  onSimilarClick,
  onDeleteClick,
  children = DEFAULT_BODY,
}: WorksheetCardProps) {
  const cardClassName = clsx(styles.worksheet_card, {
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
      <CardBody>{children}</CardBody>
    </div>
  );
}

interface CardHeaderProps {
  index: number | string;
  title: string;
  onSimilarClick: () => void;
  onDeleteClick: () => void;
}

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

interface CardBodyProps {
  children: React.ReactNode;
}

function CardBody() {
  return (
    <div className={styles.card_body}>
      <div className={styles.card_body_badge_group}>
        <DifficultyBadge level={1} />
        <CardBadge label="72%" color={colorsHex.gray700} />
        <CardBadge label="주관식" color={colorsHex.gray600} />
      </div>
      <div className={styles.card_worksheet_image_box}>
        {/* TODO:문제 이미지 */}
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default WorksheetCard;
