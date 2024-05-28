"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyListService = void 0;
const user_1 = require("../models/user");
const movie_1 = require("../models/movie");
const tvshow_1 = require("../models/tvshow");
class MyListService {
    addToList(userId, itemId, itemType) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.myList.find(item => item.itemId === itemId)) {
                throw new Error('Item already in list');
            }
            user.myList.push({ itemId, itemType });
            yield user.save();
        });
    }
    removeFromList(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            user.myList = user.myList.filter(item => item.itemId !== itemId);
            yield user.save();
        });
    }
    listItems(userId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const items = user.myList.slice(startIndex, endIndex);
            const itemDetails = yield Promise.all(items.map((item) => __awaiter(this, void 0, void 0, function* () {
                if (item.itemType === 'Movie') {
                    return yield movie_1.Movie.findOne({ id: item.itemId });
                }
                else {
                    return yield tvshow_1.TVShow.findOne({ id: item.itemId });
                }
            })));
            return {
                items: itemDetails,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(user.myList.length / limit),
                    pageSize: limit,
                    totalItems: user.myList.length
                }
            };
        });
    }
}
exports.MyListService = MyListService;
