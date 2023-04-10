import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { LocationsModule } from './modules/locations/locations.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: process.env.DATABASE_CLIENT || 'postgresql',
        version: process.env.DATABASE_VERSION || '13.4',
        useNullAsDefault: true,
        connection: {
          host: process.env.DATABASE_CONNECTION_HOST || '127.0.0.1',
          port: +process.env.DATABASE_CONNECTION_PORT || 5432,
          user: process.env.DATABASE_CONNECTION_USERNAME || 'postgres',
          password: process.env.DATABASE_CONNECTION_PASSWORD || 'postgres',
          database: process.env.DATABASE_CONNECTION_DATABASE || 'location-db',
        },
      },
    }),
    BuildingsModule,
    LocationsModule,
  ],
})
export class AppModule {}
