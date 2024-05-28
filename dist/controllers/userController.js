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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const validation_schema_1 = require("../validation_schema");
// import { UserService } from '../services/userService';
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield validation_schema_1.AddUserSchema.validateAsync(req.body);
                const user = yield this.userService.createUser(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "error.message" });
            }
        });
        this.userService = new userService_1.UserService();
    }
}
exports.UserController = UserController;
