// SCSS 변수를 TypeScript에서 사용하기 위한 색상 상수

export const colors = {
  white: "var(--color-white)",
  gray100: "var(--gray-100)",
  gray200: "var(--gray-200)",
  gray400: "var(--gray-400)",
  gray600: "var(--gray-600)",
  gray700: "var(--gray-700)",
  gray800: "var(--gray-800)",
  gray900: "var(--gray-900)",
} as const;

export const colorsHex = {
  white: "#fff",
  gray100: "#fafafa",
  gray200: "#f5f5f5",
  gray400: "#e0e0e0",
  gray600: "#959595",
  gray700: "#707070",
  gray800: "#5c5c5c",
  gray900: "#333333",
} as const;
