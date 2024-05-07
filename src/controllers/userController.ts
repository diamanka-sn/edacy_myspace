// const userService = require('../services/userService')
import { User } from '../models/user'
import { UserService } from '../services/userService'
import { Request, Response } from 'express'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async getAll(req: Request, res: Response) {
        try {
            const data = await this.userService.getAll()
            res.json(data)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id
            const data = await this.userService.getById(id)
            if(data){
                res.json(data)
            } else 
            res.sendStatus(404);
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }

    }

    async create(req: Request, res: Response) {
        const { firstname, lastname, login, password } = req.body;
        if (firstname === undefined || lastname === undefined || login === undefined || password === undefined) {
            res.status(400).json({ message: "body not match contract " });
        } else {
            try {
                const UserNotExist = await this.userService.notExist(login)
                if (UserNotExist) {
                    const user: User = { firstname, lastname, login, password };
                    const data = await this.userService.create(user);
                    res.status(201).json(data);
                } else {
                    res.status(400).json({ "message": "user already exist with same login" })
                }
            } catch (error: any) {
                res.status(500).json({ message: error.message })
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const user: User = req.body;
            user.id = req.params.id as string;
            const data = await this.userService.update(user);
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id
            await this.userService.delete(id)
            res.sendStatus(204)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
