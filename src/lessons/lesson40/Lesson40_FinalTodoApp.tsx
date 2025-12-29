import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

export default function Lesson40_TodoApp() {
  const {
    todos,
    visibleTodos,
    filter,
    doneCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearTodos,
    setFilter,
    setPriority,
  } = useTodos();

  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h2>Lesson 40 – Full TodoApp (Scalable)</h2>

      <TodoForm
        onAdd={(title, desc, priority) =>
          addTodo({
            id: Date.now(),
            text: `${title} - ${desc}`,
            done: false,
            meta: { priority, createdAt: Date.now() },
          })
        }
      />

      <Filter value={filter} onChange={setFilter} />

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
