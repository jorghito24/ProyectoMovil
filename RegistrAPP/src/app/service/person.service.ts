import { Injectable } from '@angular/core';
import { SqliteServerService } from './sqlite-server.service';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private db: SqliteServerService
  ) { }

  create(){
   const query = 'CREATE TABLE IF NOT EXISTS PERSON(fullname TEXT, fecnac NUMERIC';
   return this.db.execute(query,[]);
  }

  drop(){
    const query = 'DROP TABLE IF EXISTS PERSON';
    return this.db.execute(query,[]);
  }

  get(){
    const query = 'SELECT * FROM PERSON';
    return this.db.getData(query,[]);
  }

  multipleInsert(params: Person[]){
    const query = 'INSERT INTO PERSON(fullname, fecnac) VALUES(?, date(now, "localtime"))'
    const data = params.map((p:Person) => {
      const values = [];
      values.push(query)
      values.push([
        p.fullname
      ]);
      return values;
    });
    return this.db.executeBatch(data)
  }

  sync(params: Person[]){
    return new Promise((resolve, reject) => {
      this.drop().then(() => {
        this.create().then(() => {
          this.multipleInsert(params).then((data) => {
            resolve(data)
          }).catch(e => reject(e))
        }).catch(e => reject(e))
      }).catch(e => reject(e))
    });


  }
}
