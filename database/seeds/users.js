exports.seed = function(knex) {
    return knex('users').del()
      .then(function () {
        return knex('users').insert([
          {id: 1, username: 'john_doe', password: 'password123', email: 'john_doe@example.com'},
          {id: 2, username: 'jane_doe', password: 'password123', email: 'jane_doe@example.com'},
        ]);
      });
  };