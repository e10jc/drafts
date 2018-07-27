module.exports = {
  up: knex => (
    knex.schema.createTable('prompts', table => {
      table.increments()
      table.integer('userId').unsigned()
      table.string('title')
      table.string('slug').unique()
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('prompts')
  )
}