import { ErrorMessage } from "@src/constants";
import { Resolvers, CoffeeShop } from "@src/types";
import { protectedResolver } from "@src/users/user.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteCoffeeShop: protectedResolver(
      async (_, { id }: CoffeeShop, { loggedInUser, client }) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!coffeeShop)
          return { ok: false, error: ErrorMessage.COFFEE_SHOP_NOT_FOUND };
        else if (coffeeShop.userId !== loggedInUser.id)
          return {
            ok: false,
            error: ErrorMessage.NOT_AUTHORIZED,
          };
        else {
          await client.coffeeShop.delete({ where: { id } });
          return { ok: true };
        }
      }
    ),
  },
};

export default resolver;
