import { useRef } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function UncontrolledTodoForm({ onAdd }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const value = ref.current?.value;
        if (!value?.trim()) return;
        onAdd(value);
        ref.current!.value = "";
      }}
    >
      <input ref={ref} placeholder="Uncontrolled todo" />
      <button>Add (Uncontrolled)</button>
    </form>
  );
}
