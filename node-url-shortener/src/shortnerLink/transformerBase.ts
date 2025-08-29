import * as crypto from 'crypto';
import * as prisma from '@prisma/client';
const crypto = new Crypto;
const ShortUrlCharSize = 7;
function md5Hash(text : string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

function convertToBase64(text: string): string {
  return Buffer.from(text).toString('base64');
}
async function generateRandomShortUrl(longUrl: string){
    const hash: string = md5Hash(longUrl);
    let numberOfCharsInHash = hash.length;
    let counter = 0;
    while(counter < numberOfCharsInHash){
        if(!await isShortUrlInUse(hash.substring(counter, counter + ShortUrlCharSize))){ 
            hash.substring(counter, counter + ShortUrlCharSize);
        }
    }
}
function isShortUrlInUse(shortUrl: string): boolean {
  // SE TIVER UM SHORTURL IGUAL NO BD RETURN FALSE
  return true
}