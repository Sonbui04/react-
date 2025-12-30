import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodoApi, type Todo } from "./api";


const initialTodos: Todo[] = [
  { id: 1, text: "Learn React", done: false  },
  { id: 2, text: "Learn TanStack Query", done: false },
];

export default function Lesson48() {
  const queryClient = useQueryClient();

  
  const { data: todos = initialTodos } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => initialTodos,
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodoApi,

  onMutate: async (todo) => {
  console.log(" onMutate - optimistic update");

  await queryClient.cancelQueries({ queryKey: ["todos"] });

  const previousTodos =
    queryClient.getQueryData<Todo[]>(["todos"]);

  queryClient.setQueryData<Todo[]>(["todos"], old =>
    old?.map(t =>
      t.id === todo.id ? { ...t, done: !t.done } : t
    )
  );

  return { previousTodos };
},


   onError: (_err, _todo, context) => {
  console.log(" onError - rollback");

  if (context?.previousTodos) {
    queryClient.setQueryData(
      ["todos"],
      context.previousTodos
    );
  }
},


    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson 48 - Optimistic update</h2>

      <p>
        Click để toggle todo. 50% request sẽ <b>fail</b>.
       
      </p>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleMutation.mutate(todo)}
              />
              {todo.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
