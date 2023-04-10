import { Transform, Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class BuildingsQuerySort {
  @IsIn(['asc', 'desc'])
  type: string;

  @IsString()
  field: string;
}

export class BuildingsQueryFilter {
  @IsOptional()
  @Transform((o) => +o.value)
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  buildingName?: string;
}

export class BuildingsQueryParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => BuildingsQuerySort)
  sort?: BuildingsQuerySort;

  @IsOptional()
  @ValidateNested()
  @Type(() => BuildingsQueryFilter)
  filter?: BuildingsQueryFilter;
}
