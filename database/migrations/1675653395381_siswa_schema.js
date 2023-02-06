'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SiswaSchema extends Schema {
  up () {
    this.create('siswas', (table) => {
      table.increments()
      table.string('nama', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('kelas', 80).notNullable()
      table.integer('umur')
      table.timestamps()
    })
  }

  down () {
    this.drop('siswas')
  }
}

module.exports = SiswaSchema
