import React, { useState, useMemo, useEffect } from 'react';
import { AddTodo } from '../../features/add-todo/AddTodo';
import { FilterTodos } from '../../features/filter-todos/FilterTodos';
import { applyFilter } from '../../features/filter-todos/filterStrategies';
import { TodoList } from '../../widgets/todo-list/TodoList';
import { Input } from '../../shared/ui/Input/Input';
import { useTodoStore, type TodoFilter } from '../../entities/todo';
import { useDeleteTodo } from '../../features/delete-todo/deleteTodo';
import { useToggleTodo } from '../../features/toggle-todo/toggleTodo';
import styles from './TodosPage.module.css';

export const TodosPage: React.FC = () => {
  const todos = useTodoStore((s) => s.todos);
  const fetchAll = useTodoStore((s) => s.fetchAll);
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();

  const [filter, setFilter] = useState<TodoFilter>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const visible = useMemo(() => {
    let result = applyFilter(todos, filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    return result;
  }, [todos, filter, search]);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Todos</h1>
      <AddTodo />
      <div className={styles.controls}>
        <FilterTodos current={filter} onChange={setFilter} />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>
      <TodoList
        todos={visible}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        emptyMessage="Nothing matches your search"
      />
    </div>
  );
};