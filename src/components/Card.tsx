import React from "react";

export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid #0c0303ff",
        padding: 12,
        marginTop: 12,
      }}
    >
      {children}
    </div>
  );
}
