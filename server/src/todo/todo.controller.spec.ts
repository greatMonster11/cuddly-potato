import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoItem } from './interface/todoItem.interface';
import { NotFoundException } from '@nestjs/common/exceptions';

// Define the mock service type
type MockTodoService = {
  [K in keyof TodoService]: jest.Mock;
};

describe('TodoController', () => {
  let controller: TodoController;
  let service: MockTodoService;

  const mockTodoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    cleanUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get(TodoService) as MockTodoService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const sampleDate = new Date();
      const createTodoDto: CreateTodoDto = {
        note: 'Test Todo',
        description: 'Test Description',
        isCompleted: false,
      };
      const expectedResult = {
        id: 1,
        ...createTodoDto,
        created: sampleDate,
        modified: sampleDate,
      } as TodoItem;

      service.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createTodoDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const sampleDate = new Date();
      const expectedResult: TodoItem[] = [
        {
          id: 1,
          note: 'Todo 1',
          description: 'Desc 1',
          isCompleted: false,
          created: sampleDate,
          modified: sampleDate,
        },
        {
          id: 2,
          note: 'Todo 2',
          description: 'Desc 2',
          isCompleted: true,
          created: sampleDate,
          modified: sampleDate,
        },
      ];

      service.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const expectedResult = {
        id: 1,
        note: 'Todo 1',
        description: 'Desc 1',
        isCompleted: false,
      };

      service.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('should throw an exception when todo is not found', async () => {
      service.findOne.mockRejectedValue(
        new NotFoundException('Todo not found'),
      );

      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        note: 'Updated Todo',
        isCompleted: true,
      };
      const expectedResult = { id: 1, ...updateTodoDto };

      service.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', updateTodoDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const sampleDate = new Date();
      const expectedResult = {
        id: 1,
        note: 'Deleted Todo',
        description: 'Deleted Description',
        isCompleted: false,
        created: sampleDate,
        modified: sampleDate,
      } as TodoItem;

      service.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('cleanUp', () => {
    it('should clean up completed todos', async () => {
      const expectedResult = {
        deletedCount: 2,
        message: 'Completed todos cleaned up',
      };

      service.cleanUp.mockResolvedValue(expectedResult);

      const result = await controller.cleanUp();

      expect(result).toEqual(expectedResult);
      expect(service.cleanUp).toHaveBeenCalled();
    });
  });
});
