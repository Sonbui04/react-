import { useState } from "react";
import Lesson07_Event from "../lesson07/Lesson07_Event";

export default function Lesson08_useState() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <Lesson07_Event />

      <hr />

      <h2>Lesson 08 - useState</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>
    </div>
  );
}
