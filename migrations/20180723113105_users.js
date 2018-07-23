module.exports = {
  up: knex => (
    knex.schema.createTable('users', table => {
      table.increments()
      table.string('email').unique()
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('users')
  )
}