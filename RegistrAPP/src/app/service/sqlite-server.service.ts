import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic-native/platform';

@Injectable({
  providedIn: 'root'
})
export class SqliteServerService {

  private isOpen = false;
  private db: SQLiteObject;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
  ) { }

  executeBatch(params: any[]){
    return new Promise((resolve, reject) =>{
      this.open().then(() => {
        this.db.sqlBatch(params).then((response) =>{
          resolve(response);
        }).catch(err => {reject(err)});
      }).catch(err => {reject(err)});
    })
  }

  execute(query: string, params: any){
    return new Promise((resolve, reject) =>{
      this.open().then(() => {
        this.db.executeSql(query, params).then((response) =>{
          resolve(response);
        }).catch(err => {reject(err)});
      }).catch(err => {reject(err)});
    })
  }

  getData(query: string, params: any){
    return new Promise((resolve, reject) =>{
      this.open().then(() => {
        this.db.executeSql(query, params).then((response) =>{
          const items = [];
          for (let i = 0; i < response.row.length; i++) {
            const element = response.row.item(i);
            items.push(element);
          }
          resolve(items);
        }).catch(err => {reject(err)});
      }).catch(err => {reject(err)});
    })
  }

  private open(){
    return new Promise((resolve, reject) => {
      if (this.isOpen){
        resolve(this.isOpen);
      } else {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.db = db;
          this.isOpen =true;
        })
          .catch(e => reject(e));
      }
    });

  }
  
}
