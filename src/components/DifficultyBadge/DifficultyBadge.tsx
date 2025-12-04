import CardBadge from "@/components/CardBadge";
import { colorsHex } from "@/styles/colors";

type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

interface DifficultyBadgeProps {
  level: DifficultyLevel;
}

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; color: string }
> = {
  1: { label: "하", color: colorsHex.gray800 },
  2: { label: "중하", color: colorsHex.primary },
  3: { label: "중", color: colorsHex.success },
  4: { label: "상", color: "#FFC64D" },
  5: { label: "최상", color: colorsHex.error },
};

function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const { label, color } = DIFFICULTY_CONFIG[level];

  return <CardBadge label={label} color={color} />;
}

export default DifficultyBadge;
