import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const brands = async () => {
  await prisma.brands.upsert({
    where: { name: 'Sumsung' },
    update: {},
    create: { name: 'Sumsung' },
  });

  await prisma.brands.upsert({
    where: { name: 'Lenovo' },
    update: {},
    create: { name: 'Lenovo' },
  });

  await prisma.brands.upsert({
    where: { name: 'Apple' },
    update: {},
    create: { name: 'Apple' },
  });

  await prisma.brands.upsert({
    where: { name: 'Xiaomi' },
    update: {},
    create: { name: 'Xiaomi' },
  });

  await prisma.brands.upsert({
    where: { name: 'Logitech' },
    update: {},
    create: { name: 'Logitech' },
  });
};

const types = async () => {
  await prisma.types.upsert({
    where: { name: 'smartphone' },
    update: {},
    create: { name: 'smartphone' },
  });

  await prisma.types.upsert({
    where: { name: 'mouse' },
    update: {},
    create: { name: 'mouse' },
  });

  await prisma.types.upsert({
    where: { name: 'headphones' },
    update: {},
    create: { name: 'headphones' },
  });

  await prisma.types.upsert({
    where: { name: 'refrigerator' },
    update: {},
    create: { name: 'refrigerator' },
  });
};

const seed = async () => {
  brands();
  types();
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
