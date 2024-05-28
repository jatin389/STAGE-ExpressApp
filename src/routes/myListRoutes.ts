import { Router } from 'express';
import { MyListController } from '../controllers/myListController';

const router = Router();
const myListController = new MyListController();

router.post('/mylist', myListController.addToList);
router.delete('/mylist', myListController.removeFromList);
router.get('/mylist', myListController.listItems);

export default router;
