import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import {toTimestamp, toDatetime } from '../shared/tools';

export default class Balance extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'balance'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      user_id: { type: types.INTEGER },
      account_id: { type: types.INTEGER },
      categoria_id: { type: types.INTEGER },
      isPositive: { type: types.BOOLEAN, not_null: true },
      monto: { type: types.NUMERIC, not_null: true },
      date: { type: types.INTEGER, default: () => Date.now() },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}