import { Transform, Type } from 'class-transformer';
import {
  IsDecimal,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LocationsQuerySort {
  @IsIn(['asc', 'desc'])
  type?: string;

  @IsString()
  field: string;
}

export class LocationsQueryFilter {
  @IsOptional()
  @Transform((o) => +o.value)
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  locationNumber?: string;

  @IsOptional()
  @Transform((o) => +o.value)
  @IsDecimal({ decimal_digits: '2' })
  locationArea?: number;

  @IsOptional()
  @Transform((o) => +o.value)
  @IsInt()
  buildingId?: number;
}

export class LocationsQueryParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationsQuerySort)
  sort?: LocationsQuerySort;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationsQueryFilter)
  filter?: LocationsQueryFilter;
}
