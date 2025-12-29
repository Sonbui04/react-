import React from "react";
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

function TodoItem({ todo, onToggle, onDelete }: Props) {
  console.log("todo items render");

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

export default React.memo(TodoItem);
