
type Todo = {
  id: number;
  text: string;
  done: boolean;
};


type Props = {
  todos: Todo[];
};


export default function TodoListLazy({ todos }: Props) {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          {todo.text} {todo.done ? "" : ""}
        </li>
      ))}
    </ul>
  );
}
