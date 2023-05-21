const { users, shops } = require('../models');
// import bcrypt untuk authentication
const bcrypt = require('bcrypt');
// import jsonwebtoken sbg authorization
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
        // Primary Key = PK
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

// validasi 
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
async function createUser(req, res) {
    try {
        const { username, password } = req.body
        
        // bajuin password nya pake bcrypt / proses enkripsi password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // validasi untuk nama unik
        const notAvailable = await users.findOne({
            where: {
                username
            }
        })

        
        if(notAvailable){
            res.status(400).json({
                status: "failed",
                message: `Data dengan username ${username} telah digunakan`
            })
        }

        const newUser = await users.create({
            username,
            password : hashedPassword,
            role: req.body.role
        })
         // validasi password minimal 8 karakter, tp data masih masuk
         if (password.length >= 8) {
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
                }
            });
        }
        else {
            res.status(404).json({
                status: 'failed',
                message: `Password harus memiliki minimal 8 karakter`
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
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
    createUser,
    login,
}