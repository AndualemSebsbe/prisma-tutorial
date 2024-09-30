import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  async function createUser() {
    const user = await prisma.user.create({
      data: {
        email: "andualemsebsbe1@gmail.com",
        firstName: "Andualem",
        lastName: "Sebsbe",
      },
    });

    console.log(user);
  }

  // createUser();

  async function getAllUsers() {
    const users = await prisma.user.findMany({
      include: { writtenPosts: true, likedPosts: true },
    });
    console.log(users);
  }

  // getAllUsers();

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

  // deleteUser(9);

  async function getUsersByfirstName() {
    const users = await prisma.user.findMany({
      where: {
        firstName: {
          startsWith: "A",
        },
      },
    });

    console.log(users);
  }

  // getUsersByfirstName();

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
      include: { writtenPosts: true },
    });

    console.log(user);
  }

  // getUserWithPosts();

  async function createUserWithPost() {
    const user = await prisma.user.create({
      data: {
        email: "soliyana@gmail.com",
        firstName: "Soliyana",
        lastName: "Sebsbe",
        writtenPosts: {
          create: [
            {
              title: "When is soliyana's birthday?",
              content: "Soliyana's birthday is on January 13, 2024",
            },
          ],
        },
      },
    });

    console.log(user);
  }

  // createUserWithPost();

  async function createUserWithEnum() {
    const user = await prisma.user.create({
      data: {
        email: "daniel@gmail.com",
        firstName: "Daniel",
        lastName: "Sebsbe",
        role: "MODERATOR",
      },
    });
  }

  // createUserWithEnum();

  async function updateUserWithEnum() {
    const updatedUser = await prisma.user.update({
      where: { id: 3 },
      data: {
        role: "MODERATOR",
      },
    });

    console.log(updatedUser);
  }

  // updateUserWithEnum();

  async function getUserByRole() {
    const moderators = await prisma.user.findMany({
      where: {
        role: "MODERATOR",
      },
    });

    console.log(moderators);
  }

  // getUserByRole();

  async function createUserAndPost() {
    const [user, post] = await prisma.$transaction([
      prisma.user.create({
        data: { email: "yordanos@gmail.com", firstName: "Yordanos Shiferaw" },
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

  async function getAllPosts() {
    const posts = await prisma.post.findMany({
      include: { likers: true, author: true },
    });

    console.log(posts);
  }

  // getAllPosts();

  async function getPostById() {
    const post = await prisma.post.findUnique({
      where: { id: 1 },
      include: { likers: true },
    });

    console.log(post);
  }

  // getPostById();

  async function createUserLikedPost() {
    const user = await prisma.user.create({
      data: {
        email: "user1@example.com",
        firstName: "Andualem",
        likedPosts: {
          connect: [{ id: 1 }, { id: 2 }],
        },
      },
    });

    console.log(user);
  }

  // createUserLikedPost();

  async function createPostWithLikers() {
    const post = await prisma.post.create({
      data: {
        title: "What is Next.js?",
        content: "Next.js is a fullstack framework built on the top of React",
        published: true,
        author: {
          // create: {
          //   email: "soliyana@example.com",
          //   firstName: "Soliyana",
          //   lastName: "Sebsbe",
          // },
          connect: { id: 7 },
        },
        likers: {
          connect: [{ id: 5 }, { id: 11 }],
        },
      },
    });

    console.log(post);
  }

  createPostWithLikers();
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
