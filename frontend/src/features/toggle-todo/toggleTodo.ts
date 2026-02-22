import { useTodoStore } from '../../entities/todo';

/** SRP: single-purpose hook for toggling a todo */
export function useToggleTodo() {
  return useTodoStore((s) => s.toggle);
}