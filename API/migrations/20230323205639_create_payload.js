/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payloads',table=>{
    table.increments('id');
    table.integer('launch_id')
    table.foreign('launch_id').references('launches.id');
    table.string('customer',50);
    table.string('mission',250);
    table.string('description',500);
    table.enu('classification', ['Unclassified', 'Secret','Top Secret'])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('payloads',table=>{
    table.dropForeign('launch_id')
  })
  .then(()=>{
    return knex.schema.dropTableIfExists('payloads');
  })
};
