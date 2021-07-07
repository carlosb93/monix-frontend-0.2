import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Business extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'businesses'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      name: { type: types.TEXT, not_null: true },
      categoria_id: { type: types.INTEGER },
      user_id: { type: types.INTEGER },
      icon: { type: types.TEXT },
      color: { type: types.TEXT },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}