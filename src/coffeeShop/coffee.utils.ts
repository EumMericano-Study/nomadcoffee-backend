import { createWriteStream } from "fs";
import { Upload } from "@src/types";

const changeImageToUrl = (image: Upload) => {
  const { filename, createReadStream } = image;
  const readStream = createReadStream();

  const newFileName = `${Math.random()
    .toString(36)
    .substring(2, 11)}-${Date.now()}-${filename}`;

  const writeStream = createWriteStream(
    process.cwd() + "/src/uploads/images/" + newFileName
  );
  readStream.pipe(writeStream);

  return `http://localhost:4000/static/${newFileName}`;
};

const imageMapper = (image: Upload) => {
  const url = changeImageToUrl(image);

  return {
    where: { url: url },
    create: { url: url },
  };
};

export default imageMapper;
