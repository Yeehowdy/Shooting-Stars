/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_site').del()
  await knex('launch_site').insert([
    {name: 'Cape Canaveral', lat: 28.4887, lon: -80.5728, country: "USA"},
    {name: 'Vandenberg', lat: 34.7420, lon: -120.5724, country: "USA"},
    {name: 'Wenchang Space Launch Site', lat: 19.6144, lon: 110.9511, country: "China"},
    {name: 'Baikonur Cosmodrome', lat: 45.9650, lon: 63.3050, country: "Russia"},
    {name: 'Satish Dhawan Space Centre', lat: 13.7200, lon: 80.2300, country: "India"},
    {name: 'Guiana Space Centre', lat: 5.1673, lon: -52.6832, country: "French Guiana"},
    {name: "Santa's Worksop", lat: 90, lon: 135, country: "North Pole"},
  ]);
};
