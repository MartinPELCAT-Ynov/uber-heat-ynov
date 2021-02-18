import { CircProductConfiguration } from "@entity/CircProductConfiguration";
import { Product } from "@entity/Product";
import { RectProductConfiguration } from "@entity/RectProductConfiguration";
import { CreateProductInput } from "@input/ProductInput";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { ProductConfigurationUnion } from "../unions/ProductConfigurationUnion";

@Service()
@Resolver(() => Product)
export class ProductResolver {
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
}
