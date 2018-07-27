module.exports = {
  up: knex => (
    knex.schema.createTable('prompts', table => {
      table.increments()
      table.integer('userId').unsigned()
      table.string('title')
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('prompts')
  )
}