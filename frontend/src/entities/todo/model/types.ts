/** Core Todo entity — Interface Segregation: minimal, focused */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

/** Filter type for Open/Closed principle */
export type TodoFilter = 'all' | 'active' | 'completed';