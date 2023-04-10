import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import * as knexnest from 'knexnest';
import { plainToClass } from 'class-transformer';
import { LocationsQueryParams } from '../dto/filter/locations.filter.dto';
import {
  LocationsDto,
  UpdateLocationsDto,
} from '../dto/response/locations.dto';

@Injectable()
export class LocationsDao {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getAllLocations(
    params?: LocationsQueryParams,
  ): Promise<LocationsDto[]> {
    const colMap = {
      id: 'l.id',
      locationName: 'l.location_name',
      locationNumber: 'l.location_number',
      locationArea: 'l.location_area',
      buildingId: 'l.building_id',
    };

    const sql = this.knex
      .select(
        'l.id AS _id',
        'l.location_name AS _locationName',
        'l.location_number AS _locationNumber',
        'l.location_area AS _locationArea',
        'b.building_name AS _buildingName',
      )
      .from('locations AS l')
      .leftJoin('buildings as b', 'b.id', 'l.building_id');

    if (params?.filter) {
      if (+params?.filter.id) {
        sql.andWhere('l.id', +params?.filter.id);
      }

      if (
        params?.filter?.locationName &&
        params?.filter?.locationName?.trim() !== ''
      ) {
        sql.andWhere(function () {
          this.where(
            'l.location_name',
            'ILIKE',
            `%${params?.filter?.locationName.toString().trim()}%`,
          );
        });
      }

      if (
        params?.filter?.locationNumber &&
        params?.filter?.locationNumber?.trim() !== ''
      ) {
        sql.andWhere(function () {
          this.where(
            'l.location_number',
            'ILIKE',
            `%${params?.filter?.locationNumber.toString().trim()}%`,
          );
        });
      }

      if (+params?.filter.locationArea) {
        sql.andWhere('l.location_area', +params?.filter.locationArea);
      }

      if (+params?.filter.buildingId) {
        sql.andWhere('l.building_id', +params?.filter.buildingId);
      }
    }

    if (colMap[params?.sort?.field]) {
      sql.orderBy(colMap[params?.sort?.field], params?.sort?.type);
    } else {
      sql.orderBy(`l.id`, `asc`);
    }

    return knexnest(sql).then((data) =>
      plainToClass(LocationsDto, data ?? [], { groups: ['all'] }),
    );
  }

  async createLocation(createLocationDto: LocationsDto): Promise<number[]> {
    const insertData = {
      location_name: createLocationDto.locationName,
      location_number: createLocationDto.locationNumber,
      location_area: createLocationDto.locationArea,
      building_id: createLocationDto.buildingId,
    };

    return this.knex('locations').insert(insertData).returning('id');
  }

  async updateLocation(
    id: number,
    updateLocationDto: UpdateLocationsDto,
  ): Promise<number[]> {
    try {
      const updateData = {
        location_name: updateLocationDto.locationName,
        location_number: updateLocationDto.locationNumber,
        location_area: updateLocationDto.locationArea,
        building_id: updateLocationDto.buildingId,
      };

      return this.knex
        .update(updateData)
        .into('locations')
        .where({ id: id })
        .returning('id')
        .then((res) => res ?? []);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteLocation(id: number): Promise<boolean> {
    return this.knex('locations')
      .where('id', id)
      .del()
      .returning('id')
      .then((id) => id && id.length > 0);
  }
}
