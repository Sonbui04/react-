import { useState, useTransition, lazy, Suspense } from "react";
import type { Todo } from "./types";

const TodoList = lazy(() => import("../TodoList.lazy"));

export default function Lesson43() {
  const [todos] = useState<Todo[]>([
    { id: 1, text: "Learn Suspense", done: false },
    { id: 2, text: "Learn Lazy", done: true },
    { id: 3, text: "Understand fallback", done: false },
  ]);

  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredTodos = todos.filter(t =>
    t.text.toLowerCase().includes(query.toLowerCase())
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Lesson 43 – Suspense cơ bản</h2>

      <input
        placeholder="Search todo..."
        onChange={onSearch}
      />

      {isPending && <p>Filtering (transition)...</p>}

      <Suspense fallback={<p>⏳ Loading TodoList...</p>}>
        <TodoList todos={filteredTodos} />
      </Suspense>
    </div>
  );
}
