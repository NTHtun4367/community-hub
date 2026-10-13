import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_POST_ID = "demo-popular-post";

const seed = async () => {
  const author = await prisma.user.findFirst({ select: { id: true } });
  if (!author) {
    console.log("Create an account first, then run the seed again to add the demo post.");
    return;
  }

  await prisma.post.upsert({
    where: { id: DEMO_POST_ID },
    update: {},
    create: {
      id: DEMO_POST_ID,
      title: "Demo: What helped you become a better developer?",
      description:
        "<p><strong>Welcome to Dev Forum!</strong> This sample post is here to help you preview the popular feed.</p><p>Share a learning resource, workflow, or small habit that made a difference in your development journey. Upvote this post to see how community ranking works.</p>",
      tags: ["welcome", "career", "learning"],
      status: "DONE",
      userId: author.id,
    },
  });

  console.log("Demo post added. Existing posts were left untouched.");
};

seed()
  .catch((error) => {
    console.error("Failed to seed demo post:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
