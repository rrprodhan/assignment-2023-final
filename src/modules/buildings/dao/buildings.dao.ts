import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import * as knexnest from 'knexnest';
import { plainToClass } from 'class-transformer';
import { BuildingsQueryParams } from '../dto/filter/buildings.filter.dto';
import { BuildingsDto } from '../dto/response/buildings.dto';

@Injectable()
export class BuildingsDao {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getAllBuildings(
    params?: BuildingsQueryParams,
  ): Promise<BuildingsDto[]> {
    const colMap = {
      id: 'b.id',
      buildingName: 'b.building_name',
    };

    const sql = this.knex
      .withSchema('public')
      .select('b.id AS _id', 'b.building_name AS _buildingName')
      .from('buildings AS b');

    if (params?.filter) {
      if (+params?.filter.id) {
        sql.andWhere('b.id', +params?.filter.id);
      }

      if (
        params?.filter?.buildingName &&
        params?.filter?.buildingName?.trim() !== ''
      ) {
        sql.andWhere(function () {
          this.where(
            'b.building_name',
            'ILIKE',
            `%${params?.filter?.buildingName.toString().trim()}%`,
          );
        });
      }
    }

    if (colMap[params?.sort?.field]) {
      sql.orderBy(colMap[params?.sort?.field], params?.sort?.type);
    } else {
      sql.orderBy(`b.id`, `asc`);
    }

    return knexnest(sql).then((data) =>
      plainToClass(BuildingsDto, data ?? [], { groups: ['all'] }),
    );
  }

  async createBuilding(createBuildingDto: BuildingsDto): Promise<number[]> {
    const insertData = {
      building_name: createBuildingDto.buildingName,
    };
    return this.knex('buildings').insert(insertData).returning('id');
  }

  async updateBuilding(
    id: number,
    updateBuildingDto: BuildingsDto,
  ): Promise<number[]> {
    try {
      const updateData = {
        building_name: updateBuildingDto.buildingName,
      };

      return this.knex
        .update(updateData)
        .into('buildings')
        .where({ id: id })
        .returning('id')
        .then((res) => res ?? []);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBuilding(id: number): Promise<boolean> {
    return this.knex('buildings')
      .where('id', id)
      .del()
      .returning('id')
      .then((id) => id && id.length > 0);
  }
}
