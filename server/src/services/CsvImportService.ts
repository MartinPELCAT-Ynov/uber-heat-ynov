import { createReadStream } from "fs";
import csv from "csv-parser";
import { ProductBuilderService } from "./ProductBuilderService";

export class CsvImportService {
  private productBuilderService = new ProductBuilderService();

  async importCsvProduct(path: string) {
    console.log("Importing CSV");
    const results = [];

    return createReadStream(path)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        console.log("Import completed");

        for (const row of results) {
          await this.productBuilderService.addProduct(row);
        }
      })
      .on("error", (error) => console.log("Import Failed", error));
  }
}
