function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}

export default function Lesson15_ReusableComponent() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 15 - Reusable Component</h2>
      <Button label="Save" />
      <Button label="Cancel" />
    </div>
  );
}
