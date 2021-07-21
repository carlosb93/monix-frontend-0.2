import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Sales extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'sales'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      description: { type: types.TEXT},
      amount: { type: types.INTEGER, not_null: true },
      price: { type: types.NUMERIC },
      inventory_id: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}