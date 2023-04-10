require('dotenv').config();

const development = {
  client: process.env.DATABASE_CLIENT || 'postgresql',
  connection: {
    host: process.env.DATABASE_CONNECTION_HOST || '127.0.0.1',
    port: +process.env.DATABASE_CONNECTION_PORT || 5432,
    user: process.env.DATABASE_CONNECTION_USERNAME || 'postgres',
    password: process.env.DATABASE_CONNECTION_PASSWORD || 'postgres',
    database: process.env.DATABASE_CONNECTION_DATABASE || 'location-db',
  },
  pool: {
    min: +process.env.DATABASE_POOL_MIN || 2,
    max: +process.env.DATABASE_POOL_MAX || 10,
  },
  migrations: {
    enabled: +process.env.DATABASE_MIGRATION_ENABLED === 1,
    tableName: process.env.DATABASE_MIGRATION_TABLE_NAME || 'knex_migrations',
    directory: process.env.DATABASE_MIGRATION_DIRECTORY || './migrations',
  },
};

module.exports = {
  development,
};
