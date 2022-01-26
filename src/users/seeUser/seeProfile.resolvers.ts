import { Resolvers, User } from "@src/types";

const resolvers: Resolvers = {
    Query: {
        seeProfile: (_: any, { username }: User, { client }) =>
            client.user.findUnique({
                where: { username },
            }),
    },
};
export default resolvers;
