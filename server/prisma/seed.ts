import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const root = async () => {
  const hashPassword = await bcrypt.hash('root', 3);
  const newUser = await prisma.users.upsert({
    where: { email: 'root' },
    update: {},
    create: { email: 'root', password: hashPassword, role: 'ADMIN' },
  });
  await prisma.baskets.create({ data: { userId: newUser.id } });
};

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

const mock = async () => {
  for (let i = 0; i < 100; i++) {
    await prisma.devices.upsert({
      where: { name: 'mock' + i },
      update: {},
      create: { name: 'mock' + i, typeId: 1, brandId: 1, price: 1 },
    });
  }
};

const seed = async () => {
  root();
  brands();
  types();
  mock();
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
