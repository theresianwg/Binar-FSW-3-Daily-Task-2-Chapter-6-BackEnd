const { product } = require('../models');

async function getProducts(req, res) {
    try {
        const products = await product.findAll();

        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function searchProduct(req, res) {
    try {
        const products = await product.findAll({
            where: {
                name: {
                    [Op.endsWith]: req.query.name
                }
            }
        })

        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getProductById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await product.findByPk(id);

        // validasi jika id tidak ditemukan
         if (data) {
            res.status(200).json({
                status: "success",
                data,
            });
        } else {
            res.status(404).json({
                status : "failed",
                message: "Id tidak terdaftar"
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function editProduct(req, res) {
    try {
        const { name } = req.body;
        const id = req.params.id;

        await product.update({
            name
        }, {
            where: { id }
        })

        res.status(200).json({
            status: 'success',
            message: `data dari id ${id} nya berhasil berubah`
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id
        await users.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            'status': 'success',
            'message': `data ${id} ini berhasil di hapus`
        })
    } catch (err) {
        res.status(400).message(err.message)
    }
}

async function createProduct(req, res) {
    try {
        const { name_and_type, detail, stock, amount, imageUrl, date } = req.body
        const newProduct = await product.create({
            name_and_type,
            detail,
            stock,
            amount,
            imageUrl,
            date
        })
        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getProducts,
    getProductById,
    searchProduct,
    deleteProduct,
    editProduct,
    createProduct,
}