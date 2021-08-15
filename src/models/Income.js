import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Income extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'income'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      account_id: { type: types.INTEGER},
      description: { type: types.TEXT},
      price: { type: types.NUMERIC, not_null: true},
      category_id: { type: types.INTEGER, not_null: true },
      business_id: { type: types.INTEGER, not_null: true },
      date: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }

  static getJoinIncCat(id) {
    const sql = 'SELECT income.id,income.account_id,income.description,income.price,income.category_id,income.business_id,income.date,income.timestamp, categorys.name, categorys.icon, categorys.color,  categorys.id AS id_cat FROM income LEFT JOIN categorys ON income.category_id=categorys.id  WHERE income.business_id = ? ORDER BY income.id;'
    const params = [id]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }

  static getSingleIncCat(id) {
    const sql = 'SELECT income.id,income.account_id,income.description,income.price,income.category_id,income.business_id,income.date,income.timestamp, categorys.name, categorys.icon, categorys.color,  categorys.id AS id_cat FROM income LEFT JOIN categorys ON income.category_id=categorys.id WHERE income.id = ? ORDER BY income.id;'
    const params = id
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
}