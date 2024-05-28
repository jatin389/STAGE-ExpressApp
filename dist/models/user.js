"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
            itemType: { type: String, required: true }
        }
    ]
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
