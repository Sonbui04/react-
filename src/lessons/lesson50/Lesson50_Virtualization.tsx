import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { fetchAllTodos, type Todo } from "./api";

export default function Lesson50Virtualization() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchAllTodos().then(setTodos);
  }, [todos]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: todos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 5,
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 50 - Virtualization (React 19)</h2>
      <p>Total todos: {todos.length}</p>

      <div
        ref={parentRef}
        style={{
          height: 500,
          overflow: "auto",
          border: "1px solid #963434ff",
        }}
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const todo = todos[virtualRow.index];
            return (
              <div
                key={todo.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  borderBottom: "1px solid #831111ff",
                  background: "#fff",
                }}
              >
                <input type="checkbox" checked={todo.done} readOnly = {true} />
                <span style={{ marginLeft: 8 }}>
                  #{todo.id} - {todo.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
