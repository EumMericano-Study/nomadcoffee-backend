import { Resolvers, User } from "@src/types";
import { PageSize } from "@src/constants";

interface Args extends User {
  lastId: number;
}

const resolvers: Resolvers = {
  Query: {
    seeUser: (_, { username, lastId }: Args, { client }) =>
      client.user.findUnique({
        where: { username },
        include: {
          followers: {
            take: PageSize.FOLLOW,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { username } }),
          },
          following: {
            take: PageSize.FOLLOW,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { username } }),
          },
        },
      }),
  },
};
export default resolvers;
