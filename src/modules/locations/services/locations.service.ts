import { Injectable } from '@nestjs/common';
import { LocationsQueryParams } from '../dto/filter/locations.filter.dto';
import { LocationsDao } from '../dao/locations.dao';
import {
  LocationsDto,
  UpdateLocationsDto,
} from '../dto/response/locations.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly locationDao: LocationsDao) {}

  async getAllLocations(query: LocationsQueryParams): Promise<LocationsDto[]> {
    return this.locationDao.getAllLocations(query);
  }

  async createLocation(createLocationDto: LocationsDto): Promise<number[]> {
    return this.locationDao.createLocation(createLocationDto);
  }

  async updateLocation(
    id: number,
    updateLocationDto: UpdateLocationsDto,
  ): Promise<number[]> {
    return this.locationDao.updateLocation(id, updateLocationDto);
  }

  async deleteLocation(id: number): Promise<boolean> {
    return this.locationDao.deleteLocation(id);
  }
}
