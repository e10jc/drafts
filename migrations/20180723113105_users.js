module.exports = {
  up: knex => (
    knex.schema.createTable('users', table => {
      table.increments()
      table.string('handle').unique()
      table.string('email').unique()
      table.string('password')
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('users')
  )
}