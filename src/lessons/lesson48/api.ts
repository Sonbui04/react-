

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export async function toggleTodoApi(todo: Todo): Promise<Todo> {
 
  await new Promise(resolve => setTimeout(resolve, 800));
    throw new Error("Server error");
  return {
    ...todo,
    done: !todo.done,
  };
}
