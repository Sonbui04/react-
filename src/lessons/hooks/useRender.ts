import { useEffect, useRef } from "react";

export function useRender(name: string) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`${name} render #${renderCount.current}`);
  });
}
