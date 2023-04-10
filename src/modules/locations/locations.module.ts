import { Module } from '@nestjs/common';
import { LocationsService } from './services/locations.service';
import { LocationsController } from './controllers/locations.controller';
import { LocationsDao } from './dao/locations.dao';

@Module({
  providers: [LocationsService, LocationsDao],
  controllers: [LocationsController],
})
export class LocationsModule {}
