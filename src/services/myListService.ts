import { User } from '../models/user';
import { Movie } from '../models/movie';
import { TVShow } from '../models/tvshow';

export class MyListService {
  public async addToList(userId: string, itemId: string, itemType: 'Movie' | 'TVShow') {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.myList.find(item => item.itemId === itemId)) {
      throw new Error('Item already in list');
    }

    user.myList.push({ itemId, itemType, dateAddedOn: new Date() });
    await user.save();
  }

  public async removeFromList(userId: string, itemId: string) {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    user.myList = user.myList.filter(item => item.itemId !== itemId);
    await user.save();
  }

  public async listItems(userId: string, page: number, limit: number) {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const items = user.myList.slice(startIndex, endIndex);

    const itemDetails = await Promise.all(items.map(async item => {
      if (item.itemType === 'Movie') {
        return await Movie.findOne({ id: item.itemId });
      } else {
        return await TVShow.findOne({ id: item.itemId });
      }
    }));

    return {
      items: items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(user.myList.length / limit),
        pageSize: limit,
        totalItems: user.myList.length
      }
    };
  }
}
