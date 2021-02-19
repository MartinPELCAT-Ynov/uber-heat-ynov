import { CircProductConfiguration } from "../entity/CircProductConfiguration";
import { Product } from "../entity/Product";
import { RectProductConfiguration } from "../entity/RectProductConfiguration";
import { CreateProductInput } from "../inputs/ProductInput";
import { GraphQLUpload } from "apollo-server-express";
import { join } from "path";
import { createWriteStream } from "fs";

import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { FileScalar, FileType } from "../scalars/FileScalar";
import { ProductConfigurationUnion } from "../unions/ProductConfigurationUnion";
import { CsvImportService } from "../services/CsvImportService";

@Service()
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly csvImportService: CsvImportService) {}

  @Query(() => [Product])
  async products() {
    return Product.find();
  }

  @FieldResolver(() => [ProductConfigurationUnion])
  async configurations(@Root() { id }: Product) {
    const circProducts = await CircProductConfiguration.find({
      where: { product: id },
    });
    const rectProducts = await RectProductConfiguration.find({
      where: { product: id },
    });
    return [...circProducts, ...rectProducts];
  }

  @Mutation(() => Product)
  async addProduct(
    @Arg("data")
    { basePrice, name, ...rest }: CreateProductInput
  ) {
    console.log(basePrice, rest, name);

    return Product.findOne();
  }

  @Mutation(() => FileScalar)
  async importProductsFromCsv(
    @Arg("file", () => GraphQLUpload) file: Promise<FileType>
  ) {
    const { createReadStream, filename } = await file;
    const path = join(__dirname, "../../upload/", filename);
    const stream = createReadStream();
    await new Promise((res, rej) => {
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => res(true))
        .on("error", rej);
    });

    await this.csvImportService.importCsvProduct(path);
    return file;
  }
}
