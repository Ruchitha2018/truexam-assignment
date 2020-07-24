'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScoreSchema extends Schema {
  up () {
    this.create('scores', (table) => {
      table.increments()
      table.integer('task_id')
      table.integer('user_id')
      table.integer('score')
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('scores')
  }
}

module.exports = ScoreSchema
