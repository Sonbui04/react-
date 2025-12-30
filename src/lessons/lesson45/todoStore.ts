import { create } from "zustand";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],

  addTodo: text =>
    set(state => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, done: false },
      ],
    })),

  toggleTodo: id =>
    set(state => ({
      todos: state.todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),

  removeTodo: id =>
    set(state => ({
      todos: state.todos.filter(t => t.id !== id),
    })),
}));
