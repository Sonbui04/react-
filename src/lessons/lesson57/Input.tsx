import { forwardRef, useId } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";

type InputVariant = "default" | "filled";
type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  size?: InputSize;
};

const wrap: CSSProperties = { display: "grid", gap: 6 };
const labelCss: CSSProperties = { fontSize: 12, fontWeight: 600 };

const baseInput: CSSProperties = {
  borderRadius: 10,
  border: "1px solid #D1D5DB",
  outline: "none",
  width: "100%",
};

const variantStyle: Record<InputVariant, CSSProperties> = {
  default: { background: "#fff" },
  filled: { background: "#F3F4F6" },
};

const sizeStyle: Record<InputSize, CSSProperties> = {
  sm: { padding: "6px 10px", fontSize: 12 },
  md: { padding: "8px 12px", fontSize: 14 },
  lg: { padding: "10px 14px", fontSize: 16 },
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    error,
    helperText,
    variant = "default",
    size = "md",
    style,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div style={wrap}>
      {label && (
        <label htmlFor={inputId} style={labelCss}>
          {label}
        </label>
      )}

      <input
        {...rest}
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        data-variant={variant}
        data-size={size}
        style={{
          ...baseInput,
          ...variantStyle[variant], 
          ...sizeStyle[size],       
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
