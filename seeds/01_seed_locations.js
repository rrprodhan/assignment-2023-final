exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('locations').del();
  await knex('locations').insert([
    {
      location_name: 'Car Park',
      location_number: 'A-CarPark',
      location_area: 80.62,
      building_id: 1,
    },
    {
      location_name: 'Level 1',
      location_number: 'A-01',
      location_area: 100.92,
      building_id: 1,
    },
    {
      location_name: 'Lobby Level1',
      location_number: 'A-01-Lobby',
      location_area: 80.62,
      building_id: 1,
    },
    {
      location_name: 'Master Room',
      location_number: 'A-01-01',
      location_area: 50.11,
      building_id: 1,
    },
    {
      location_name: 'Meeting Room 1',
      location_number: 'A-01-01-M1',
      location_area: 20.11,
      building_id: 1,
    },
    {
      location_name: 'Level 5',
      location_number: 'B-05',
      location_area: 150.0,
      building_id: 2,
    },
    {
      location_name: 'Utility Room',
      location_number: 'B-05-11',
      location_area: 10.2,
      building_id: 2,
    },
    {
      location_name: 'Corridor Level 5',
      location_number: 'B-05-Corridor',
      location_area: 30.0,
      building_id: 2,
    },
  ]);
};
