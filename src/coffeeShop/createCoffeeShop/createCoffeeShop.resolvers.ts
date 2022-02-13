import { Resolvers, CoffeeShop, Upload } from "@src/types";
import { ErrorMessage } from "@src/constants";
import { protectedResolver } from "@src/users/user.utils";

import imageMapper from "../coffee.utils";

interface Args extends CoffeeShop {
  categories: string[];
  images: Promise<Upload>[];
}

const resolver: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories, images }: Args,
        { loggedInUser, client }
      ) => {
        try {
          let imageUrlObjs = [];
          let categoryObjs = [];
          if (categories.length > 0)
            categoryObjs = categories.map((category) => ({
              where: { name: category },
              create: { name: category },
            }));

          if (images.length > 0) {
            imageUrlObjs = await Promise.all(
              images
                .filter((image) => image !== null)
                .map(async (image) => {
                  const asyncImage = await image;
                  if (asyncImage) return imageMapper(asyncImage);
                })
            );
          }

          const isExistCoffeeShop = await client.coffeeShop.findFirst({
            where: { name },
            select: { id: true },
          });

          if (isExistCoffeeShop)
            return {
              ok: false,
              error: ErrorMessage.COFFEE_SHOP_EXISTS,
            };

          await client.coffeeShop.create({
            data: {
              name,
              ...(longitude && { longitude }),
              ...(latitude && { latitude }),
              user: {
                connect: { id: loggedInUser.id },
              },
              ...(categoryObjs.length > 0 && {
                categories: { connectOrCreate: categoryObjs },
              }),
              ...(imageUrlObjs.length > 0 && {
                photos: { connectOrCreate: imageUrlObjs },
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
