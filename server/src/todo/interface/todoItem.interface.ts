export interface TodoItem {
  id: number;
  description?: string;
  isCompleted: boolean;
  note?: string;
  created: Date;
  modified: Date;
}

export interface TodoInput extends Partial<TodoItem> {
  id?: number;
  description: string;
  isCompleted: boolean;
  note?: string;
}
