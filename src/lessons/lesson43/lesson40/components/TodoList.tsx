import type { Todo } from "../types";

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props) {
  return (
    <ul>
      {todos.map(t => (
        <li key={t.id}>
          {t.text} {t.done ? "x" : ""}
        </li>
      ))}
    </ul>
  );
}
