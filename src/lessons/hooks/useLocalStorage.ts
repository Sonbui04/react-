import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [value, setStoredValue] as const;
}
