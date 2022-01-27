import jwt from "jsonwebtoken";
import { User } from "@src/types";
import client from "@src/client";
import { Resolver } from "@src/types/resolvers";
import { Context } from "@src/types/context";

export const getUserByAuth = async (token: string) => {
    try {
        if (!token) return null;

        const { id } = jwt.verify(token, process.env.SECRET_KEY) as User;
        const user = await client.user.findUnique({ where: { id } });

        if (user) return user;
        else return null;
    } catch {
        return null;
    }
};

export const protectedResolver =
    (resolver: Resolver) =>
    (root: any, args: any, context: Context, info: any) => {
        if (!context.loggedInUser)
            return {
                ok: false,
                error: "로그인 후 이용할 수 있습니다.",
            };
        else return resolver(root, args, context, info);
    };
