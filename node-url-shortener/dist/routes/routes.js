"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const linkRoutes_1 = __importDefault(require("./linkRoutes"));
const authRoutes_1 = __importDefault(require("../auth/authRoutes"));
const router = (0, express_1.Router)();
//CRUD USER
router.use(userRoutes_1.default);
//CRUD LINK
router.use(linkRoutes_1.default);
//AUTH
router.use(authRoutes_1.default);
exports.default = router;
