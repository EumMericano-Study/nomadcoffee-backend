import * as bcrypt from "bcrypt";
import { Resolvers, User } from "@src/types";

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
                            error: "이미 사용중인 닉네임 입니다 ",
                        };
                    else
                        return {
                            ok: false,
                            error: "이미 사용중인 이메일 입니다 ",
                        };
                }
                //TODO 2: 비밀번호 변조 (hash=> password, saltRound)
                const modulatedPassword = await bcrypt.hash(password, 10);

                //TODO 3: 유저 정보 저장
                await client.user.create({
                    data: {
                        username,
                        email,
                        password: modulatedPassword,
                    },
                });
                return {
                    ok: true,
                };
            } catch (e) {
                return {
                    ok: false,
                    error: "계정을 생성할 수 없습니다.",
                };
            }
        },
    },
};

export default resolvers;
