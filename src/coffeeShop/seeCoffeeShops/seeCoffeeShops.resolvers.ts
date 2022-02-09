import { PageSize } from "@src/constants";
import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/user.utils";

interface Args {
  lastId: number;
}

const resolver: Resolvers = {
  Query: {
    seeCoffeeShops: protectedResolver(
      (_, { lastId }: Args, { loggedInUser, client }) =>
        client.coffeeShop.findMany({
          where: { userId: loggedInUser.id },
          take: PageSize.COFFEE_SHOP,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        })
    ),
  },
};

export default resolver;
