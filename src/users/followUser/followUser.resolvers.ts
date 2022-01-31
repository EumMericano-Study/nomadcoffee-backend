import { Resolvers, User } from "@src/types";
import { protectedResolver } from "@src/users/user.utils";
import { ErrorMessage } from "@src/constants";

const resolver: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }: User, { loggedInUser, client }) => {
        try {
          const isUserExists = await client.user.findUnique({
            where: { username },
            select: { id: true },
          });
          if (!isUserExists)
            return {
              ok: false,
              error: ErrorMessage.USER_NOT_FOUND,
            };
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: {
                connect: { username },
              },
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
