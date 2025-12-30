export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const state = {
  todos: [
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Learn Zustand", done: true },
  ],
};

export function toggleTodo(id: number) {
  console.log(" Denormalized: map toàn bộ mảng");

  state.todos = state.todos.map(todo =>
    todo.id === id
      ? { ...todo, done: !todo.done }
      : todo
  );
}
