import { Upload } from "@src/types";
import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

interface UploadImageArgs {
  image: Upload;
  fileName?: string;
}

export const changeImageToUrl = async ({
  image,
  fileName,
}: UploadImageArgs) => {
  const { filename, createReadStream } = image;
  const readStream = createReadStream();

  const ranStr = `${Math.random()
    .toString(36)
    .substring(2, 11)}-${Date.now().toString(36)}`;
  const Key = `${fileName}/${ranStr}-${filename}`;

  const upload = await new AWS.S3()
    .upload({
      Bucket: "nomad-sexy-coffee",
      Key,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return upload.Location;
};
