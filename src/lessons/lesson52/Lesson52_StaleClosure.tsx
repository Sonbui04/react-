import { useEffect, useState } from "react";

export default function Lesson52_StaleClosure_BUG() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev =>prev  + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []); 

  return (
    <div style={{ padding: 16 }}>
      <h3>Lesson52 - Stale closure</h3>
      <p>Count: {count}</p>
      
    </div>
  );
}
