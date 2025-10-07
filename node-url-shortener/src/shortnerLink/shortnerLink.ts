import { createHash } from "crypto";
import prisma from "../prisma/prisma";

const ShortUrlCharSize = 7;
function md5Hash(text : string): string {
  return createHash('md5').update(text).digest('hex');
}

function convertToBase64(text: string): string {
  return Buffer.from(text).toString('base64');
}

async function isShortUrlInUse(shortUrl: string): Promise<boolean> {
  const inUse = await prisma.shortlink.findFirst({
    where: { shortUrl },
  });
  return !!inUse;
}
  
export async function generateRandomShortUrl(longUrl: string){
    const hash: string = md5Hash(longUrl);
    let numberOfCharsInHash = hash.length;
    let counter = 0;
    while(counter < numberOfCharsInHash - ShortUrlCharSize){
        const candidate = hash.substring(counter, counter + ShortUrlCharSize);
        if(!await isShortUrlInUse(candidate)){ 
            return candidate;
        }
        counter++;
    }
    return convertToBase64(hash);
}
