import { useMemo, useState } from "react";
import Input from ".//Input";
import Button from "./Button";

export type Todo = { id: number; text: string; done: boolean };

type Props = {
  todos: Todo[];
  onClearDone?: () => void;
};

export default function TodoFilter({ todos, onClearDone }: Props) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return todos;
    return todos.filter(t => t.text.toLowerCase().includes(q));
  }, [todos, query]);

  const doneCount = visible.filter(t => t.done).length;

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
      <h3>TodoFilter</h3>

      <Input
        label="Search"
        placeholder="Type to search..."
        variant="filled"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <p>
        Showing: {visible.length} / Done: {doneCount}
      </p>

      <ul aria-label="todo-list">
        {visible.map(t => (
          <li key={t.id}>
            {t.text} {t.done ? "(done)" : ""}
          </li>
        ))}
      </ul>

      <Button
        variant="secondary"
        onClick={onClearDone}
        disabled={doneCount === 0}
      >
        Clear done
      </Button>
    </div>
  );
}
