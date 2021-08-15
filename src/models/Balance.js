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
      business_id: { type: types.INTEGER },
      expense_id: { type: types.INTEGER },
      income_id: { type: types.INTEGER },
      sale_id: { type: types.INTEGER },
      isPositive: { type: types.BOOLEAN, not_null: true },
      monto: { type: types.NUMERIC, not_null: true },
      date: { type: types.INTEGER, default: () => Date.now() },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }


  
  static getBalanceByMonth(id,date1,date2) {
    const sql = "SELECT * FROM balance WHERE business_id = ? AND categoria_id <> 1 AND timestamp BETWEEN ? AND ?  ORDER BY timestamp ASC;"
    const params = [id,date1*1000,date2*1000]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
  
  static getBalanceByMonthAndAccount(id,date1,date2) {
    const sql = "SELECT * FROM balance WHERE account_id = ? AND categoria_id <> 1 AND timestamp BETWEEN ? AND ?  ORDER BY timestamp ASC;"
    const params = [id,date1*1000,date2*1000]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }

  static getBalanceByMonthAndAccountJoin(id,date1,date2) {
    const sql = 'SELECT balance.id, balance.user_id, balance.account_id, balance.categoria_id, balance.business_id, balance.expense_id, balance.income_id, balance.sale_id, balance.isPositive, balance.monto, balance.date, balance.timestamp, categorys.name, categorys.icon, categorys.color,  categorys.id AS id_cat FROM balance LEFT JOIN categorys ON balance.categoria_id=categorys.id  WHERE balance.account_id = ? AND balance.categoria_id <> 1 AND balance.timestamp BETWEEN ? AND ?  ORDER BY balance.timestamp ASC;'
    const params = [id,date1*1000,date2*1000]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }


}
//1627790400000
//1630382400000
//1628549526768