/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.increments('id');
    table.varchar('name', 25).notNullable();
    table.string('password').notNullable();
    table.varchar('email', 50);
    table.boolean('isAdmin').notNullable();
    table.enu('classification', ['Unclassified', 'Secret','Top Secret']).notNullable();
    table.string('unit');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
