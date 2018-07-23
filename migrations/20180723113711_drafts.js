module.exports = {
  up: knex => (
    knex.schema.createTable('drafts', table => {
      table.increments()
      table.integer('userId').unsigned()
      table.integer('promptId').unsigned()
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('drafts')
  )
}