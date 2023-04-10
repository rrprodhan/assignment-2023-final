import { Module } from '@nestjs/common';
import { BuildingsService } from './services/buildings.service';
import { BuildingsController } from './controllers/buildings.controller';
import { BuildingsDao } from './dao/buildings.dao';

@Module({
  providers: [BuildingsService, BuildingsDao],
  controllers: [BuildingsController],
})
export class BuildingsModule {}
