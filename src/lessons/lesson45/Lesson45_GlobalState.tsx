import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";
import { useTodoStore } from "./todoStore";

function TodoApp() {
  const { theme, toggleTheme } = useTheme();

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 420,
        background: theme === "light" ? "#fff" : "#1e1e1e",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h2>Lesson 45 – Global State</h2>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>

      <hr />

      <button onClick={() => addTodo("Learn Global State")}>
        Add Todo
      </button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggleTodo(t.id)}
              style={{
                cursor: "pointer",
                textDecoration: t.done ? "line-through" : "none",
              }}
            >
              {t.text}
            </span>
            <button onClick={() => removeTodo(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Lesson45_GlobalState() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}
