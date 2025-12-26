import { useState } from "react";

type Todo = {
  text: string;
  done: boolean;
};

export default function Lesson12_ToggleTodo() {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Learn React", done: false },
    { text: "Learn TypeScript", done: true },
  ]);

  const toggle = (i: number) => {
    setTodos(
      todos.map((t, idx) =>
        idx === i ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 12 - Toggle Todo</h2>
      <ul>
        {todos.map((t, i) => (
          <li
            key={t.text}
            onClick={() => toggle(i)}
            style={{
              cursor: "pointer",
              textDecoration: t.done ? "line-through" : "none",
            }}
          >
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
