import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";


export class TaskDto {
  @IsNotEmpty()
  @IsString()
   Title: string;

  @IsNotEmpty()
  @IsBoolean()
  IsFuture: boolean;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}