import { PageSize } from "@src/constants";
import { Resolvers } from "@src/types";

interface Args {
  keyword: string;
  lastId: number;
}

const resolver: Resolvers = {
  Query: {
    seeCategories: (_, { keyword, lastId }: Args, { client }) =>
      client.category.findMany({
        where: { name: { startsWith: keyword } },
        take: PageSize.CATEGORIES,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolver;
