import { useTodoStore } from '../../entities/todo';

/** SRP: single-purpose hook for deleting a todo */
export function useDeleteTodo() {
  return useTodoStore((s) => s.remove);
}