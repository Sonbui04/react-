import type { Todo } from "../../components/TodoItem";

type Resource<T> = {
  read: () => T;
};

function createResource<T>(promise: Promise<T>): Resource<T> {
  let status: "pending" | "success" | "error" = "pending";
  let result: T;
  let error: unknown;

  const suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      error = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      }
      if (status === "error") {
        throw error;
      }
      return result;
    },
  };
}

const todoResourceCache = new Map<string, Resource<Todo[]>>();

export function getTodoResource(query: string): Resource<Todo[]> {
  if (!todoResourceCache.has(query)) {
    const resource = createResource<Todo[]>(
      fetch(`http://localhost:3000/api/todos?q=${query}`).then(res => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
    );

    todoResourceCache.set(query, resource);
  }

  return todoResourceCache.get(query)!;
}
