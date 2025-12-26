import React from "react";

type ButtonProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  active,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        marginRight: 8,
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {children}
    </button>
  );
}
