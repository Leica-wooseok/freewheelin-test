// SCSS 변수를 TypeScript에서 사용하기 위한 색상 상수
// global.scss의 CSS Variables와 동기화되어 있습니다

export const colors = {
  white: "var(--color-white)",
  gray100: "var(--gray-100)",
  gray200: "var(--gray-200)",
  gray300: "var(--gray-300)",
  gray400: "var(--gray-400)",
  gray500: "var(--gray-500)",
  gray600: "var(--gray-600)",
  gray700: "var(--gray-700)",
  gray800: "var(--gray-800)",
  gray900: "var(--gray-900)",
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  error: "var(--color-error)",
} as const;

export const colorsHex = {
  white: "#fff",
  gray100: "#fafafa",
  gray200: "#f5f5f5",
  gray300: "#e8e8e8",
  gray400: "#e0e0e0",
  gray500: "#c0c0c0",
  gray600: "#959595",
  gray700: "#707070",
  gray800: "#5c5c5c",
  gray900: "#333333",
  primary: "#00abff",
  success: "#54c0b1",
  error: "#fd5354",
} as const;
