import Lesson05_RenderList from "../lesson05/Lesson05_RenderList";

export default function Lesson06_ConditionalRender() {
  const items: string[] = [];

  return (
    <div style={{ padding: 20 }}>
      <Lesson05_RenderList />

      <hr />

      <h2>Lesson 06 - Conditional Rendering</h2>

      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul>
          {items.map(i => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

