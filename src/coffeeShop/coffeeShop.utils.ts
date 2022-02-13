import { Upload } from "@src/types";
import { changeImageToUrl } from "@src/uploads/uploads.utils";

export const imageMapper = async (image: Upload) => {
  const url = await changeImageToUrl({ image, fileName: "shops" });

  return {
    where: { url },
    create: { url },
  };
};
