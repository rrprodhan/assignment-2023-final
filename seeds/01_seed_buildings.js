exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('buildings').del();
  await knex('buildings').insert([
    { building_name: 'A' },
    { building_name: 'B' },
  ]);
};
