import { useEffect } from 'react';
import { useTodoRepository } from '../../entities/todo';

export function useFetchTodos() {
  const { todos, loading, error, fetchAll } = useTodoRepository();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { todos, loading, error };
}
