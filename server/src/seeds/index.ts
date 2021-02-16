import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { Role } from "../entity/UseRole";
export const seedsDataBase = async () => {
  /**
   * Add roles
   */
  const roleRepository = getRepository(Role);

  const roles = roleRepository.create([
    { name: "STUDENT" },
    { name: "ADMIN" },
    { name: "TEACHER" },
  ]);

  const addedRoles = await roleRepository.save(roles);




  /**
   * Add Users
   */
  const userRepository = getRepository(User);

  const user = userRepository.create({
    firstName: "Martin",
    lastName: "PELCAT",
    username: "pelcatm",
    password: "hophop",
    roles: addedRoles,
  });

  await userRepository.save(user);
};
