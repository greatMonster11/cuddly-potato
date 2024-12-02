import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InMemService } from 'src/in-mem/in-mem.service';
import { TodoItem } from './interface/todoItem.interface';

@Injectable()
export class TodoService {
  constructor(private readonly imMemService: InMemService) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoItem> {
    return await this.imMemService.createTodo(createTodoDto);
  }

  async findAll(): Promise<TodoItem[]> {
    return await this.imMemService.getAll();
  }

  findOne(id: number): TodoItem | string | null {
    return `the single record with id ${id}`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.imMemService.updateTodo(id, updateTodoDto as any);
  }

  async remove(id: number) {
    return await this.imMemService.deleteTodo(id);
  }

  async cleanUp() {
    return await this.imMemService.cleanUp();
  }
}
