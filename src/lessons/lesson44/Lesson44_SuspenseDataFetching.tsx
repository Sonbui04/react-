import { useState, useDeferredValue, Suspense } from "react";
import FilterGroup from "../../components/FilterGroup";
import type { Filter } from "../../components/FilterGroup";
import TodoListWithSuspense from "./TodoListWithSuspense";

export default function Lesson44_TodoApp() {
  // 1️⃣ State gốc (urgent)
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  // 2️⃣ Deferred value (non-urgent)
  const deferredQuery = useDeferredValue(query);

  return (
    <div style={{ padding: 20, maxWidth: 420 }}>
      <h2>Lesson 44 – Suspense + Data Fetching</h2>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search todo..."
      />

      <FilterGroup filter={filter} onChange={setFilter} />

      {/* 3️⃣ Suspense CHỜ DATA theo deferredQuery */}
      <Suspense fallback={<p>⏳ Đang tải todo từ server...</p>}>
        <TodoListWithSuspense
          query={deferredQuery}
          filter={filter}
        />
      </Suspense>
    </div>
  );
}
