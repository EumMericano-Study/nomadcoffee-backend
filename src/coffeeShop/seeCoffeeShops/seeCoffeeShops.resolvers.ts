import { PageSize } from "@src/constants";
import { Resolvers } from "@src/types";

interface Args {
  keyword: string;
  lastId: number;
}

const resolver: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { keyword, lastId }: Args, { client }) =>
      client.coffeeShop.findMany({
        where: { name: { startsWith: keyword } },
        take: PageSize.COFFEE_SHOP,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolver;
