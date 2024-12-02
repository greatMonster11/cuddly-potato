import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsBoolean()
  isCompleted: boolean;
}
