import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Calendar extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'calendar'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      title: { type: types.TEXT, not_null: true },
      summary: { type: types.TEXT, not_null: true },
      todo: { type: types.JSON },
      date_start: { type: types.TEXT, not_null: true },//2017-09-06 22:30:00
      start: { type: types.INTEGER, not_null: true },//12442353465467
      end: { type: types.INTEGER, not_null: true }, //12423423536456
      color: { type: types.TEXT, not_null: true },
      type:{type: types.INTEGER, not_null: true},
      status:{type: types.INTEGER, not_null: true},
      isworkflow:{type: types.BOOLEAN, not_null: false },
      user_id: { type: types.INTEGER },
      business_id: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }


  static getByDate(date) {
    const sql = 'SELECT * FROM calendar WHERE date_start = ?;'
    const params = [date]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
}