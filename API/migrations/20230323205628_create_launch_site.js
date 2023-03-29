/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('launch_site', table => {
    table.increments('id');
    table.string('name');
    table.float('lat');
    table.float('lon');
    table.string('country');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('launch_site');
};
