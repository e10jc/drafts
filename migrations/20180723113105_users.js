const User = require('../models/user')

module.exports = {
  up: async knex => {
    await knex.schema.createTable('users', table => {
      table.increments()
      table.string('handle').unique()
      table.string('email').unique()
      table.string('password')
      table.boolean('isAdmin')
    })

    await User.query().insert({
      email: process.env.ADMIN_USER_EMAIL,
      handle: process.env.ADMIN_USER_HANDLE,
      isAdmin: true,
      password: await User.createPasswordHash(process.env.ADMIN_USER_PASSWORD),
    })
  },

  down: knex => (
    knex.schema.dropTableIfExists('users')
  )
}