import { useState } from "react";

export default function Lesson11_DeleteTodo() {
  const [todos, setTodos] = useState<string[]>([
    "Learn React",
    "Learn TypeScript",
  ]);

  const remove = (i: number) => {
    setTodos(todos.filter((_, idx) => idx !== i));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 11 - Delete Todo</h2>
      <ul>
        {todos.map((t, i) => (
          <li key={t}>
            {t}
            <button onClick={() => remove(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
