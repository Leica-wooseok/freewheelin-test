import CardBadge from "@/components/CardBadge";

type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

interface DifficultyBadgeProps {
  level: DifficultyLevel;
}

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; color: string }
> = {
  1: { label: "하", color: "#5C5C5C" },
  2: { label: "중하", color: "#00ABFF" },
  3: { label: "중", color: "#54C0B1" },
  4: { label: "상", color: "#FD5354" },
  5: { label: "최상", color: "#FD5354" },
};

function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const { label, color } = DIFFICULTY_CONFIG[level];

  return <CardBadge label={label} color={color} />;
}

export default DifficultyBadge;
