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

  getAll(): TodoItem[] {
    return this.todo;
  }

  createTodo(todo: TodoInput) {
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

  updateTodo(id: number, todo: TodoInput) {
    this.todo[id] = {
      ...this.todo[id],
      ...todo,
      modified: new Date(),
    };

    return this.todo[id];
  }

  deleteTodo(id: number) {
    const removed = this.todo[id];
    this.todo = this.todo.filter((obj: TodoItem) => {
      return obj.id !== id;
    });

    return removed;
  }

  cleanUp() {
    this.todo = [];
    this.id = 0;

    return this.todo;
  }
}
