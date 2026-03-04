import React from 'react';
import { useTodoRepository, TodoItem } from '../../entities/todo';
import type { Todo } from '../../entities/todo';
import styles from './TodoList.module.css';

interface TodoListProps {
  filteredTodos?: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ filteredTodos, onToggle, onDelete }) => {
  const { todos } = useTodoRepository();
  const displayTodos = filteredTodos ?? todos;

  return (
    <div className={styles.list}>
      {displayTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};