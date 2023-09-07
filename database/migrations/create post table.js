exports.up = function(knex) {
    return knex.schema
      .createTable('posts', function(table) {
        table.increments('id');
        table.string('title');
        table.text('body');
        table.integer('user_id').unsigned().index();
        table.foreign('user_id').references('id').inTable('users');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('posts');
  };