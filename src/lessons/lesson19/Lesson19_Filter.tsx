import { useState } from "react";

type Filter = "all" | "done";

export default function Lesson19_Filter() {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 19 - Filter</h2>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("done")}>Done</button>
      <p>{filter}</p>
    </div>
  );
}
