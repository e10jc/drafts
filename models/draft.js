const Model = require('../objection')

module.exports = class Draft extends Model {
  static get relationMappings () {
    const Prompt = require('./prompt')
    const User = require('./user')

    return {
      prompt: {
        relation: Model.BelongsToOneRelation,
        modelClass: Prompt,
        join: {
          from: 'drafts.promptId',
          to: 'prompts.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'drafts.userId',
          to: 'users.id'
        }
      }
    }
  }

  static get tableName () {
    return 'drafts'
  }
}
