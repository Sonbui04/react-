import TodoItem from "./TodoItem";
import type { Todo } from "../types";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSetHigh: (id: number) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onSetHigh }: Props) {
  return (
    <ul>
      {todos.map(t => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onSetHigh={() => onSetHigh(t.id)}
        />
      ))}
    </ul>
  );
}
