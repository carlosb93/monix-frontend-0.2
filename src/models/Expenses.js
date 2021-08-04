import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Expenses extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'expenses'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      account: { type: types.TEXT},
      description: { type: types.TEXT},
      price: { type: types.NUMERIC, not_null: true},
      category_id: { type: types.INTEGER, not_null: true },
      business_id: { type: types.INTEGER, not_null: true },
      date: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }

  static getJoinExpCat(id) {
    const sql = 'SELECT expenses.id,expenses.account,expenses.description,expenses.price,expenses.category_id,expenses.business_id,expenses.date,expenses.timestamp, categorys.name, categorys.icon, categorys.color,  categorys.id AS id_cat FROM expenses LEFT JOIN categorys ON expenses.category_id=categorys.id  WHERE expenses.business_id = ? ORDER BY expenses.id;'
    const params = [id]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }

  static getSingleExpCat(id) {
    const sql = 'SELECT expenses.id,expenses.account,expenses.description,expenses.price,expenses.category_id,expenses.business_id,expenses.date,expenses.timestamp, categorys.name, categorys.icon, categorys.color,  categorys.id AS id_cat FROM expenses LEFT JOIN categorys ON expenses.category_id=categorys.id WHERE expenses.id = ? ORDER BY expenses.id;'
    const params = id
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
}