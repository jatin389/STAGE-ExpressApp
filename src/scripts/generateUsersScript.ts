import mongoose from 'mongoose';
import { User } from '../models/user';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

export const generateUsers = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string, {});

  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = new User({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      preferences: {
        favoriteGenres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'], 3),
        dislikedGenres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'], 2)
      },
      watchHistory: [],
      myList: []
    });
    users.push(user);
  }

  try {
    await User.insertMany(users);
    console.log('100 users have been inserted');
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    mongoose.connection.close();
  }
};
