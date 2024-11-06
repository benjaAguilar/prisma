import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() { 
    await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            posts: {
                create: {
                    title: 'Ricardo just created a personal post!'
                }
            }
        }
    })

    const user = await prisma.user.findMany({include: {
        posts: true
    }});
    
    console.log(user);
    console.dir(user[0].posts);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
