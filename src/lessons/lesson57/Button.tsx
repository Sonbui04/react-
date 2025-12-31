import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const baseStyle: CSSProperties = {
  borderRadius: 10,
  border: "1px solid transparent",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

const variantStyle: Record<ButtonVariant, CSSProperties> = {
  primary: { background: "#111827", color: "#fff" },
  secondary: { background: "#E5E7EB", color: "#111827" },
  danger: { background: "#DC2626", color: "#fff" },
  ghost: { background: "transparent", color: "#111827", borderColor: "#D1D5DB" },
};

const sizeStyle: Record<ButtonSize, CSSProperties> = {
  sm: { padding: "6px 10px", fontSize: 12 },
  md: { padding: "8px 12px", fontSize: 14 },
  lg: { padding: "10px 14px", fontSize: 16 },
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  style,
  type, 
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...rest}
      type={type ?? "button"} 
      disabled={isDisabled}
      aria-busy={isLoading || undefined} 
      data-variant={variant}             
      data-size={size}                
      style={{
        ...baseStyle,
        ...variantStyle[variant],
        ...sizeStyle[size],
        opacity: isDisabled ? 0.65 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {leftIcon}
      {isLoading ? "Loading..." : children}
      {rightIcon}
    </button>
  );
}
