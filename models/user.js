const Model = require('../objection')

module.exports = class User extends Model {
  static get relationMappings () {
    const Draft = require('./draft')

    return {
      drafts: {
        relation: Model.HasManyRelation,
        modelClass: Draft,
        join: {
          from: 'users.id',
          to: 'drafts.userId'
        }
      }
    }
  }

  static get tableName () {
    return 'users'
  }
}
