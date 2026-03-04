import { useTodoRepository } from '../../entities/todo';

export const useToggleTodo = () => {
  const { toggle } = useTodoRepository();
  return toggle;
};