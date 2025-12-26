import { useEffect, useState } from "react";

import Button from "../../components/Button";
import Card from "../../components/Card";
import FilterGroup from "../../components/FilterGroup";
import TodoItem from "../../components/TodoItem";

import type { Filter } from "../../components/FilterGroup";
import type { Todo } from "../../components/TodoItem";


export default function Lesson24_FetchData() {
  const [seconds, setSeconds] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const doneCount = todos.filter(t => t.done).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    fetch("http://localhost:3000/api/todos")
      .then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then(data => setTodos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

    return () => clearInterval(timer);
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

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

  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h2>Lesson 24 - FetchData (Refactor)</h2>

      <Card>
        <form onSubmit={addTodo}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter todo"
          />
          <Button>Add</Button>
        </form>

        <p>Seconds: {seconds}</p>
        <p>Preview: {text}</p>
      </Card>

      <Card>
        <FilterGroup filter={filter} onChange={setFilter} />
      </Card>

      <Card>
        <ul>
          {visibleTodos.map(t => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>

        <p>
          Done {doneCount} / {todos.length}
        </p>
      </Card>
    </div>
  );
}
