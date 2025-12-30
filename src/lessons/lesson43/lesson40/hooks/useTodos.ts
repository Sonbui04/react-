import { useMemo, useReducer } from "react";
import type { Todo, Priority, FilterType } from "../types";

/* ===== STATE ===== */
type State = {
  todos: Todo[];
  filter: FilterType;
  query: string;
};

/* ===== ACTION ===== */
type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "CLEAR" }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "SET_QUERY"; payload: string }
  | {
      type: "SET_PRIORITY";
      payload: { id: number; priority: Priority };
    };

/* ===== REDUCER ===== */
function reducer(state: State, action: Action): State {
  switch (action.type) {
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

    case "SET_QUERY":
      return { ...state, query: action.payload };

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

/* ===== HOOK ===== */
export function useTodos() {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    filter: "all",
    query: "",
  });

  /* ===== DERIVED STATE ===== */
  const visibleTodos = useMemo(() => {
    let list = state.todos;

    // filter
    if (state.filter === "active") {
      list = list.filter(t => !t.done);
    }
    if (state.filter === "done") {
      list = list.filter(t => t.done);
    }

    // search
    if (state.query.trim()) {
      list = list.filter(t =>
        t.text.toLowerCase().includes(state.query.toLowerCase())
      );
    }

    return list;
  }, [state.todos, state.filter, state.query]);

  return {
    todos: state.todos,
    visibleTodos,
    filter: state.filter,
    query: state.query,
    doneCount: state.todos.filter(t => t.done).length,

    addTodo: (todo: Todo) =>
      dispatch({ type: "ADD", payload: todo }),
    toggleTodo: (id: number) =>
      dispatch({ type: "TOGGLE", payload: id }),
    deleteTodo: (id: number) =>
      dispatch({ type: "DELETE", payload: id }),
    clearTodos: () => dispatch({ type: "CLEAR" }),
    setFilter: (f: FilterType) =>
      dispatch({ type: "SET_FILTER", payload: f }),
    setQuery: (q: string) =>
      dispatch({ type: "SET_QUERY", payload: q }),
    setPriority: (id: number, priority: Priority) =>
      dispatch({
        type: "SET_PRIORITY",
        payload: { id, priority },
      }),
  };
}
