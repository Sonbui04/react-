import { useState } from "react";
import type { Priority } from "../types";

type Props = {
  onAdd: (title: string, desc: string, priority: Priority) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title, desc, priority);
        setTitle("");
        setDesc("");
        setPriority("medium");
      }}
    >
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button>Add</button>
    </form>
  );
}
