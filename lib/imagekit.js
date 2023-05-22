const ImageKit = require("imagekit");

let imagekit = new ImageKit({
  publicKey: "public_9716KYwYSxczBvuHREOIBJa8yxU=",
  urlEndpoint: "https://ik.imagekit.io/publicurl",
  privateKey: "private_uXtESVIH74uOM3/7D23LdlqRsfs=",
});

const uploadToImagekit = async (request) => {
  const file = request.file;
  const split = file.originalname.split(".");
  const ext = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG_${Date.now()}.${ext}`,
  });
  return img;
};

module.exports = { uploadToImagekit };
