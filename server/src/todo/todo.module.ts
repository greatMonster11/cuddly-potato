import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { InMemModule } from 'src/in-mem/in-mem.module';
import { InMemService } from 'src/in-mem/in-mem.service';

@Module({
  imports: [InMemModule],
  controllers: [TodoController],
  providers: [TodoService, InMemService],
})
export class TodoModule {}
