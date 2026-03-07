import type React from 'react';
import { useState } from 'react';


import { useTodoActions } from '../../entities/todo';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import styles from './AddTodo.module.css';

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { add } = useTodoActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    await add(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        fullWidth
        className={styles.input}
      />
      <Button type="submit" variant="primary">
        Add
      </Button>
    </form>
  );
};
