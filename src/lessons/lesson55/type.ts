export type Todo = {
  id: number;
  text: string;
  done: boolean;
  meta: {
    priority: "low" | "medium" | "high";
    createdAt: number;
  };
};
