import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { TVShow } from '../models/tvshow';

dotenv.config();

export const generateTVShows = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string, {});

  const tvShows = [];
  for (let i = 0; i < 100; i++) {
    const episodes = [];
    const numberOfSeasons = faker.number.int({ min: 1, max: 5 });
    for (let season = 1; season <= numberOfSeasons; season++) {
      const numberOfEpisodes = faker.number.int({ min: 5, max: 20 });
      for (let episode = 1; episode <= numberOfEpisodes; episode++) {
        episodes.push({
          episodeNumber: episode,
          seasonNumber: season,
          releaseDate: faker.date.past(),
          director: faker.person.fullName(),
          actors: new Array(3).fill(null).map(() => faker.person.fullName())
        });
      }
    }

    const tvShow = new TVShow({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      genres: faker.helpers.arrayElements(['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'], 3),
      episodes
    });
    tvShows.push(tvShow);
  }

  try {
    await TVShow.insertMany(tvShows);
    console.log('100 TV shows have been inserted');
  } catch (err) {
    console.error('Error inserting TV shows:', err);
  } finally {
    mongoose.connection.close();
  }
};
