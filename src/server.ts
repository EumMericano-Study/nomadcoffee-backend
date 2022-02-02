require("dotenv").config();
import { ApolloServer, Config, ExpressContext } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";

import client from "@src/client";
import { typeDefs, resolvers } from "@src/schema";
import { getUserByAuth, protectedResolver } from "@src/users/user.utils";

const PORT = process.env.PORT;

const startServer = async () => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        introspection: true,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUserByAuth(req.headers.authorization),
                protectedResolver,
                client,
            };
        },
    } as Config<ExpressContext>);

    await apollo.start();

    const app = express();

    app.use(logger("tiny"));
    app.use(graphqlUploadExpress());
    apollo.applyMiddleware({ app });

    app.use("/static", express.static("src/uploads/images"));

    app.listen({ port: PORT }, () => {
        console.log(
            `🚀 Server is running on http://localhost:${PORT}${apollo.graphqlPath} 🌞`
        );
    });
};

startServer();
