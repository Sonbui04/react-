import Button from "./Button";
export type Filter = "all" | "active" | "done";

type Props = {
  filter: Filter;
  onChange: (f: Filter) => void;
};

export default function FilterGroup({ filter, onChange }: Props) {
  const filters: Filter[] = ["all", "active", "done"];

  return (
    <>
      {filters.map(f => (
        <Button
          key={f}
          active={filter === f}
          onClick={() => onChange(f)}
        >
          {f}
        </Button>
      ))}
    </>
  );
}
