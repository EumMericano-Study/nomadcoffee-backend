import { Resolvers, User } from "@src/types";

const resolver: Resolvers = {
  User: {
    totalFollowing: ({ id }: User, _, { client }) =>
      client.user.count({
        where: {
          followers: { some: { id } },
        },
      }),

    totalFollowers: ({ id }: User, _, { client }) =>
      client.user.count({
        where: {
          following: { some: { id } },
        },
      }),
  },
};

export default resolver;
