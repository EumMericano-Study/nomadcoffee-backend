import { PrismaClient } from "@prisma/client";
import { User } from "./index";
export declare interface Context {
    loggedInUser: User;
    client: PrismaClient;
}
