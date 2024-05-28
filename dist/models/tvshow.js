"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVShow = void 0;
const mongoose_1 = require("mongoose");
const TVShowSchema = new mongoose_1.Schema({
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
exports.TVShow = (0, mongoose_1.model)('TVShow', TVShowSchema);
