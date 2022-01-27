import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { protectedResolver } from "@src/users/user.utils";
import { Resolvers, Upload } from "@src/types";
import { Resolver } from "@src/types/resolvers";

const resolverFn: Resolver = async (
    _,
    { username, email, name, location, password, avatarURL, githubUsername },
    { loggedInUser, client }
) => {
    const { filename, createReadStream } = (await avatarURL) as Upload;
    let avatarTempUrl = null;
    if (avatarURL) {
        const readStream = createReadStream();

        const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const writeStream = createWriteStream(
            process.cwd() + "/src/uploads/images/" + newFileName
        );
        readStream.pipe(writeStream);
        avatarTempUrl = `http://localhost:4000/static/${newFileName}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
            username,
            email,
            name,
            location,
            ...(avatarURL && { avatarURL: avatarTempUrl }),
            githubUsername,
            ...(hashedPassword && { password: hashedPassword }),
        },
    });

    if (updatedUser.id)
        return {
            ok: true,
        };
    else
        return {
            ok: false,
            error: "프로필을 업데이트 할 수 없습니다.",
        };
};

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectedResolver(resolverFn),
    },
};

export default resolvers;
