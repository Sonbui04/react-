import React, { useMemo, useState } from "react";

type Todo = { id: number; text: string };

export default function Lesson51_MemoPitfalls() {
  const [query, setQuery] = useState("");
  const [todos] = useState<Todo[]>([
    { id: 1, text: "learn react" },
    { id: 2, text: "learn typescript" },
    { id: 3, text: "drink coffee" },
  ]);

  const filtered = useMemo(() => {
    console.log("useMemo run "); 
    return todos.filter(t => t.text.includes(query));
  }, [todos,query]); 

  return (
    <div style={{ padding: 16 }}>
      <h3> Lesson51</h3>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type query..."
      />

      <p>Query: "{query}"</p>
      <p>Filtered count: {filtered.length}</p>

      <ul>
        {filtered.map(t => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
