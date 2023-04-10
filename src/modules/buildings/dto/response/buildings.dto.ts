import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BuildingsDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  buildingName: string;
}
