import prisma from "../prisma/prisma";

async function create (Name: string, Email: string) {
    const user = await prisma.user.create({
        data: {
            Name,
            Email,
            CreationDate: new Date()
        }
    });
    return user;
}

async function findFirst(ID:number) {
    const user = await prisma.user.findUnique({
        where: {ID}
    })
    return user;
}
async function findAll() {
    const users = await prisma.user.findMany();
    return users;
}

async function deleteUser (ID:number) {
    const user = await prisma.user.delete({
        where: {ID}
    })
    return user;
}

export default create; deleteUser; findAll ; findFirst;
