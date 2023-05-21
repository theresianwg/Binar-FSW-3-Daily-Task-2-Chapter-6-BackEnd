const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsers(req, res) {
    try {
        const data = await users.findAll();

        res.status(200).json({
            status: 'success',
            message: 'berikut data yang ditampilkan',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const data = await users.findByPk(id, {
            include: {
                model: shops,
                attributes: ['name']
            }
        });

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

async function editUser(req, res) {
    try {
        const { username } = req.body;
        const id = req.params.id;

        await users.update({
            username
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

async function deleteUser(req, res) {
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

// validasi done
async function login(req, res) {
    try {
        const { username, password } = req.body

        // cari user berdasarkan username
        const user = await users.findOne({
            where: {
                username
            }
        })

        // validasi kalau user nya gk ada
        if (!user) {
            res.status(404).json({
                status: 'failed',
                message: `user ${username} tidak ditemukan`
            })
        }
        
        // check password dari request body sesuai gak sama hashed password dari database 
        if(user && bcrypt.compareSync(password, user.password)) {

            // generate TOKEN utk user 
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            }, 'rahasia')

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    token
                }
            })
        }        
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    editUser,
    login,
}