import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { Database } from "./database";
export class UserService {
  private db: Database;
  constructor() {
    this.db = new Database();
  }

  async getAll(): Promise<User[]> {
    // const users: User[] = await this.db.query("SELECT * FROM users");
    const users: User[] = await AppDataSource.manager.find(User)
    return users;
  }

  async getById(id: number): Promise<User> {
    // const users: User[] = await this.db.query(
    //   "SELECT * FROM users WHERE id=?",
    //   [id]
    // );
    
    const user: any =  await AppDataSource.manager.findOneBy(User,{id:id,firstname:"",lastname:''})

    return user;
  }

  async create(newUser: User): Promise<User> {
    // const newUser = { ...x, id: Date.now().toString()}
    // const result = await this.db.query(
    //   "INSERT INTO users(firstname, lastname, login, password) VALUES(?,?,?,?)",
    //   [newUser.firstname, newUser.lastname, newUser.login, newUser.password]
    // );
    // result.id = result.lastId;
    const result = await AppDataSource.manager.save(newUser)
    return result;
  }

  async delete(id: string): Promise<any> {
    // data = data.filter((x: any) => x.id !== id)
    const result: any = await this.db.query("DELETE FROM users WHERE id=?", [
      id,
    ]);
    return result;
  }

  async update(user: User) {
    // const index = data.findIndex((obj: { id: string; }) => obj.id === id)
    // const userUpdate = { ...x, id: id }
    // if (index !== -1) {
    //     data[index] = userUpdate
    // }
    const result = await this.db.query(
      "UPDATE   users   SET  firstname=? , lastname=?   where id = ?",
      [user.firstname, user.lastname, user.id]
    );
    return result;
  }

  async notExist(login: string): Promise<boolean> {
    const user = await AppDataSource.manager.findOneBy(User, {
      login: login
    })
    // const users: User[] = await this.db.query(
    //   "SELECT * FROM users WHERE login=?",
    //   [login]
    // );

    return user !== undefined ? true : false
  }
}
