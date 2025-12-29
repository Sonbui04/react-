import { useEffect, useMemo, useReducer } from "react";
import type { Todo, Priority, FilterType } from "../types";
import { todoService } from "../services/todoService";

type State = {
  todos: Todo[];
  filter: FilterType;
};

type Action =
  | { type: "INIT"; payload: Todo[] }
  | { type: "ADD"; payload: Todo }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "CLEAR" }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "SET_PRIORITY"; payload: { id: number; priority: Priority } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT":
      return { ...state, todos: action.payload };

    case "ADD":
      return { ...state, todos: [...state.todos, action.payload] };

    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      };

    case "CLEAR":
      return { ...state, todos: [] };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_PRIORITY":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? {
                ...t,
                meta: { ...t.meta, priority: action.payload.priority },
              }
            : t
        ),
      };

    default:
      return state;
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    filter: "all",
  });

 
  useEffect(() => {
    dispatch({ type: "INIT", payload: todoService.load() });
  }, []);


  useEffect(() => {
    todoService.save(state.todos);
  }, [state.todos]);

  const visibleTodos = useMemo(() => {
    if (state.filter === "active") return state.todos.filter(t => !t.done);
    if (state.filter === "done") return state.todos.filter(t => t.done);
    return state.todos;
  }, [state.todos, state.filter]);

  return {
    todos: state.todos,
    visibleTodos,
    filter: state.filter,
    doneCount: state.todos.filter(t => t.done).length,

    addTodo: (todo: Todo) => dispatch({ type: "ADD", payload: todo }),
    toggleTodo: (id: number) =>
      dispatch({ type: "TOGGLE", payload: id }),
    deleteTodo: (id: number) =>
      dispatch({ type: "DELETE", payload: id }),
    clearTodos: () => dispatch({ type: "CLEAR" }),
    setFilter: (f: FilterType) =>
      dispatch({ type: "SET_FILTER", payload: f }),
    setPriority: (id: number, priority: Priority) =>
      dispatch({ type: "SET_PRIORITY", payload: { id, priority } }),
  };
}
