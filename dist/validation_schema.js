"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserSchema = exports.USERGENREENUM = void 0;
const joi_1 = __importDefault(require("joi"));
var USERGENREENUM;
(function (USERGENREENUM) {
    USERGENREENUM["ACTION"] = "Action";
    USERGENREENUM["COMEDY"] = "Comedy";
    USERGENREENUM["DRAMA"] = "Drama";
    USERGENREENUM["HORROR"] = "Horror";
    USERGENREENUM["ROMANCE"] = "Romance";
    USERGENREENUM["THRILLER"] = "Thriller";
})(USERGENREENUM || (exports.USERGENREENUM = USERGENREENUM = {}));
exports.AddUserSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    preferences: joi_1.default.object({
        favoriteGenres: joi_1.default.array().items(joi_1.default.string().valid('Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller')).optional(),
        dislikedGenres: joi_1.default.array().items(joi_1.default.string()).optional()
    }).optional(),
    watchHistory: joi_1.default.array().optional(),
    myList: joi_1.default.array().optional(),
}).unknown(true).options({ abortEarly: false });
