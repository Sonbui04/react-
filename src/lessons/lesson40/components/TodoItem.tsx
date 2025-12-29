import type { Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onSetHigh: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onSetHigh }: Props) {
  return (
    <li>
      <span
        onClick={onToggle}
        style={{
          cursor: "pointer",
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button onClick={onDelete}>X</button>

      <div>
        Priority: <b>{todo.meta.priority}</b>
        <button onClick={onSetHigh}>Set High</button>
      </div>
    </li>
  );
}
