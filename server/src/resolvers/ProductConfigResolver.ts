import { ProductConfiguration } from "@entity/ProductConfiguration";
import { Resolver } from "type-graphql";
import { Service } from "typedi";

@Service()
@Resolver(() => ProductConfiguration)
export class ProductConfigResolver {}
