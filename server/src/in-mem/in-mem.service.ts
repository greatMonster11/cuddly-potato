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
    this.todo.push({
      ...todo,
      id: this.id++,
      isCompleted: false,
      created: new Date(),
      modified: new Date(),
    });
  }

  updateTodo(id: number, todo: TodoInput) {
    this.todo[id] = {
      ...this.todo[id],
      ...todo,
      modified: new Date(),
    };
  }

  deleteTodo(id: number) {
    this.todo = this.todo.filter((obj: TodoItem) => {
      return obj.id !== id;
    });
  }

  cleanUp() {
    this.todo = [];
    this.id = 0;
  }
}
