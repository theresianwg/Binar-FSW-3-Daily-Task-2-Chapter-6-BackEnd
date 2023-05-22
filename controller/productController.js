const { uploadToImagekit } = require("../lib/imagekit");
const { products } = require("../models");

async function getProducts(req, res) {
  try {
    const cars = await products.findAll();

    res.status(200).json({
      status: "success",
      cars,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const car = await products.findByPk(id);

    // validasi jika id tidak ditemukan
    if (car) {
      res.status(200).json({
        status: "success",
        car,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Id tidak terdaftar",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function editProduct(req, res) {
  const { name_and_type, detail, stock, amount, date } = req.body;
  const id = req.params.id;
  const findCar = await products.findByPk(id);
  const user = req.user.id;

  let updateImage = "";
  if (req.file === undefined) {
    updateImage = findCar.imageUrl;
  } else if (req.file) {
    if (req.file.size > 3000000) {
      res.status(400).json({
        status: "failed",
        message: "Ukuran image harus dibawah 3MB",
      });
    }
    const img = await uploadToImagekit(req);
    updateImage = img.url;
  }
  if (!findCar) {
    res.status(404).json({
      status: "failed",
      message: `Mobil dengan id ${id} tidak ditemukan`,
    });
  } else {
    try {
      await products.update({ userId: user, name_and_type, detail, stock, amount, imageUrl: updateImage, date }, { where: { id } });
      res.status(200).json({
        status: "success",
        message: `data dari id ${id} nya berhasil berubah`,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    await products.destroy({ where: { id } });

    res.status(200).json({
      status: "success",
      message: `data ${id} ini berhasil di hapus`,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function createProduct(req, res) {
  const { name_and_type, detail, stock, amount, date } = req.body;
  const user = req.user.id;
  if (
    (req.file === undefined && name_and_type === undefined && detail === undefined, stock === undefined, amount === undefined, date === undefined)
  ) {
    res.status(400).json({
      status: "failed",
      message: "Tolong input data yang sesuai",
    });
  } else {
    const img = await uploadToImagekit(req);
    try {
      const newProduct = await products.create({ userId: user, name_and_type, detail, stock, amount, imageUrl: img.url, date });
      res.status(201).json({
        status: "success",
        car: newProduct,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
  }
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
  createProduct,
};
