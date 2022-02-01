import { Resolvers, Category } from "@src/types";

const resolver: Resolvers = {
  Query: {
    seeCategory: (_, { name }: Category, { client }) =>
      client.category.findUnique({ where: { name } }),
  },
};

export default resolver;
