import { FieldResolver, Resolver, Root } from "type-graphql";
import { Result } from "../entity/Result";
import { ProductConfigurationUnion } from "../unions/ProductConfigurationUnion";

@Resolver(() => Result)
export class ResulResolver {
  @FieldResolver(() => ProductConfigurationUnion)
  async configurations(@Root() { id }: Result) {
    console.log(id);

    return null;
  }
}
