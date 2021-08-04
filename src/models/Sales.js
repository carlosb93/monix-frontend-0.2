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
      account: { type: types.TEXT},
      description: { type: types.TEXT},
      amount: { type: types.INTEGER, not_null: true },
      price: { type: types.NUMERIC, not_null: true},
      inventory_id: { type: types.INTEGER, not_null: true },
      business_id: { type: types.INTEGER, not_null: true },
      date: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }


  static getJoinSaleInv(id) {
    const sql = 'SELECT sales.id,sales.account,sales.description,sales.amount,sales.price,sales.inventory_id,sales.business_id,sales.date,sales.timestamp, inventary.name, inventary.id AS id_inv FROM sales LEFT JOIN inventary ON sales.inventory_id=inventary.id  WHERE sales.business_id = ? ORDER BY sales.id;'
    const params = [id]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }

  static getSingleSaleInv(id) {
    const sql = 'SELECT sales.id,sales.account,sales.description,sales.amount,sales.price,sales.inventory_id,sales.business_id,sales.date,sales.timestamp, inventary.name, inventary.id AS id_inv FROM sales LEFT JOIN inventary ON sales.inventory_id=inventary.id WHERE sales.id = ? ORDER BY sales.id;'
    const params = id
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
}