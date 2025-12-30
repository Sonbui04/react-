import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos, type Todo } from "./api";

export default function Lesson47() {

  const [filter, setFilter] = useState("");

 
 const { data, isLoading, error } = useQuery<Todo[]>({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});


  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 47 – Server state vs Client state</h2>

      <section>
        <h4>Client state (useState)</h4>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter text"
        />
        <p>Filter value: {filter}</p>
      </section>

      <hr />

    
      <section>
        <h4>Server state (TanStack Query)</h4>

        {isLoading && <p>Loading from server...</p>}
        {error && <p style={{ color: "red" }}>Error loading data</p>}

        <ul>
          {data?.map((todo) => (
  <li key={todo.id}>{todo.text}</li>
))}

        </ul>
      </section>
    </div>
  );
}
