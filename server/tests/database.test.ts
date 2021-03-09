import { seedsDataBase } from "../src/seeds";
import { createConnection, getConnection } from "typeorm";
import { User } from "../src/entity/User";

beforeAll(async () => {
  await createConnection();
  await seedsDataBase();
});

afterAll(async () => {
  getConnection().close();
});

test("check database connection", async () => {
  const connect = getConnection();
  expect(connect.isConnected).toBe(true);
});

test("has user seeded", async () => {
  const EMAIL = "martin.pelcat@ynov.com";
  const user = await User.findOne({
    where: {
      email: EMAIL,
    },
  });

  expect(user.email).toBe(EMAIL);
});
