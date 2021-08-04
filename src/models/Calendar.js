import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Calendar extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db')
  }

  static get tableName() {
    return 'calendar'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      date: { type: types.INTEGER },
      todoList: { type: types.JSON, not_null: true },
    //   todoList: [
    //     {
    //       id: 1,
    //       title: titulo,
    //       notes: notas,
    //       alarm: {
    //         time: 20/05/2021,
    //         isOn: true,
    //         createEventAsyncRes: true
    //       },
    //       color: '#2E66E7'
    //     }
    //   ],
      markedDot: { type: types.JSON, not_null: true }, 
    //markedDot[
    //    {date: 20/05/2021,
    //    dots: [{
    //         id: 1,
    //         color: '#2E66E7',
    //         selectedDotColor: '#2E66E7'
    //       }]
    // }]  
      business_id: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}