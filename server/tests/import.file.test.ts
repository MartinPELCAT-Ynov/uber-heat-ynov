import { join } from "path";
import { CsvImportService } from "../src/services/CsvImportService";
import { ProductBuilderService } from "../src/services/ProductBuilderService";
import { createConnection } from "typeorm";

beforeAll(async () => {
  await createConnection();
});

test("Test import file", async () => {
  const path = join(__dirname, "../upload/products.csv");
  const service = new CsvImportService(new ProductBuilderService());
  const test = await service.importCsvProduct(path);
  expect(test).toBe(true);
}, 30000);
