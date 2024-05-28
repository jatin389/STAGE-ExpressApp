import { Schema, model, Document } from 'mongoose';

interface ITVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: string[];
  episodes: {
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }[];
}

const TVShowSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  episodes: [
    {
      episodeNumber: { type: Number, required: true },
      seasonNumber: { type: Number, required: true },
      releaseDate: { type: Date, required: true },
      director: { type: String, required: true },
      actors: [{ type: String, required: true }]
    }
  ]
});

export const TVShow = model<ITVShow>('TVShow', TVShowSchema);
