import { useState } from "react";
import type { ComponentType } from "react";

export default function Todos() {
  const [Feature, setFeature] = useState<ComponentType | null>(null);
  const [loading, setLoading] = useState(false);

  const loadFeature = async () => {
    setLoading(true);
    try {
   
      const mod = await import("./features/HeavyFeature");
      setFeature(() => mod.default);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Todos</h4>
      <p>Route này là chunk riêng. Bên dưới là feature chunk riêng.</p>

      <button onClick={loadFeature} disabled={loading}>
        {loading ? "Loading feature..." : "Load heavy feature"}
      </button>

      <div style={{ marginTop: 12 }}>
        {Feature ? <Feature /> : <p>Feature chưa load.</p>}
      </div>
    </div>
  );
}
