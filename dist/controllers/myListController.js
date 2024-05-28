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
exports.MyListController = void 0;
const myListService_1 = require("../services/myListService");
class MyListController {
    constructor() {
        this.addToList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, itemId, itemType } = req.body;
                yield this.myListService.addToList(userId, itemId, itemType);
                res.status(201).json({ message: 'Item added to list' });
            }
            catch (error) {
                res.status(500).json({ message: "error.message" });
            }
        });
        this.removeFromList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, itemId } = req.body;
                yield this.myListService.removeFromList(userId, itemId);
                res.status(200).json({ message: 'Item removed from list' });
            }
            catch (error) {
                res.status(500).json({ message: "error.message" });
            }
        });
        this.listItems = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside get call");
            try {
                const { userId } = req.query;
                console.log("userId", userId);
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const result = yield this.myListService.listItems(userId, page, limit);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error });
            }
        });
        this.myListService = new myListService_1.MyListService();
    }
}
exports.MyListController = MyListController;
