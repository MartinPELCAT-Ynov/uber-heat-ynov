import { getRepository } from "typeorm";
import { User } from "../entity/User";
export const seedsDataBase = async () => {
  /**
   * Add Users
   */
  const userRepository = getRepository(User);

  const user = userRepository.create({
    firstName: "Martin",
    name: "PELCAT",
    password: "hophop",
    company: "JonquilleLand",
    locked: false,
    email: "martin.pelcat@ynov.com",
  });
  await userRepository.save(user);
};
