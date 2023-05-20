const ImageKit = require("imagekit")

var imagekit = new ImageKit({
    publicKey: "public_m3Acb7Pgdt0zpysGRH2eA91pHaM=",
    urlEndpoint: "https://ik.imagekit.io/tinpet",
    privateKey: "private_i9Rkbg/42Rj+M+rSzro1RLbyk/s=",
});

module.exports = imagekit;