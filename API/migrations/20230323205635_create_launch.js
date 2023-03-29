/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('launches', table => {
        table.increments('id');
        table.integer('site_id');
        table.foreign('site_id').references('launch_site.id');
        table.integer('lv_id');
        table.foreign('lv_id').references('launch_vehicle.id');
        table.string('lsp').notNullable();
        table.string('orbit');
        table.datetime('date_time').notNullable();
        table.enu('status',['success','delayed','canceled','failure','on time']);
        table.timestamps(true, true);
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('launches', table => {
        table.dropForeign('site_id');
        table.dropForeign('lv_id');
    })
        .then(() => {
            return knex.schema.dropTableIfExists('launches');
        })
};
