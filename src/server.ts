require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import client from "@src/client";
import { typeDefs, resolvers } from "@src/schema";

const PORT = process.env.PORT;

const startServer = async () => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: async () => {
            return { client };
        },
    });

    await apollo.start();
    const app = express();
    apollo.applyMiddleware({ app });
    app.listen({ port: PORT }, () => {
        console.log(
            `🚀 Server is running on http://localhost:${PORT}${apollo.graphqlPath} 🚀`
        );
    });
};

startServer();
