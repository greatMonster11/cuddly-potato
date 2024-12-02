import { Injectable } from '@nestjs/common';
import { TodoInput, TodoItem } from 'src/todo/interface/todoItem.interface';

@Injectable()
export class InMemService {
  todo: TodoItem[];
  id: number;

  constructor() {
    this.todo = [];
    this.id = 0;
  }

  async getAll(): Promise<TodoItem[]> {
    return new Promise((res) => {
      res(this.todo);
    });
  }

  createTodo(todo: TodoInput): Promise<TodoItem> {
    return new Promise((res) => {
      this.todo.push({
        ...todo,
        id: this.id++,
        isCompleted: false,
        created: new Date(),
        modified: new Date(),
      });

      res(this.todo[this.todo.length - 1]);
    });
  }

  async updateTodo(id: number, todo: TodoInput): Promise<TodoItem> {
    return new Promise((res) => {
      this.todo[id] = {
        ...this.todo[id],
        ...todo,
        modified: new Date(),
      };

      res(this.todo[id]);
    });
  }

  async deleteTodo(id: number): Promise<TodoItem | null> {
    return new Promise((res) => {
      const removed = this.todo[id];
      this.todo = this.todo.filter((obj: TodoItem) => {
        return obj.id !== id;
      });

      res(removed);
    });
  }

  async cleanUp(): Promise<TodoItem[]> {
    return new Promise((res) => {
      this.todo = [];
      this.id = 0;

      res(this.todo);
    });
  }
}
