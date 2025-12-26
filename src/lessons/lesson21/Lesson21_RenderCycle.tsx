import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Filter = "all" | "active" | "done";
function Button({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  console.log("Child Button render");

  return (
    <button
      onClick={onClick}
      style={{
        marginRight: 8,
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  console.log("Child Card render");

  return (
    <div
      style={{
        border: "1px solid #0c0303ff",
        padding: 12,
        marginTop: 12,
      }}
    >
      {children}
    </div>
  );
}


export default function Lesson21_RenderCycle() {
  console.log("Parent TodoApp render");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const visibleTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter(t => !t.done)
      : todos.filter(t => t.done);

  const doneCount = todos.filter(t => t.done).length;
  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h2>Lesson 21 - Todo App</h2>
      <Card>
        <form onSubmit={addTodo}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter todo"
          />
          <Button>Add</Button>
        </form>
        <p>Preview: {text}</p>
      </Card>
      <Card>
        <Button
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          active={filter === "done"}
          onClick={() => setFilter("done")}
        >
          Done
        </Button>
      </Card>

      <Card>
        <ul>
          {visibleTodos.map(t => (
            <li key={t.id}>
              <span
                onClick={() => toggleTodo(t.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: t.done
                    ? "line-through"
                    : "none",
                }}
              >
                {t.text}
              </span>
              <Button onClick={() => deleteTodo(t.id)}>
                X
              </Button>
            </li>
          ))}
        </ul>

        <p>
          Done {doneCount} / {todos.length}
        </p>
      </Card>
    </div>
  );
}
