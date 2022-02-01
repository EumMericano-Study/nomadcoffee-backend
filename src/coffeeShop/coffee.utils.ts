import { createWriteStream } from "fs";
import { Upload } from "@src/types";

const imageMapper = (image: Upload, userId: number) => {
  const { filename, createReadStream } = image;

  const readStream = createReadStream();

  const newFileName = `${userId}${Date.now()}${filename}`;
  const writeStream = createWriteStream(
    process.cwd() + "/src/uploads/images/" + newFileName
  );
  readStream.pipe(writeStream);
  const url = `http://localhost:4000/static/${newFileName}`;

  return {
    where: { url: url },
    create: { url: url },
  };
};

export default imageMapper;
