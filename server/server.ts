import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import next from "next";
import express from "express";
import { createConnection, useContainer } from "typeorm";
import Container from "typedi";
import AuthenticationResolver from "./src/resolvers/AuthenticationResolver";
import UserResolver from "./src/resolvers/UserResolver";
import RoomResolver from "./src/resolvers/RoomResolver";
import { seedsDataBase } from "./src/seeds";
import { authChecker } from "./src/utils/AutenticationChecker";
import cors from "cors";
import { ContextType } from "./src/types/ContextType";

const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();
useContainer(Container);
const PORT = 3000;

export const server = async () => {
  return nextApp.prepare().then(async () => {
    const app = express();

    /**
     * typeorm setup
     */

    await createConnection();

    console.info("Seeding database");
    await seedsDataBase();

    /**
     * Typegraphql setup
     */
    const schema = await buildSchema({
      resolvers: [UserResolver, AuthenticationResolver, RoomResolver],
      container: Container,
      authChecker,
    });

    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

    const apollo = new ApolloServer({
      schema,
      context: async ({ req, res }): Promise<ContextType> => {
        return { res, req };
      },
    });

    apollo.applyMiddleware({ path: "/api/gql", app, cors: true });
    app.all("*", (req, res) => {
      handler(req, res);
    }); // use page folder

    app.listen({ port: PORT }, () => {
      console.log(`🚀 http://localhost:${PORT}`);
      console.log(`🚀 http://localhost:${PORT}${apollo.graphqlPath}`);
      console.log(`🚀 ws://localhost:${PORT}${apollo.subscriptionsPath}`);
    });
  });
};
