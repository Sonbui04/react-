type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      placeholder="Search todo..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "50%",
        padding: 6,
        marginBottom: 5,
      }}
    />
  );
}
