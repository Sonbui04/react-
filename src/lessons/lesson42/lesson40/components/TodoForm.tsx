import { useState } from "react";
import type { Priority } from "../types";

type Props = {
  onAdd: (title: string, desc: string, priority: Priority) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title, desc, priority);

   
    setTitle("");
    setDesc("");
    setPriority("medium");
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
