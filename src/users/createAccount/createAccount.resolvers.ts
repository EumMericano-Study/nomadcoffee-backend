import * as bcrypt from "bcrypt";
import { Resolvers, User } from "@src/types";
import { ErrorMessage } from "@src/constants";

const resolvers: Resolvers = {
    Mutation: {
        createAccount: async (
            _,
            { username, email, password }: User,
            { client }
        ) => {
            try {
                //TODO 1: userName과 email이 DB에 존재하는지 확인하기
                const isExistUser = await client.user.findFirst({
                    where: { OR: [{ email }, { username }] },
                });

                if (isExistUser) {
                    if (isExistUser.username === username)
                        return {
                            ok: false,
                            error: ErrorMessage.USER_EXISTS,
                        };
                    else
                        return {
                            ok: false,
                            error: ErrorMessage.EMAIL_EXISTS,
                        };
                }
                //TODO 2: 비밀번호 변조 (hash=> password, saltRound)
                const hashedPassword = await bcrypt.hash(password, 10);

                //TODO 3: 유저 정보 저장
                await client.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                    },
                });
                return {
                    ok: true,
                };
            } catch (e) {
                return {
                    ok: false,
                    error: ErrorMessage.USER_CANT_CREATE,
                };
            }
        },
    },
};

export default resolvers;
