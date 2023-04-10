import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ValidationPipe,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocationsService } from '../services/locations.service';
import {
  LocationsDto,
  UpdateLocationsDto,
} from '../dto/response/locations.dto';
import {
  LocationsQueryFilter,
  LocationsQueryParams,
} from '../dto/filter/locations.filter.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('/api/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getAllLocations(
    @Query(new ValidationPipe({ transform: true })) query: LocationsQueryParams,
  ): Promise<LocationsDto[]> {
    return this.locationsService.getAllLocations(query);
  }

  @Get(':id')
  async getLocationById(@Param('id') id: number): Promise<LocationsDto> {
    if (!id) {
      throw new NotFoundException(`Location ${id} does not exist`);
    }
    const locationFilter = new LocationsQueryFilter();
    locationFilter.id = id;
    const query = new LocationsQueryParams();
    query.filter = locationFilter;

    const result = await this.locationsService.getAllLocations(query);
    return result[0];
  }

  @Post()
  async createLocation(
    @Body() createLocationDto: LocationsDto,
  ): Promise<number[]> {
    const buildingDto = plainToClass(LocationsDto, createLocationDto); // Convert plain object to class instance
    const errors = await validate(buildingDto); // Validate the LocationsDto object

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

    return this.locationsService.createLocation(createLocationDto);
  }

  @Put('/:id')
  async updateLocation(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationsDto,
  ): Promise<number[]> {
    if (!id) {
      throw new NotFoundException(`Location ${id} does not exist`);
    }

    const buildingDto = plainToClass(UpdateLocationsDto, updateLocationDto); // Convert plain object to class instance
    const errors = await validate(buildingDto); // Validate the UpdateLocationsDto object

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

    return this.locationsService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number): Promise<boolean> {
    if (!id) {
      throw new NotFoundException(`Location ${id} does not exist`);
    }
    return this.locationsService.deleteLocation(id);
  }
}
