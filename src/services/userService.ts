import { User } from '../models/user';

export class UserService {
  public async createUser(userData: any) {
    const user = new User(userData);
    await user.save();
    return user;
  }
}
