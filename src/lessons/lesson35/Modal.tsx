import React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 400,
          background: "#fff",
          borderRadius: 8,
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}
