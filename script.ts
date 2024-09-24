import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  async function createUser() {
    const user = await prisma.user.create({
      data: {
        email: "biruk@gmail.com",
        name: "Biruk Sebsbe",
      },
    });
    console.log(user);
  }

//   createUser();

  async function getAllUsers() {
    const users = await prisma.user.findMany({
      include: { posts: true },
    });
    console.log(users);
  }

  getAllUsers();

  async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(user);
  }

  // getUserByEmail("user@example.com");

  async function updateUser(id: number) {
    const user = await prisma.user.update({
      where: { id },
      data: { email: "andu1@gmail.com" },
    });

    console.log(user);
  }

  // updateUser(3);

  async function deleteUser(id: number) {
    const user = await prisma.user.delete({
      where: { id },
    });

    console.log(user);
  }

  // deleteUser(3);

  async function getUsersByName() {
    const users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: "A",
        },
      },
    });

    console.log(users);
  }

  // getUsersByName();

  async function getUsersSorted() {
    const users = await prisma.user.findMany({
      orderBy: {
        email: "asc",
      },
    });

    console.log(users);
  }

  // getUsersSorted();

  async function getUsersPaginated() {
    const users = await prisma.user.findMany({
      skip: 2,
      take: 3,
    });

    console.log(users);
  }

  // getUsersPaginated();

  async function getUserWithPosts() {
    const user = await prisma.user.findUnique({
      where: { id: 1 },
      include: { posts: true },
    });

    console.log(user);
  }

  // getUserWithPosts();

  async function createUserWithPost() {
    const user = await prisma.user.create({
      data: {
        email: "messisebsbe@gmail.com",
        name: "Meseret Sebsbe",
        posts: {
          create: {
            title: "What is Designer",
            content: "Designer is hdnshvdhfvdl",
            published: true,
          },
        },
      },
    });

    console.log(user);
  }

  // createUserWithPost();

  async function createUserAndPost() {
    const [user, post] = await prisma.$transaction([
      prisma.user.create({
        data: { email: "yordanos@gmail.com", name: "Yordanos Shiferaw" },
      }),

      prisma.post.create({
        data: {
          title: "Software Developer",
          content: "I'm a software developer at Zemen Bank",
          authorId: 9,
        },
      }),
    ]);

    console.log(user, post);
  }

  // createUserAndPost();
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

