import { IsString } from 'class-validator';

export class BuildingsDto {
  @IsString()
  buildingName: string;
}
