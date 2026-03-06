import { useEffect } from 'react';
import { useTodoState, useTodoActions } from '../../entities/todo';

export function useFetchTodos() {
  const { todos, loading, error } = useTodoState();
  const { fetchAll } = useTodoActions();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { todos, loading, error };
}
