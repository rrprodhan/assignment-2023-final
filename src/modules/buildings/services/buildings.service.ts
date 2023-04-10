import { Injectable } from '@nestjs/common';
import {
  BuildingsQueryFilter,
  BuildingsQueryParams,
} from '../dto/filter/buildings.filter.dto';
import { BuildingsDao } from '../dao/buildings.dao';
import { BuildingsDto } from '../dto/response/buildings.dto';
import { format } from 'date-fns';
import { logger } from '../../../common/logger'; // assuming you have a logger instance already

@Injectable()
export class BuildingsService {
  constructor(private readonly buildingsDao: BuildingsDao) {}

  async getAllBuildings(query: BuildingsQueryParams): Promise<BuildingsDto[]> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to fetch all buildings with query: ${JSON.stringify(
        query,
      )}`;
      logger.info(logMessage);

      const buildings = await this.buildingsDao.getAllBuildings(query);

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Retrieved ${buildings.length} buildings from DAO`;
      logger.info(logMessage2);

      return buildings;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to fetch all buildings: ${error.message}`;
      logger.error(logMessage);
      throw new Error('Failed to fetch all buildings');
    }
  }

  async createBuilding(createBuildingDto: BuildingsDto): Promise<number[]> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to create a new building with data: ${JSON.stringify(
        createBuildingDto,
      )}`;
      logger.info(logMessage);

      const buildingIds: number[] = await this.buildingsDao.createBuilding(
        createBuildingDto,
      );

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Created a new building with ID ${buildingIds[0]} using DAO`;
      logger.info(logMessage2);

      return buildingIds;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to create a new building: ${error.message}`;
      logger.error(logMessage);
      throw new Error('Failed to create a new building');
    }
  }

  async updateBuilding(
    id: number,
    updateBuildingDto: BuildingsDto,
  ): Promise<number[]> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to update building with ID ${id} with data: ${JSON.stringify(
        updateBuildingDto,
      )}`;
      logger.info(logMessage);

      const buildingsQueryFilter = new BuildingsQueryFilter();
      buildingsQueryFilter.id = id;

      const buildingsQueryParams = new BuildingsQueryParams();
      buildingsQueryParams.filter = buildingsQueryFilter;
      const existingBuildingData = await this.getAllBuildings(
        buildingsQueryParams,
      );

      let buildingId: number[];
      if (existingBuildingData && existingBuildingData.length > 0) {
        buildingId = await this.buildingsDao.updateBuilding(
          id,
          updateBuildingDto,
        );
      } else {
        throw new Error(`Building with ID ${id} does not exist`);
      }

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Updated building with ID ${id} using DAO`;
      logger.info(logMessage2);

      return buildingId;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to update building with ID ${id}: ${error.message}`;
      logger.error(logMessage);
      throw new Error(`Failed to update building with ID ${id}`);
    }
  }

  async deleteBuilding(id: number): Promise<boolean> {
    try {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Received request to delete building with ID: ${id}`;
      logger.info(logMessage);

      const buildingsQueryFilter = new BuildingsQueryFilter();
      buildingsQueryFilter.id = id;

      const buildingsQueryParams = new BuildingsQueryParams();
      buildingsQueryParams.filter = buildingsQueryFilter;
      const existingBuildingData = await this.getAllBuildings(
        buildingsQueryParams,
      );

      let result: boolean;
      if (existingBuildingData && existingBuildingData.length > 0) {
        result = await this.buildingsDao.deleteBuilding(id);
      } else {
        throw new Error(`Building with ID ${id} does not exist`);
      }

      const logMessage2 = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Deleted building with ID: ${id} using DAO`;
      logger.info(logMessage2);

      return result;
    } catch (error) {
      const logMessage = `${format(
        new Date(),
        'MM/dd/yyyy, h:mm:ss a',
      )} - Failed to delete building with ID ${id}: ${error.message}`;
      logger.error(logMessage);
      throw new Error(`Failed to delete building with ID ${id}`);
    }
  }
}
