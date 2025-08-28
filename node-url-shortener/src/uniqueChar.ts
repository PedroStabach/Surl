const numCharsShortUrl: number = 7;
const alfabeto:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const random = Math.random;

export async function generateShortUrl() {
    const result = [numCharsShortUrl];
    while(true) {
    for(let i = 0; i < numCharsShortUrl; i++) {
        var randomIndex = random.nextInt(0, (alfabeto.length()) - 1);
        result[i] = alfabeto.charAt(randomIndex);
    }
    var shortUrl = result.toString();
    if(!await prisma.url.findUnique({ where: { shortUrl: shortUrl } })) {
        console.log(shortUrl);
        return shortUrl;
    }
  }
}