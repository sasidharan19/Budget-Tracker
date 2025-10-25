import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const username = "testuser";
  const password = "password1234";

  const exists = await prisma.user.findUnique({ where: { username } });
  if (!exists) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: { username, passwordHash: hash },
    });
    console.log("Created test user:", username, "password:", password);
  } else {
    console.log("Test user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
