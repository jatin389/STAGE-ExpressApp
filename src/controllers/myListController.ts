import { Request, Response } from 'express';
import { MyListService } from '../services/myListService';

export class MyListController {
  private myListService: MyListService;

  constructor() {
    this.myListService = new MyListService();
  }

  public addToList = async (req: Request, res: Response) => {
    try {
      const { userId, itemId, itemType } = req.body;
      await this.myListService.addToList(userId, itemId, itemType);
      res.status(201).json({ message: 'Item added to list' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public removeFromList = async (req: Request, res: Response) => {
    try {
      const { userId, itemId } = req.body;
      await this.myListService.removeFromList(userId, itemId);
      res.status(200).json({ message: 'Item removed from list' });
    } catch (error) {
      res.status(500).json({ message: "error.message" });
    }
  };

  public listItems = async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.myListService.listItems(userId as string, page, limit);
      res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error });
    }
  };
}
