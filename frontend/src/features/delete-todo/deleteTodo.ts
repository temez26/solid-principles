import { useTodoRepository } from '../../entities/todo';

export const useDeleteTodo = () => {
  const { remove } = useTodoRepository();
  return remove;
};