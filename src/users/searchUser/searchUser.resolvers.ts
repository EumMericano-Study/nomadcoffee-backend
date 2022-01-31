import { Resolvers } from "@src/types";

interface Args {
  keyword: string;
}

const resolvers: Resolvers = {
  Query: {
    searchUsers: (_, { keyword }: Args, { client }) =>
      client.user.findMany({
        where: {
          username: { startsWith: keyword.toLowerCase() },
        },
      }),
  },
};

export default resolvers;
