import { useState } from "react";

type Todo = {
  text: string;
  done: boolean;
};

export default function Lesson13_DerivedUI() {
  const [todos] = useState<Todo[]>([
    { text: "A", done: true },
    { text: "B", done: false },
    { text: "C", done: true },
  ]);

  const doneCount = todos.filter(t => t.done).length;

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 13 - Derived UI</h2>
      <p>
        Done {doneCount} / {todos.length}
      </p>
    </div>
  );
}
