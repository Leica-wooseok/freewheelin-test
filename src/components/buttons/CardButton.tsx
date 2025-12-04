import styles from "./CardButton.module.scss";
import clsx from "clsx";
import React from "react";

type CardButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};

export default function CardButton({
  label,
  icon,
  onClick,
  active,
}: CardButtonProps) {
  return (
    <button
      className={clsx(styles.card_button_root, { [styles.active]: active })}
      onClick={onClick}
    >
      {icon && icon}
      <span>{label}</span>
    </button>
  );
}
