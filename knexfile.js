module.exports = {
    development: {
      client: 'pg',
      connection: {
        user: 'mohamedsamy',
        password: '123456789',
        database: 'objection',
      },
      migrations: {
        directory: './src/database/migrations',
      },
      seeds: {
        directory: './src/database/seeds',
      },
    },
  };