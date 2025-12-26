import { useState } from "react";

export default function Lesson07_EventHandling() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 7 - Event handling</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Click +
      </button>
    </div>
  );
}
