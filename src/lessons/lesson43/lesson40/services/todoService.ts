import type { Todo } from "../types";

const STORAGE_KEY = "lesson40_todos";

export const todoService = {
  load(): Todo[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  save(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
