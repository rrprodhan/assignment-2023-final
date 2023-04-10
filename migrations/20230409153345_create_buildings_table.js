exports.up = function (knex) {
  return knex.schema.createTable('buildings', function (table) {
    table.increments('id').primary();
    table.string('building_name');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('buildings');
};
