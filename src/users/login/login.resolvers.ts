import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers, User } from "@src/types";
import { ErrorMessage } from "@src/constants";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }: User, { client }) => {
      try {
        // find user with args
        const user = await client.user.findFirst({
          where: { username },
        });
        if (!user)
          return {
            ok: false,
            error: ErrorMessage.USER_NOT_FOUND,
          };

        // check password with args.password
        const isConsistent = await bcrypt.compare(password, user.password);
        if (!isConsistent)
          return {
            ok: false,
            error: ErrorMessage.USER_NOT_FOUND,
          };

        // issue token ans send it to the user
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (e) {
        return {
          ok: false,
          error: ErrorMessage.CANT_LOGIN,
        };
      }
    },
  },
};

export default resolvers;
