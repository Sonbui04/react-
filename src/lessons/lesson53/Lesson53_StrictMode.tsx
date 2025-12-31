import { useEffect } from "react";

export default function StrictModeEffectDemo() {
  console.log("render");

  useEffect(() => {
    console.log("effect setup");
    return () => {
      console.log("effect cleanup");
    };
  }, []);

  return <div style={{ padding: 16 }}>Open console</div>;
}
