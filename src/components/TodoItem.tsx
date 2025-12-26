import Button from "./Button";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: Props) {
  return (
    <li>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          cursor: "pointer",
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <Button onClick={() => onDelete(todo.id)}>X</Button>
    </li>
  );
}
