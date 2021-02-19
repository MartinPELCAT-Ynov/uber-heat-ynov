import { createReadStream } from "fs";
import csv from "csv-parser";
import { ProductBuilderService } from "./ProductBuilderService";
import { Service } from "typedi";

@Service()
export class CsvImportService {
  constructor(private readonly productBuilderService: ProductBuilderService) {}

  async importCsvProduct(path: string): Promise<boolean> {
    console.log("Importing CSV");
    const results = [];

    return new Promise((res, rej) => {
      return createReadStream(path)
        .pipe(csv({ separator: ";" }))
        .on("data", (row) => {
          results.push(row);
        })
        .on("end", async () => {
          for (const row of results) {
            await this.productBuilderService.addProduct(row);
          }
          console.log("Import completed");
          res(true);
        })
        .on("error", (error) => {
          rej();
          console.log("Import Failed", error);
        });
    });
  }
}
