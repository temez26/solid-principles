import type React from 'react';
import { IoCheckmarkCircle, IoEllipseOutline, IoTrash } from 'react-icons/io5';

import type { Todo } from '../model/types';

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * SRP: Only renders a single todo item.
 * Delegates actions upward via callbacks.
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <button
        className={styles.checkBtn}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed ? (
          <IoCheckmarkCircle size={24} color="var(--color-success)" />
        ) : (
          <IoEllipseOutline size={24} color="var(--color-text-secondary)" />
        )}
      </button>

      <span className={styles.title}>{todo.title}</span>

      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <IoTrash size={18} />
      </button>
    </div>
  );
};
