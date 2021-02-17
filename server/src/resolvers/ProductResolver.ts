import { Product } from "@entity/Product";
import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";

@Service()
@Resolver(() => Product)
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    return Product.find();
  }
}
