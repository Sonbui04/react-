
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export async function fetchTodosPage(
  page: number,
  limit = 5
): Promise<Todo[]> {
  const res = await fetch(
    `http://localhost:3000/api/todos?_page=${page}&_limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}
