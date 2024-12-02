import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InMemService } from 'src/in-mem/in-mem.service';
import { TodoItem } from './interface/todoItem.interface';

@Injectable()
export class TodoService {
  constructor(private readonly imMemService: InMemService) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.imMemService.createTodo(createTodoDto);
  }

  findAll(): TodoItem[] {
    return this.imMemService.getAll();
  }

  findOne(id: number): TodoItem | string | null {
    return `the single record with id ${id}`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.imMemService.updateTodo(id, updateTodoDto as any);
  }

  remove(id: number) {
    this.imMemService.deleteTodo(id);
  }

  cleanUp() {
    this.imMemService.cleanUp();
  }
}
