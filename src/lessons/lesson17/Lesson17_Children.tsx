type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 4,
      }}
    >
      {children}
    </div>
  );
}

export default function Lesson17_Children() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 17 - Props children</h2>

      <Card>
        <h3>Todo title</h3>
        <p>This is content inside Card</p>
        <button>Action</button>
      </Card>
    </div>
  );
}
