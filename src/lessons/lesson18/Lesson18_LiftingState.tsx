import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

function TodoInput({
  text,
  onTextChange,
  onAdd,
}: {
  text: string;
  onTextChange: (value: string) => void;
  onAdd: () => void;
}) {
  return (
    <div>
      <input
        value={text}
        onChange={e => onTextChange(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
}

function TodoList({
  todos,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <ul>
      {todos.map(t => (
        <li key={t.id}>
          <span
            onClick={() => onToggle(t.id)}
            style={{
              cursor: "pointer",
              textDecoration: t.done
                ? "line-through"
                : "none",
            }}
          >
            {t.text}
          </span>
          <button onClick={() => onDelete(t.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Lesson18_LiftingState() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text, done: false },
    ]);
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

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 18 - Lifting state</h2>

      <TodoInput
        text={text}
        onTextChange={setText}
        onAdd={addTodo}
      />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
