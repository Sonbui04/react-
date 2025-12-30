import type { Todo } from "../types";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSetHigh: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onSetHigh,
}: Props) {
  if (todos.length === 0) {
    return <p>No todos</p>;
  }

  return (
    <ul style={{ marginTop: 12 }}>
      {todos.map(t => (
        <li key={t.id} style={{ marginBottom: 8 }}>
          <span
            onClick={() => onToggle(t.id)}
            style={{
              cursor: "pointer",
              textDecoration: t.done ? "line-through" : "none",
            }}
          >
            {t.text}
          </span>

          <small style={{ marginLeft: 8 }}>
            ({t.meta.priority})
          </small>

          <button onClick={() => onSetHigh(t.id)}>
            Set High
          </button>

          <button onClick={() => onDelete(t.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
