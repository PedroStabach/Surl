"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma/prisma"));
async function create(nome, email) {
    const user = await prisma_1.default.user.create({
        data: {
            nome,
            email,
            creationDate: new Date()
        }
    });
    return user;
}
async function findFirst(id) {
    const user = await prisma_1.default.user.email.findUnique({
        where: { id }
    });
    return user;
}
async function findAll() {
    const users = await prisma_1.default.user.findMany();
    return users;
}
async function deleteUser(id) {
    const user = await prisma_1.default.user.delete({
        where: { id }
    });
    return user;
}
exports.default = create;
deleteUser;
findAll;
findFirst;
