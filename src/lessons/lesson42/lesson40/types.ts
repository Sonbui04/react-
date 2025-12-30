export type Priority = "low" | "medium" | "high";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
  meta: {
    priority: Priority;
    createdAt: number;
  };
};

export type FilterType = "all" | "active" | "done";
