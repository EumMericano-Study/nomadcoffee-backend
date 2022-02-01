import { Resolvers, CoffeeShop } from "@src/types";

const resolver: Resolvers = {
  Query: {
    seeCoffeeShop: (_, { id }: CoffeeShop, { client }) =>
      client.coffeeShop.findUnique({ where: { id } }),
  },
};

export default resolver;
