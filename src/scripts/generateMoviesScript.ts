import mongoose from 'mongoose';
import { Movie } from '../models/movie'; // Adjust the path according to your project structure
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

export const generateMovies = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string, {});

  const movies = [];
  for (let i = 0; i < 100; i++) {
    const movie = new Movie({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      genres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'], 3),
      releaseDate: faker.date.past(),
      director: faker.person.fullName(),
      actors: new Array(3).fill(null).map(() => faker.person.fullName())
    });
    movies.push(movie);
  }

  try {
    await Movie.insertMany(movies);
    console.log('100 movies have been inserted');
  } catch (err) {
    console.error('Error inserting movies:', err);
  } finally {
    mongoose.connection.close();
  }
};