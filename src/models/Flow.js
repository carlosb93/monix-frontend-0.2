import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'


export default class Flow extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'flows'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      name: { type: types.TEXT},
      icon: { type: types.TEXT},
      business_id: { type: types.INTEGER, not_null: true },
      user_id: { type: types.INTEGER, not_null: true },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}