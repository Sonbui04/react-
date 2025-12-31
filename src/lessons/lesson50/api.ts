
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export async function fetchAllTodos(): Promise<Todo[]> {
  const res = await fetch("http://localhost:3000/api/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}
