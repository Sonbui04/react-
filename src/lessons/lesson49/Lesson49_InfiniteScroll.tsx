import { useEffect, useRef, useState } from "react";
import { fetchTodosPage, type Todo } from "./api";

export default function Lesson49InfiniteScroll() {
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

 
  const fetchingRef = useRef(false);


  useEffect(() => {
    if (!hasMore) return;
    if (fetchingRef.current) return;

    fetchingRef.current = true;

  
    Promise.resolve().then(() => setLoading(true));

    fetchTodosPage(page)
      .then(newTodos => {
        setTodos(prev => 
          {

          const existingIds = new Set(prev.map(t => t.id));
          const filtered = newTodos.filter(
            t => !existingIds.has(t.id)
          );
          return [...prev, ...filtered];
        });


        if (newTodos.length === 0) {
          setHasMore(false);
        }
      })
      .finally(() => {
        fetchingRef.current = false;
        setLoading(false);
      });
  }, [page, hasMore]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 20;

      if (nearBottom && hasMore && !fetchingRef.current) {
        setPage(p => p + 1);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 49 - Infinite Scroll (Final)</h2>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} {todo.done ? "" : ""}
          </li>
        ))}
      </ul>

      {loading && <p>Loading more...</p>}
      {!hasMore && <p>Hết dữ liệu</p>}
    </div>
  );
}
