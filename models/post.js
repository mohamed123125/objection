const { Model } = require('objection');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'body'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        body: { type: 'string' },
        user_id: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      }
    }
  }

  static get relationMappings() {
    const User = require('./user');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Post;