const { products } = require("../models");
const { Op } = require('sequelize');

async function getProducts(req, res) {
  try {
    const data = await products.findAll();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function searchProduct(req, res) {
  try {
    const data = await products.findAll({
      where: {
        name_and_type: {
          [Op.endsWith]: req.query.name,
        },
      },
    });

    res.status(200).json({
      status: "success",
      data,
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
    const data = await products.findByPk(id);

    // validasi jika id tidak ditemukan
    if (data) {
      res.status(200).json({
        status: "success",
        data,
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
  try {
    const { name_and_type, detail, stock, amount } = req.body;
    const id = req.params.id;

    await products.update(
      {
        name_and_type,
        detail,
        stock,
        amount,
      },
      {
        where: { id },
      }
    );

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

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    await products.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `data ${id} ini berhasil di hapus`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name_and_type, detail, stock, amount, imageUrl, date } = req.body;
    const newProduct = await products.create({
      name_and_type,
      detail,
      stock,
      amount,
      imageUrl,
      date,
    });
    res.status(201).json({
      status: "success",
      data: {
        products: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  searchProduct,
  deleteProduct,
  editProduct,
  createProduct,
};
