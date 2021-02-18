import { CircProductConfiguration } from "@entity/CircProductConfiguration";
import { Product } from "@entity/Product";
import { RectProductConfiguration } from "@entity/RectProductConfiguration";
import { getRepository } from "typeorm";

type ProductType = "Rectangulaire" | "Circulaire";

type CSVRowType = {
  Type: ProductType;
  Article: string;
  Largeur: string;
  Hauteur: string;
  Epaisseur: string;
  Profondeur: string;
  Diametre: string;
  "10m": string;
  "5m": string;
  "2m": string;
  "1m": string;
};

const csvParseNumber = (value: string) => {
  return parseFloat(value.replace(/,/, "."));
};

export class ProductBuilderService {
  async addProduct(csvRow: CSVRowType) {
    const product = await Product.findOne({
      where: { name: csvRow.Article },
    });

    if (!product) return await this.createnewProduct(csvRow);
    return await this.addConfigToProduct(csvRow, product);
  }

  async createnewProduct(csvRow: CSVRowType) {
    const productRepo = getRepository(Product);
    const product = productRepo.create({
      basePrice: 600,
      name: csvRow.Article,
    });

    const insertedProduct = await productRepo.save(product);

    await this.addConfigToProduct(csvRow, insertedProduct);
  }

  async addConfigToProduct(csvRow: CSVRowType, product: Product) {
    switch (csvRow.Type) {
      case "Circulaire":
        await this.createCircleConfig(csvRow, product);
        break;

      case "Rectangulaire":
        await this.createRectConfig(csvRow, product);

        break;
      default:
        break;
    }
  }

  async createCircleConfig(csvRow: CSVRowType, product: Product) {
    const productConfig = getRepository(CircProductConfiguration);

    const circ = productConfig.create({
      db10: csvParseNumber(csvRow["10m"]),
      db1: csvParseNumber(csvRow["1m"]),
      db2: csvParseNumber(csvRow["2m"]),
      db5: csvParseNumber(csvRow["5m"]),
      depth: csvParseNumber(csvRow.Profondeur),
      diameter: csvParseNumber(csvRow.Diametre),
      product: product.id as unknown,
    });
    await productConfig.save(circ);
  }

  async createRectConfig(csvRow: CSVRowType, product: Product) {
    const productConfig = getRepository(RectProductConfiguration);

    const rect = productConfig.create({
      db10: csvParseNumber(csvRow["10m"]),
      db1: csvParseNumber(csvRow["1m"]),
      db2: csvParseNumber(csvRow["2m"]),
      db5: csvParseNumber(csvRow["5m"]),
      depth: csvParseNumber(csvRow.Profondeur),
      height: csvParseNumber(csvRow.Hauteur),
      width: csvParseNumber(csvRow.Largeur),
      thickness: csvParseNumber(csvRow.Epaisseur),
      product: product.id as unknown,
    });
    await productConfig.save(rect);
  }
}
