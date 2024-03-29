import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import next from "next";
import express from "express";
import { createConnection, useContainer } from "typeorm";
import Container from "typedi";
import {
  AuthenticationResolver,
  ProductResolver,
  UserResolver,
  ResulResolver,
} from "./src/resolvers";
import { seedsDataBase } from "./src/seeds";
import { authChecker } from "./src/utils/AuthorizedChecker";
import cors from "cors";
import session from "express-session";
import { CONFIG } from "./config";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cookieParser from "cookie-parser";

const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();
useContainer(Container);
const PORT = 3000;

const RedisStore = connectRedis(session);

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
      resolvers: [
        AuthenticationResolver,
        UserResolver,
        ProductResolver,
        ResulResolver,
      ],
      container: Container,
      authChecker,
    });

    app.use(cookieParser());
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    // app.set("trust proxy", 1); // trust first proxy

    app.use(
      session({
        store: new RedisStore({ client: new Redis() }),
        secret: CONFIG.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 4.32e8,
          sameSite: true,
        },
      })
    );

    const apollo = new ApolloServer({
      schema,
      playground: {
        settings: {
          "request.credentials": "same-origin",
          "editor.theme": "light",
        },
      }, // to test with cookie in playground
      formatError: (error) => ({ message: error.message }),
      context: async ({ req, res }) => ({ res, req }),
    });
    apollo.applyMiddleware({ path: "/api/gql", app, cors: false });

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
