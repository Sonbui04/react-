export default function HeavyFeature() {
 
  let total = 0;
  for (let i = 0; i < 2_000_000; i++) total += i;

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      <h4>Heavy Feature</h4>
      
      <p>Dummy total: {total}</p>
    </div>
  );
}
