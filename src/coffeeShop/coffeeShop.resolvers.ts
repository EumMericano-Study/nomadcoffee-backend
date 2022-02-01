import { Resolvers, CoffeeShop, Category } from "@src/types";
import { PageSize } from "@src/constants";

const resolver: Resolvers = {
  CoffeeShop: {
    user: ({ id }: CoffeeShop, _, { client }) =>
      client.coffeeShop.findUnique({ where: { id } }).user(),
    photos: ({ id }: CoffeeShop, _, { client }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .photos(),
  },
  Category: {
    shops: ({ id }: Category, { lastId }: { lastId: number }, { client }) =>
      client.category.findUnique({ where: { id } }).shops({
        take: PageSize.COFFEE_SHOP,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    totalShops: ({ id }: Category, _, { client }) =>
      client.coffeeShop.count({
        where: {
          categories: { some: { id } },
        },
      }),
  },
};

export default resolver;
