import { getTodoResource } from "./todoResource";
import TodoItem from "../../components/TodoItem";
import type { Filter } from "../../components/FilterGroup";
import type { Todo } from "../../components/TodoItem";

type Props = {
  query: string;
  filter: Filter;
};

export default function TodoListWithSuspense({ query, filter }: Props) {
  const todos: Todo[] = getTodoResource(query).read();

  const visibleTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter(t => !t.done)
      : todos.filter(t => t.done);

  return (
    <ul>
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => {}}
          onDelete={() => {}}
        />
      ))}
    </ul>
  );
}
