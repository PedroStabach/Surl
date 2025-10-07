"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomShortUrl = generateRandomShortUrl;
const crypto_1 = require("crypto");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const ShortUrlCharSize = 7;
function md5Hash(text) {
    return (0, crypto_1.createHash)('md5').update(text).digest('hex');
}
function convertToBase64(text) {
    return Buffer.from(text).toString('base64');
}
async function isShortUrlInUse(shortUrl) {
    const inUse = await prisma_1.default.shortlink.findFirst({
        where: { shortUrl },
    });
    return !!inUse;
}
async function generateRandomShortUrl(longUrl) {
    const hash = md5Hash(longUrl);
    let numberOfCharsInHash = hash.length;
    let counter = 0;
    while (counter < numberOfCharsInHash - ShortUrlCharSize) {
        const candidate = hash.substring(counter, counter + ShortUrlCharSize);
        if (!await isShortUrlInUse(candidate)) {
            return candidate;
        }
        counter++;
    }
    return convertToBase64(hash);
}
