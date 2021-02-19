import { getRepository } from "typeorm";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { UserRole } from "../enums/UserRole";
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
    role: UserRole.ADMIN,
    email: "martin.pelcat@ynov.com",
  });
  await userRepository.save(user);

  const projectRepo = getRepository(Project);
  const projects = projectRepo.create([
    { description: "Projet 1", name: "Projet 1", user: user },
    { description: "Projet 2", name: "Projet 2", user: user },
  ]);
  projectRepo.save(projects);
};
