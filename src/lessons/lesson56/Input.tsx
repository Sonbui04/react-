import { forwardRef } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";

type InputVariant = "default" | "filled";
type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
};

const wrap: CSSProperties = { display: "grid", gap: 6 };
const labelCss: CSSProperties = { fontSize: 12, fontWeight: 600 };

const base: CSSProperties = {
  borderRadius: 10,
  border: "1px solid #D1D5DB",
  outline: "none",
  width: "auto",
};

const variants: Record<InputVariant, CSSProperties> = {
  default: { background: "#fff" },
  filled: { background: "#fff" },
};

const sizes: Record<InputSize, CSSProperties> = {
  sm: { padding: "6px 8px", fontSize: 12 },
  md: { padding: "8px 12px", fontSize: 14 },
  lg: { padding: "10px 14px", fontSize: 16 },
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, variant = "default", size = "md", style, ...rest },
  ref
) {
  return (
    <div style={wrap}>
      {label && <label style={labelCss}>{label}</label>}

      <input
        {...rest}
        ref={ref}
        aria-invalid={!!error}
        style={{
          ...base,
          ...variants[variant],
          ...sizes[size],
          borderColor: error ? "#DC2626" : "#D1D5DB",
          ...style,
        }}
      />

      {error ? (
        <small style={{ color: "#DC2626" }}>{error}</small>
      ) : helperText ? (
        <small style={{ color: "#6B7280" }}>{helperText}</small>
      ) : null}
    </div>
  );
});

export default Input;
