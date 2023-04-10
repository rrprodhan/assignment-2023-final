exports.up = function (knex) {
  return knex.schema.createTable('locations', function (table) {
    table.increments('id').primary();
    table.string('location_name');
    table.string('location_number');
    table.decimal('location_area', 10, 2);
    table
      .integer('building_id')
      .unsigned()
      .references('id')
      .inTable('buildings');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('locations');
};
