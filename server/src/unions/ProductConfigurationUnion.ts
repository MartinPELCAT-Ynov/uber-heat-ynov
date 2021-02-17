import { CircProductConfiguration } from "@entity/CircProductConfiguration";
import { RectProductConfiguration } from "@entity/RectProductConfiguration";
import { createUnionType } from "type-graphql";

export const ProductConfigurationUnion = createUnionType({
  name: "ProductConfigurationUnion",
  types: () => [CircProductConfiguration, RectProductConfiguration] as const,
});

export type ProductConfigurationUnionType =
  | CircProductConfiguration
  | RectProductConfiguration;
