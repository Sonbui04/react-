import { useTransition } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import SearchInput from "./components/SearchInput";

export default function Lesson42_ConcurrentTodoApp() {
  const {
    todos,
    visibleTodos,
    filter,
    query,
    doneCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearTodos,
    setFilter,
    setQuery,
    setPriority,
  } = useTodos();

  const [isPending, startTransition] = useTransition();

  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h2>Lesson 42 – Concurrent TodoApp</h2>

      <SearchInput value={query} onChange={value => {startTransition(() => {setQuery(value); });
        }}
      />

      {isPending && <small>Searching...</small>}

      
      <Filter value={filter} onChange={setFilter} />

 
      <TodoForm
        onAdd={(title, desc, priority) =>
          addTodo({
            id: Date.now(),
            text: `${title} - ${desc}`,
            done: false,
            meta: {
              priority,
              createdAt: Date.now(),
            },
          })
        }
      />

    
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onSetHigh={id => setPriority(id, "high")}
      />

      <p>
        Done {doneCount} / {todos.length}
      </p>

      <button onClick={clearTodos}>Clear all</button>
    </div>
  );
}
