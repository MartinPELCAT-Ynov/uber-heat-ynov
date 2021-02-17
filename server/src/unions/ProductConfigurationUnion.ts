import { CircProductConfiguration } from "@entity/CircProductConfiguration";
import { RectProductConfiguration } from "@entity/RectProductConfiguration";
import { createUnionType } from "type-graphql";

export const ProductConfigurationUnion = createUnionType({
  name: "ProductConfigurationUnion",
  types: () => [CircProductConfiguration, RectProductConfiguration] as const,
  resolveType: (value) => {
    if ("diameter" in value) {
      return CircProductConfiguration;
    }
    if ("width" in value) {
      return RectProductConfiguration;
    }
    return undefined;
  },
});

export type ProductConfigurationUnionType =
  | CircProductConfiguration
  | RectProductConfiguration;
