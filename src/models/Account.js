import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import {toTimestamp, toDatetime } from '../shared/tools';

export default class Account extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'accounts'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      name: { type: types.TEXT, not_null: true },
      currency: { type: types.TEXT, not_null: true },
      monto: { type: types.NUMERIC, not_null: true },
      user_id: { type: types.INTEGER },
      color: { type: types.TEXT },
      reset_date: { type: types.INTEGER, default: () => toTimestamp(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)) },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}