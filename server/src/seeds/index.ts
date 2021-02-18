import { getRepository } from "typeorm";
import { User } from "@entity/User";
import { CsvImportService } from "../services/CsvImportService";
import { join } from "path";
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

  const csvImportService = new CsvImportService();
  await csvImportService.importCsvProduct(
    join(__dirname, "../../upload/products.csv")
  );
};
