import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  Query,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BuildingsService } from '../services/buildings.service';
import {
  BuildingsQueryFilter,
  BuildingsQueryParams,
} from '../dto/filter/buildings.filter.dto';
import { BuildingsDto } from '../dto/response/buildings.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Controller('/api/buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  async getAllBuildings(
    @Query(new ValidationPipe({ transform: true })) query: BuildingsQueryParams,
  ): Promise<BuildingsDto[]> {
    return this.buildingsService.getAllBuildings(query);
  }

  @Get(':id')
  async getBuildingById(@Param('id') id: number): Promise<BuildingsDto> {
    if (!id) {
      throw new NotFoundException(`Building ${id} does not exist`);
    }
    const locationFilter = new BuildingsQueryFilter();
    locationFilter.id = id;
    const query = new BuildingsQueryParams();
    query.filter = locationFilter;

    const result = await this.buildingsService.getAllBuildings(query);
    return result[0];
  }

  @Post()
  async createBuilding(
    @Body() createBuildingDto: BuildingsDto,
  ): Promise<number[]> {
    const buildingDto = plainToClass(BuildingsDto, createBuildingDto); // Convert plain object to class instance
    const errors = await validate(buildingDto); // Validate the buildingDto object

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Validation failed',
          errors: errors.map((error) => {
            return {
              property: error.property,
              constraints: error.constraints,
            };
          }),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.buildingsService.createBuilding(createBuildingDto);
  }

  @Put(':id')
  async updateBuilding(
    @Param('id') id: number,
    @Body() updateBuildingDto: BuildingsDto,
  ): Promise<number[]> {
    if (!id) {
      throw new NotFoundException(`Building ${id} does not exist`);
    }

    const buildingDto = plainToClass(BuildingsDto, updateBuildingDto); // Convert plain object to class instance
    const errors = await validate(buildingDto); // Validate the buildingDto object

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Validation failed',
          errors: errors.map((error) => {
            return {
              property: error.property,
              constraints: error.constraints,
            };
          }),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.buildingsService.updateBuilding(id, updateBuildingDto);
  }

  @Delete(':id')
  async deleteBuilding(@Param('id') id: number): Promise<boolean> {
    return this.buildingsService.deleteBuilding(id);
  }
}
