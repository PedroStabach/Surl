-- CreateTable
CREATE TABLE `shortlink` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ShortUrl` VARCHAR(16) NULL,
    `OriginalUrl` VARCHAR(500) NULL,
    `fk_UserID` INTEGER NULL,

    UNIQUE INDEX `ShortUrl`(`ShortUrl`),
    INDEX `fk_UserID`(`fk_UserID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(60) NOT NULL,
    `Password` VARCHAR(60) NOT NULL,
    `Email` VARCHAR(60) NOT NULL,
    `CreationDate` DATE NULL,

    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shortlink` ADD CONSTRAINT `shortlink_ibfk_1` FOREIGN KEY (`fk_UserID`) REFERENCES `user`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
