export type Priority = "low" | "medium" | "high";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
  
};

export type FilterType = "all" | "active" | "done";
