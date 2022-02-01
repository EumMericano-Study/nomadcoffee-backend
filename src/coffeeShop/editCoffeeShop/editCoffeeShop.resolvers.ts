import { Resolvers, CoffeeShop } from "@src/types";
import { ErrorMessage } from "@src/constants";
import { protectedResolver } from "@src/users/user.utils";

interface Args extends CoffeeShop {
  categories: string[];
}

const resolver: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories }: Args,
        { loggedInUser, client }
      ) => {
        try {
          let categoryObjs = [];
          if (categories.length > 0)
            categoryObjs = categories.map((category) => ({
              where: { name: category },
              create: { name: category },
            }));

          const existCoffeeShop = await client.coffeeShop.findUnique({
            where: { id },
            include: {
              photos: { select: { url: true } },
              categories: { select: { name: true } },
            },
          });

          if (existCoffeeShop && existCoffeeShop.userId !== loggedInUser.id)
            return {
              ok: false,
              error: ErrorMessage.NOT_AUTHORIZED,
            };

          await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              longitude,
              latitude,
              ...(categoryObjs.length > 0 && {
                categories: {
                  disconnect: existCoffeeShop.categories,
                  connectOrCreate: categoryObjs,
                },
              }),
            },
          });
          return { ok: true };
        } catch {
          return {
            ok: false,
            error: ErrorMessage.SERVER_ERROR,
          };
        }
      }
    ),
  },
};

export default resolver;
