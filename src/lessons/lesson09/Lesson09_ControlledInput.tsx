import { useState } from "react";
import Lesson08_useState from "../lesson08/Lesson08_useState";

export default function Lesson09_ControlledInput() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <Lesson08_useState />

      <hr />

      <h2>Lesson 09 - Controlled Input</h2>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter text"
      />

      <p>{text}</p>
    </div>
  );
}
