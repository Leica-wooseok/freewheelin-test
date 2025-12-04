import styles from "./CardBadge.module.scss";

interface CardBadgeProps {
  label: string;
  color?: string;
}

function CardBadge({ label, color = "#707070" }: CardBadgeProps) {
  return (
    <div className={styles.card_badge} style={{ color }}>
      {label}
    </div>
  );
}

export default CardBadge;
