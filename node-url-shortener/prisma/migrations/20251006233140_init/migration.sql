-- CreateTable
CREATE TABLE "Shortlink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortUrl" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "fkUserId" INTEGER,
    CONSTRAINT "Shortlink_fkUserId_fkey" FOREIGN KEY ("fkUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "googleId" TEXT,
    "avatar" TEXT,
    "creationDate" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Shortlink_shortUrl_key" ON "Shortlink"("shortUrl");

-- CreateIndex
CREATE INDEX "Shortlink_fkUserId_idx" ON "Shortlink"("fkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
