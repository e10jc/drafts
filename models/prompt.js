const Model = require('../objection')

module.exports = class Prompt extends Model {
  static get relationMappings () {
    const Draft = require('./draft')

    return {
      drafts: {
        relation: Model.HasManyRelation,
        modelClass: Draft,
        join: {
          from: 'prompts.id',
          to: 'drafts.promptId'
        }
      }
    }
  }

  static get tableName () {
    return 'prompts'
  }
}
