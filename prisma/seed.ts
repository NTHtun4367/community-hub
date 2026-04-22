import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const FAKE_POSTS = [
  {
    title: "First Post",
    description:
      "Nam tempor finibus lorem, nec varius arcu convallis sed. Nunc id orci a neque vehicula malesuada. Donec vehicula libero vel leo convallis, nec tincidunt felis tincidunt. Maecenas euismod tristique leo, vel malesuada ligula malesuada sed. Donec eget libero id leo congue venenatis.",
  },
  {
    title: "Second Post",
    description:
      "Nam tempor finibus lorem, nec varius arcu convallis sed. Nunc id orci a neque vehicula malesuada. Donec vehicula libero vel leo convallis, nec tincidunt felis tincidunt. Maecenas euismod tristique leo, vel malesuada ligula malesuada sed. Donec eget libero id leo congue venenatis.",
  },
  {
    title: "Third Post",
    description:
      "Nam tempor finibus lorem, nec varius arcu convallis sed. Nunc id orci a neque vehicula malesuada. Donec vehicula libero vel leo convallis, nec tincidunt felis tincidunt. Maecenas euismod tristique leo, vel malesuada ligula malesuada sed. Donec eget libero id leo congue venenatis.",
  },
];

const seed = async () => {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: FAKE_POSTS,
  });

  console.log("DB seeded.");
};

seed();
