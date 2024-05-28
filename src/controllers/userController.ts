import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AddUserSchema } from '../validation_schema';


export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      await AddUserSchema.validateAsync(req.body);

      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
