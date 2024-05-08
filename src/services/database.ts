import sqlite3 from "sqlite3";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
export class Database {
  db!: sqlite3.Database;
  constructor() {
    // this.db = new sqlite3.Database(
    //   process.env.SQLLITE_DB || "myspace.db",
    //   (err) => {
    //     if (err) {
    //       console.error("Error opening database.");
    //     } else {
    //       console.error("Database opened successfully.");
    //       this.createTables();
    //     }
    //   }
    // );

    AppDataSource.initialize().then(async () => {

      // console.log("Inserting a new user into the database...")
      // const user = new User()
      // user.firstname = "Timber"
      // user.lastname = "Saw"
      // user.login = "diamanka"
      // user.password = "diamanka"
      // await AppDataSource.manager.save(user)
      // console.log("Saved a new user with id: " + user.id)
  
      // console.log("Loading users from the database...")
      // const users = await AppDataSource.manager.find(User)
      // console.log("Loaded users: ", users)
  
      console.log("TypeORM works and init well in th db")
  
  }).catch(error => console.log(error))

  }

  private createTables() {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS 
        users (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            firstname TEXT, 
            lastname TEXT, 
            login TEXT,
            password TEXT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
      (err: any) => {
        if (err) {
          console.error("Error creating table.", err);
        } else {
          console.error("Table created successfully.");
        }
      }
    );
  }

  public query(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
