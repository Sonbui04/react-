export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type NormalizedState = {
  byId: Record<number, Todo>;
  allIds: number[];
};

export const state: NormalizedState = {
  byId: {
    1: { id: 1, text: "Learn React", done: false },
    2: { id: 2, text: "Learn Zustand", done: true },
  },
  allIds: [1, 2],
};

export function toggleTodo(id: number) {
  const todo = state.byId[id];
  if (!todo) return;

  state.byId[id] = {
    ...todo,
    done: !todo.done,
  };
}
