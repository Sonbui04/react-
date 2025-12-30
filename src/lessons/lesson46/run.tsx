import * as denorm from "./denormalized";
import * as norm from "./normalized";

export default function Lesson46() {
  const runDemo = () => {
    console.clear();

    console.log("===== BEFORE =====");
    console.log("Denormalized:", denorm.state.todos);
    console.log("Normalized:", norm.state.byId);

    console.log("===== TOGGLE TODO id = 1 =====");

    denorm.toggleTodo(1);
    norm.toggleTodo(1);

    console.log("===== AFTER =====");
    console.log("Denormalized:", denorm.state.todos);
    console.log("Normalized:", norm.state.byId);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 46 – Normalization</h2>

      <p>
        Mở <b>Console</b> và bấm nút để xem sự khác nhau giữa
        <b> denormalized </b> và <b> normalized </b> state.
      </p>

      <button onClick={runDemo}>
        Run normalization demo
      </button>
    </div>
  );
}
