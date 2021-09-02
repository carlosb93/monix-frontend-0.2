import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'


export default class FlowSteps extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'flowsteps'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      name: { type: types.TEXT, not_null: true},
      summary: { type: types.TEXT},
      icon: { type: types.TEXT, not_null: true },
      color: {  type: types.TEXT, not_null: true },
      business_id: { type: types.INTEGER, not_null: true },
      flow_id: { type: types.INTEGER, not_null: true },
      step: { type: types.INTEGER, not_null: true },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }

  static getByBusiness(id) {
    const sql = 'SELECT * FROM flowsteps WHERE business_id = ?;'
    const params = [id]
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
}