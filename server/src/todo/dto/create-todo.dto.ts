import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  id: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsDate()
  created: Date;

  @IsDate()
  modified: Date;
}
