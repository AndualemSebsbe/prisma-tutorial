import { PrismaClient } from "@prisma/client";
// import { get } from "http";

const prisma = new PrismaClient();

async function main() {
  async function createUser() {
    const user = await prisma.user.create({
      data: {
        email: "yordanos@gmail.com",
        firstName: "Yordanos",
        lastName: "Shiferaw",
      },
    });

    console.log(user);
  }

  // createUser();

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
        title: "What is mongoose?",
        content:
          "Mongoose is an open source Node.js driver for MongoDB. It is a query builder for MongoDB.",
        author: {
          // create: {
          //   email: "soliyana@example.com",
          //   firstName: "Soliyana",
          //   lastName: "Sebsbe",
          // },
          connect: { id: 7 },
        },
        likers: {
          connect: [{ id: 5 }, { id: 7 }, { id: 3 }],
        },
      },
    });

    console.log(post);
  }

  // createPostWithLikers();

  async function createRole() {
    const role = await prisma.role.create({
      data: {
        name: "USER",
        users: {
          connect: [
            {
              id: 9,
            },
            { id: 11 },
            { id: 12 },
            { id: 5 },
            { id: 3 },
            { id: 7 },
          ],
        },
      },
    });

    console.log(role);
  }

  // createRole();

  async function createProfile() {
    const profile = await prisma.profile.create({
      data: {
        bio: "Software Developer",
        userId: 5,
        // user: {
        //   connect: {id: 5}
        // }
      },
    });

    console.log(profile);
  }

  // createProfile();

  async function createComment() {
    const comment = await prisma.comment.create({
      data: {
        content: "Great post!",
        // postId: 5
        // author: {
        //   connect: { id: 5 },
        // },
        post: {
          connect: { id: 5 },
        },
      },
    });

    console.log(comment);
  }

  // createComment();

  async function getUserWithPosts() {
    const user = await prisma.user.findUnique({
      where: { id: 1 },
      include: { writtenPosts: true },
    });

    console.log(user);
  }

  // getUserWithPosts();

  // Finding profile by user id
  async function getProfileByUserId(userId: number) {
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });

    console.log(profile);
  }

  // getProfileByUserId(5);

  // Filtering users with a specific profile bio
  async function getUsersByBio() {
    const users = await prisma.user.findMany({
      where: {
        profile: {
          bio: {
            contains: "Developer",
            mode: "insensitive",
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersByBio();

  // Filtering users without any posts
  async function getUsersWithoutPosts() {
    const users = await prisma.user.findMany({
      where: {
        writtenPosts: {
          none: {},
        },
      },
    });

    console.log(users);
  }

  // getUsersWithoutPosts();

  // Filtering users with a specific email
  async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(user);
  }

  // getUserByEmail("user@example.com");

  async function getFirstPublishedPost() {
    const firstPublishedPost = await prisma.post.findFirst({
      where: {
        published: true,
      },
      include: { author: true },
    });

    console.log(firstPublishedPost);
  }

  // getFirstPublishedPost();

  async function getAllUsers() {
    const users = await prisma.user.findMany({
      include: { writtenPosts: true, likedPosts: true },
    });
    console.log(users);
  }

  // getAllUsers();

  async function getPostById() {
    const post = await prisma.post.findUnique({
      where: { id: 1 },
      include: { likers: true, author: true },
    });

    console.log(post);
  }

  // getPostById();
  async function getAllPosts() {
    const posts = await prisma.post.findMany({
      include: { likers: true, author: true },
    });

    console.log(posts);
  }

  // getAllPosts();

  async function getUsersWithCondition() {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: "@gmail.com", // Find users with email containing "@gmail.com"
        },
      },
      orderBy: {
        email: "desc", // Sort by email in descending order, newest first
      },

      include: {
        writtenPosts: true,
        likedPosts: true,
      },
      take: 5, // Limit the number of users to 5
      skip: 3, // Skip the first 3 users (for pagination)
    });

    console.log(users);
  }

  // getUsersWithCondition();

  // Fetching posts with content containing "Prisma"
  async function getPostsByContent() {
    const posts = await prisma.post.findMany({
      where: {
        content: {
          contains: "Prisma",
        },
      },
    });

    console.log(posts);
  }

  // getPostsByContent();

  // Fetching users created after 2024-09-30
  async function getUsersByDate() {
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date("2024-09-30"), // Find users created after 2024-09-30
        },
      },

      include: {
        writtenPosts: true,
        likedPosts: true,
      },
    });

    console.log(users);
  }

  // getUsersByDate();

  // Fetching only the id and email fields of the users
  async function getUsersByIdAndEmail() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    console.log(users);
  }

  // getUsersByIdAndEmail();

  // Fetching users with their posts
  async function getUsersWithPosts() {
    const users = await prisma.user.findMany({
      include: {
        writtenPosts: true,
      },
    });

    console.log(users);
  }

  // getUsersWithPosts();

  // Fetching posts with author information
  async function getPostsWithAuthor() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    console.log(posts);
  }

  // getPostsWithAuthor();

  // Fetching posts with their likers
  async function getPostsWithLikers() {
    const posts = await prisma.post.findMany({
      include: {
        likers: true,
      },
    });

    console.log(posts);
  }

  // getPostsWithLikers();

  // Fetching posts with their author and likers
  async function getPostsWithAuthorAndLikers() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likers: true,
      },
    });

    console.log(posts); // Prints all posts with their author and likers
  }

  // getPostsWithAuthorAndLikers();

  // Paginating users
  async function getUsersPaginated() {
    const users = await prisma.user.findMany({
      skip: 2, // Skip the first 2 users
      take: 5, // Take the next 5 users
    });

    console.log(users);
  }

  // getUsersPaginated();

  // Fetching posts ordered by creation date
  async function getPostsOrderedByDate() {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Order by creation date in descending order, newest first
      },
    });

    console.log(posts);
  }

  // getPostsOrderedByDate();

  // Fetching posts ordered by number of likes
  async function getPostsOrderedByLikes() {
    const posts = await prisma.post.findMany({
      orderBy: {
        likers: {
          _count: "desc", // Order by number of likes in descending order, most liked first
        },
      },

      include: {
        likers: true,
      },
    });

    console.log(posts);
  }

  // getPostsOrderedByLikes();

  // Counting users
  async function countUsers() {
    const count = await prisma.user.count();

    console.log(count);
  }

  // countUsers();

  // Finding the average age of users
  async function getAverageAge() {
    const averageAge = await prisma.user.aggregate({
      _avg: {
        age: true,
      },
    });

    console.log(averageAge);
  }

  // getAverageAge();

  // Finding the maximum age of users
  async function getMaxAge() {
    const maxAge = await prisma.user.aggregate({
      _max: {
        age: true,
      },
    });

    console.log(maxAge);
  }

  // getMaxAge();

  // Grouping posts by author and counting the number of posts written by each author
  async function getPostsGroupedByAuthor() {
    const posts = await prisma.post.groupBy({
      by: ["authorId"],
      _count: {
        id: true,
      },
    });

    console.log(posts);
  }

  // getPostsGroupedByAuthor();

  // Handling query for a non-existent user
  async function getUserById() {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: 9999,
        },
      });

      if (!user) {
        console.log("User not found");
        throw new Error("User not found");
      }
    } catch (error: any) {
      console.error("Error: ", error.message);
    }
  }

  // getUserById();

  // Finding users with a specific name and email
  async function getUsersByNameAndEmail() {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            firstName: "Andualem",
          },
          {
            lastName: "Sebsbe",
          },
          {
            email: {
              contains: "@gmail.com",
            },
          },
        ],
      },
    });

    console.log(users);
  }

  // getUsersByNameAndEmail();

  // finding users with a specific name or email
  async function getUsersByNameOrEmail() {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: "Andualem",
          },
          {
            email: {
              contains: "@example.com",
            },
          },
        ],
      },
    });

    console.log(users);
  }

  // getUsersByNameOrEmail();

  // Excluding users with a certain email
  async function getUsersExcludingEmail() {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: {
            contains: "@example.com",
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersExcludingEmail();

  // Finding users with a specific name and either a certain email or age
  async function getUsersByNameAndEmailOrAge() {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            lastName: "Sebsbe",
          },
          {
            OR: [
              {
                email: {
                  contains: "@example.com",
                },
              },
              {
                age: {
                  lte: 20,
                  gte: 10,
                },
              },
            ],
          },
        ],
      },
    });

    console.log(users);
  }

  // getUsersByNameAndEmailOrAge();

  // Finding posts by author
  async function getPostsByAuthor() {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          email: {
            contains: "daniel@gmail.com",
          },
        },
      },

      include: {
        author: true,
      },
    });

    console.log(posts);
  }

  // getPostsByAuthor();

  // Finding users with published posts
  async function getUsersWithPublishedPosts() {
    const users = await prisma.user.findMany({
      include: {
        writtenPosts: {
          where: {
            published: true,
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersWithPublishedPosts();

  // Finding users with at least one published posts
  async function getUsersWithAtLeastOnePublishedPost() {
    const users = await prisma.user.findMany({
      where: {
        writtenPosts: {
          some: {
            published: true,
          },
        },
      },
      include: {
        writtenPosts: true,
      },
    });

    console.log(users);
  }

  // getUsersWithAtLeastOnePublishedPost();

  //Finding users with a case insensitive email
  async function getUsersWithEmail() {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: "@EXAMPLE.com",
          mode: "insensitive",
        },
      },
    });

    console.log(users);
  }

  // getUsersWithEmail();

  // Finding posts without content
  async function getPostsWithoutContent() {
    const posts = await prisma.post.findMany({
      where: {
        content: null,
      },
    });

    console.log(posts);
  }

  // getPostsWithoutContent();

  // Finding users with their published posts and selecting specific fields
  async function getUsersWithPublishedPostsAndSelectFields() {
    const users = await prisma.user.findMany({
      where: {
        writtenPosts: {
          some: {
            published: true,
          },
        },
      },
      select: {
        id: true,
        email: true,
        writtenPosts: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersWithPublishedPostsAndSelectFields();

  // Filtering users with a specific role
  async function getUsersWithRole() {
    const users = await prisma.user.findMany({
      where: {
        roles: {
          some: { name: "MODERATOR" },
        },
      },
    });

    console.log(users);
  }

  // getUsersWithRole();

  // Filtering roles assigned to users with a specific email
  async function getRolesByUserEmail() {
    const roles = await prisma.role.findMany({
      where: {
        users: {
          some: {
            email: {
              contains: "@example.com",
            },
          },
        },
      },
    });

    console.log(roles);
  }

  // getRolesByUserEmail();

  // Filtering users with a specific role or published posts
  async function getUsersWithRoleOrPublishedPosts() {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            roles: {
              some: { name: "MODERATOR" },
            },
          },
          {
            writtenPosts: {
              some: {
                published: true,
              },
            },
          },
        ],
      },
    });

    console.log(users);
  }

  // getUsersWithRoleOrPublishedPosts();

  // Excluding users with a specific role
  async function getUsersExcludingRole() {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          roles: {
            some: { name: "MODERATOR" },
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersExcludingRole();

  // Filtering users with no roles assigned approach 1
  async function getUsersWithNoRoles() {
    const users = await prisma.user.findMany({
      where: {
        roles: {
          none: {},
        },
      },
    });

    console.log(users);
  }

  // getUsersWithNoRoles();

  // Filtering users with no roles assigned approach 2
  async function getUsersWithNoRoles2() {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          roles: {
            some: {},
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersWithNoRoles2();

  // Filtering users with no roles assigned approach 3
  async function getUsersWithNoRoles3() {
    const usersWitRoles = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            roles: true,
          },
        },
      },
    });

    // console.log(usersWitRoles);

    const users = usersWitRoles.filter((user) => user._count.roles === 0);

    console.log(users);
  }

  // getUsersWithNoRoles3();

  // Filtering users based on post comments
  async function getUsersWithPostComments() {
    const users = await prisma.user.findMany({
      where: {
        writtenPosts: {
          some: {
            comments: {
              some: {
                content: {
                  contains: "Great post!",
                },
              },
            },
          },
        },
      },
    });

    console.log(users);
  }

  // getUsersWithPostComments();

  // Finding users with at least one liked post
  async function getUsersWithAtLeastOneLikedPost() {
    const usersWithLikedPosts = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            likedPosts: true,
          },
        },
      },

      // include: {
      //   writtenPosts: true,
      // },
    });

    const users = usersWithLikedPosts.filter(
      (user) => user._count.likedPosts > 0
    );

    console.log(users);
  }

  // getUsersWithAtLeastOneLikedPost();

  // Finding users with more than 3 posts using groupBy
  // async function getUsersWithMoreThanThreePostsUsingGroupBy() {
  //   const usersWithMoreThan3Posts = await prisma.user.groupBy({
  //     by: ["id"],
  //     _count: {
  //       writtenPosts: true, // Count the related posts
  //     },
  //     having: {
  //       writtenPosts: {
  //         gt: 3, // Users with more than 3 posts
  //       },
  //     },
  //     // include: {
  //     //   user: true, // Include user data after grouping
  //     // },
  //   });

  //   console.log(usersWithMoreThan3Posts);
  // }

  // getUsersWithMoreThanThreePostsUsingGroupBy();

  // Finding users with more than 3 posts using select
  async function getUsersWithMoreThanThreePosts() {
    const usersWithPostCount = await prisma.user.findMany({
      include: {
        _count: {
          select: { writtenPosts: true }, // Count the number of posts for each user
        },
      },
    });

    const usersWithMoreThan3Posts = usersWithPostCount.filter(
      (user) => user._count.writtenPosts > 3
    );

    console.log(usersWithMoreThan3Posts);
  }

  // getUsersWithMoreThanThreePosts();

  // Excluding fields from the response
  async function getUsersSelectingFields() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    console.log(users);
  }

  // getUsersSelectingFields();

  // Sorting users by email
  async function getUsersSorted() {
    const users = await prisma.user.findMany({
      orderBy: {
        email: "asc",
      },
    });

    console.log(users);
  }

  // getUsersSorted();

  // Fetching users with first name starting with "A"
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

  async function getUserByRole() {
    const moderators = await prisma.user.findMany({
      where: {
        role: "MODERATOR",
      },
    });

    console.log(moderators);
  }
  // getUserByRole();

  async function updateUser(id: number) {
    const user = await prisma.user.update({
      where: { id },
      data: { email: "andu1@gmail.com" },
    });

    console.log(user);
  }

  // updateUser(3);
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

  async function updatePostLikers() {
    const post = await prisma.post.update({
      where: {
        id: 6,
      },
      data: {
        likers: {
          connect: [{ id: 9 }],
        },
      },
      include: {
        likers: true,
      },
    });

    console.log(post);
  }

  // updatePostLikers();

  async function updateUserAge() {
    const user = await prisma.user.update({
      where: {
        id: 11,
      },
      data: {
        age: 1,
      },
    });

    console.log(user);
  }

  // updateUserAge();

  async function deleteUser(id: number) {
    const user = await prisma.user.delete({
      where: { id },
    });

    console.log(user);
  }

  // deleteUser(9);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
