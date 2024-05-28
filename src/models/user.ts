import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: string[];
    dislikedGenres: string[];
  };
  watchHistory: {
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }[];
  myList: {
    itemId: string;
    itemType: string;
    dateAddedOn: Date;
  }[];
}

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }]
  },
  watchHistory: [
    {
      contentId: { type: String },
      watchedOn: { type: Date },
      rating: { type: Number }
    }
  ],
  myList: [
    {
      itemId: { type: String, required: true },
      itemType: { type: String, required: true },
      dateAddedOn: { type: Date, default: Date.now }
    }
  ]
});

export const User = model<IUser>('User', UserSchema);

