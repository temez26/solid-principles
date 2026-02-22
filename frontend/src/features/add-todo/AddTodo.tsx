import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';
import { useTodoStore } from '../../entities/todo';
import styles from './AddTodo.module.css';

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const add = useTodoStore((s) => s.add);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    // The store's add() now calls the API; backend generates the ID
    add({
      id: '',          // placeholder — overwritten by API response
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    });

    setTitle('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        fullWidth
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="primary">
        <IoAdd size={18} />
        Add
      </Button>
    </form>
  );
};