import React from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
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
    </div>
  );
}
export function ModalHeader({ children }: { children: React.ReactNode }) {
  return <h3 style={{ marginBottom: 12 }}>{children}</h3>;
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 12 }}>{children}</div>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      {children}
    </div>
  );
}
