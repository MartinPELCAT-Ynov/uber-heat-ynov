import { getRepository } from "typeorm";
import { Product } from "@entity/Product";
import { User } from "@entity/User";
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

  const productRepository = getRepository(Product);

  const product = productRepository.create({
    basePrice: 600,
    rectConfigurations: [
      {
        db10: 10,
        db1: 1,
        db2: 2,
        db5: 5,
        depth: 123,
        width: 1234,
        height: 1111,
        thickness: 2,
      },
    ],
    circConfigurations: [
      {
        db10: 10,
        db1: 1,
        db2: 2,
        db5: 5,
        depth: 123,
        diameter: 33,
      },
    ],
    name: "Nouveau Produit",
  });

  await productRepository.save(product);
};
