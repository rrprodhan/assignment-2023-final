import { Injectable } from '@nestjs/common';
import { BuildingsQueryParams } from '../dto/filter/buildings.filter.dto';
import { BuildingsDao } from '../dao/buildings.dao';
import { BuildingsDto } from '../dto/response/buildings.dto';

@Injectable()
export class BuildingsService {
  constructor(private readonly buildingsDao: BuildingsDao) {}

  async getAllBuildings(query: BuildingsQueryParams): Promise<BuildingsDto[]> {
    return this.buildingsDao.getAllBuildings(query);
  }

  async createBuilding(createBuildingDto: BuildingsDto): Promise<number[]> {
    return this.buildingsDao.createBuilding(createBuildingDto);
  }

  async updateBuilding(
    id: number,
    updateBuildingDto: BuildingsDto,
  ): Promise<number[]> {
    return this.buildingsDao.updateBuilding(id, updateBuildingDto);
  }

  async deleteBuilding(id: number): Promise<boolean> {
    return this.buildingsDao.deleteBuilding(id);
  }
}
