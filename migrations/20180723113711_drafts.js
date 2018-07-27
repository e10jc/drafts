module.exports = {
  up: knex => (
    knex.schema.createTable('drafts', table => {
      table.increments()
      table.integer('userId').unsigned()
      table.integer('promptId').unsigned()
      table.string('slug').unique()
      table.text('body')
    })
  ),

  down: knex => (
    knex.schema.dropTableIfExists('drafts')
  )
}