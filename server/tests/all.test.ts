import "reflect-metadata";
import { getConnection } from "typeorm";
import { User } from "../src/entity/User";
import { join } from "path";
import { CsvImportService } from "../src/services/CsvImportService";
import { ProductBuilderService } from "../src/services/ProductBuilderService";
import {
  SignInMutation,
  SignInMutationVariables,
  SignInDocument,
} from "../../apollo/__generated__";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { server } from "../server";

beforeAll(async () => {
  await server();
}, 30000);

afterAll(async () => {
  await getConnection().close();
});

test("check database connection", async () => {
  const connect = getConnection();
  expect(connect.isConnected).toBe(true);
});

test("has user seeded", async () => {
  const EMAIL = "martin.pelcat@ynov.com";
  const user = await User.findOne({
    where: {
      email: EMAIL,
    },
  });

  expect(user.email).toBe(EMAIL);
});

test("Test import file", async () => {
  const path = join(__dirname, "../upload/products.csv");
  const service = new CsvImportService(new ProductBuilderService());
  const test = await service.importCsvProduct(path);
  expect(test).toBe(true);
}, 30000);

test("Test login", async () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/gql",
    cache: new InMemoryCache(),
  });

  const EMAIL = "martin.pelcat@ynov.com";
  const { data } = await client.mutate<SignInMutation, SignInMutationVariables>(
    {
      variables: {
        inputs: { email: EMAIL, password: "hophop" },
      },
      mutation: SignInDocument,
    }
  );

  expect(data.signIn.email).toBe(EMAIL);
}, 30000);
