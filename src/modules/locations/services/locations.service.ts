import { Injectable } from '@nestjs/common';
import {
  LocationsQueryFilter,
  LocationsQueryParams,
} from '../dto/filter/locations.filter.dto';
import { LocationsDao } from '../dao/locations.dao';
import {
  LocationsDto,
  UpdateLocationsDto,
} from '../dto/response/locations.dto';
import { format } from 'date-fns';
import { logger } from '../../../common/logger';

@Injectable()
export class LocationsService {
  constructor(private readonly locationDao: LocationsDao) {}

  async getAllLocations(query: LocationsQueryParams): Promise<LocationsDto[]> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to fetch all locations with query: ${JSON.stringify(
        query,
      )}`;
      logger.info(logMessage);

      const locations = await this.locationDao.getAllLocations(query);

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Retrieved ${locations.length} locations from DAO`;
      logger.info(logMessage2);

      return locations;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to fetch all locations: ${error.message}`;
      logger.error(logMessage);
      throw new Error('Failed to fetch all locations');
    }
  }

  async createLocation(createLocationDto: LocationsDto): Promise<number[]> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to create a new location with data: ${JSON.stringify(
        createLocationDto,
      )}`;
      logger.info(logMessage);

      const locationIds: number[] = await this.locationDao.createLocation(
        createLocationDto,
      );

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Created a new location with ID ${locationIds[0]} using DAO`;
      logger.info(logMessage2);

      return locationIds;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to create a new location: ${error.message}`;
      logger.error(logMessage);
      throw new Error('Failed to create a new location');
    }
  }

  async updateLocation(
    id: number,
    updateLocationDto: UpdateLocationsDto,
  ): Promise<number[]> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to update location with ID ${id} with data: ${JSON.stringify(
        updateLocationDto,
      )}`;
      logger.info(logMessage);

      const locationsQueryFilter = new LocationsQueryFilter();
      locationsQueryFilter.id = id;

      const locationQueryParams = new LocationsQueryParams();
      locationQueryParams.filter = locationsQueryFilter;
      const existingLocationData = await this.getAllLocations(
        locationQueryParams,
      );

      let locationIds: number[];
      if (existingLocationData && existingLocationData.length > 0) {
        locationIds = await this.locationDao.updateLocation(
          id,
          updateLocationDto,
        );
      } else {
        throw new Error(`Location with ID ${locationIds[0]} does not exist`);
      }

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Updated location with ID ${id} using DAO`;
      logger.info(logMessage2);

      return locationIds;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to update location with ID ${id}: ${error.message}`;
      logger.error(logMessage);
      throw new Error(`Failed to update location with ID ${id}`);
    }
  }

  async deleteLocation(id: number): Promise<boolean> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to delete location with ID ${id}`;
      logger.info(logMessage);

      const locationsQueryFilter = new LocationsQueryFilter();
      locationsQueryFilter.id = id;

      const locationQueryParams = new LocationsQueryParams();
      locationQueryParams.filter = locationsQueryFilter;
      const existingLocationData = await this.getAllLocations(
        locationQueryParams,
      );

      let result: boolean;
      if (existingLocationData && existingLocationData.length > 0) {
        result = await this.locationDao.deleteLocation(id);
      } else {
        throw new Error(`Location with ID ${id} does not exist`);
      }

      if (result) {
        const logMessage = `${format(
          new Date(),
          'MM/dd/yyyy, h:mm:ss a',
        )} - Deleted location with ID ${id} using DAO`;
        logger.info(logMessage);

        return result;
      } else {
        const logMessage = `${format(
          new Date(),
          'MM/dd/yyyy, h:mm:ss a',
        )} - Location with ID ${id} not found`;
        logger.warn(logMessage);

        return false;
      }
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to delete location with ID ${id}: ${error.message}`;
      logger.error(logMessage);
      throw new Error(`Failed to delete location with ID ${id}`);
    }
  }
}
