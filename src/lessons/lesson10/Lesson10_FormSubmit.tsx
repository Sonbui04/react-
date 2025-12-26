import { useState } from "react";
import Lesson09_ControlledInput from "../lesson09/Lesson09_ControlledInput";

export default function Lesson10_FormSubmit() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setTodos([...todos, value]);
    setValue("");
  };

  return (
    <div style={{ padding: 20 }}>
      <Lesson09_ControlledInput />

      <hr />

      <h2>Lesson 10 - Form Submit</h2>

      <form onSubmit={submit}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
