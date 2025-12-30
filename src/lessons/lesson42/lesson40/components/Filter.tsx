import type { FilterType } from "../types";

type Props = {
  value: FilterType;
  onChange: (v: FilterType) => void;
};

export default function Filter({ value, onChange }: Props) {
  return (
    <div>
      {["all", "active", "done"].map(f => (
        <button
          key={f}
          onClick={() => onChange(f as FilterType)}
          style={{ fontWeight: value === f ? "bold" : "normal" }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
