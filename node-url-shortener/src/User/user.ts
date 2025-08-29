import prisma from "../prisma/prisma";

async function create (nome: string, email: string) {
    const user = await prisma.user.create({
        data: {
            nome,
            email,
            creationDate: new Date()
        }
    });
    return user;
}

async function findFirst(id:number) {
    const user = await prisma.user.email.findUnique({
        where: {id}
    })
    return user;
}
async function findAll() {
    const users = await prisma.user.findMany();
    return users;
}

async function deleteUser (id:number) {
    const user = await prisma.user.delete({
        where: {id}
    })
    return user;
}

export default create; deleteUser; findAll ; findFirst;
