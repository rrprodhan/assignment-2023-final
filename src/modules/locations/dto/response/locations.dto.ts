import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class LocationsDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  locationName: string;

  @IsString()
  locationNumber: string;

  @IsNumber()
  locationArea: number;

  @IsInt()
  buildingId: number;
}

export class UpdateLocationsDto {
  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  locationNumber?: string;

  @IsOptional()
  @IsNumber()
  locationArea?: number;

  @IsOptional()
  @IsInt()
  buildingId?: number;
}
