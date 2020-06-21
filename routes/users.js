const express = require('express')
const router = express.Router()
const { User } = require('../db/index')
const { Profile } = require('../db/index')
const uniqid = require('uniqid');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const validator = require('../middlewares/validator');
const adminAuth = require('../middlewares/adminAuth');
const { Review } = require('../db/index');

require('dotenv').config()
//register user
router.post('/register', validator, async (req, res) => {

    try {
        const user = {
            id: uniqid(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            time: new Date().toISOString()
        }

        const { id, email, password, time, name } = user

        let checkingUserEmail = await User.findOne({ where: { email } })
        let checkingUserName = await User.findOne({ where: { name } })

        if (checkingUserEmail) res.status(400).json({ message: 'email already in use' })
        if (checkingUserName) res.status(400).json({ message: 'username already in use' })

        try {
            let salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(password, salt)

            await User
                .create({
                    id,
                    email,
                    password: hash,
                    time,
                    name
                })
            const payload = {
                user: {
                    id,
                    email,
                }
            }
            await Profile
                .create({
                    id: uniqid(),
                    wilaya: "",
                    dayra: "",
                    phoneNumber: "",
                    userId: id
                })
            jwt.sign(payload, process.env.JWT_SEC, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token: "Bearer " + token })
            })



        } catch (err) {
            console.error(err)
            res.status(500).json({ message: ' something went wrong ' })
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'something went wrong' })
    }


})

// post
// login user
router.post('/login', async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        }
        const { email, password } = user
        let loadedUser = await User.findOne({ where: { email } })
        if (!loadedUser) {
            res.status(400).json({ message: "invalid credentiels" })
        }
        bcrypt.compare(password, loadedUser.dataValues.password, function (err, response) {
            if (err) res.status(500).json({ message: "server error" })
            if (!response) res.status(400).json({ message: "invalid credentiels" })
            const payload = {
                user: {
                    id: loadedUser.id,
                    email: loadedUser.email,
                }
            }

            jwt.sign(payload, process.env.JWT_SEC, { expiresIn: 36000 }, (err, token) => {
                if (err) {
                    res.status(400).json({ message: "invalid credentiels" })
                }
                res.status(200).json({ token: "Bearer " + token })
            })

        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }
})


// !admin
//api/users/
//get all users
router.get('/', async (req, res) => {
    try {
        let users = await User.findAll({ attributes: { exclude: ['password'] }, include: [{ model: Profile }] })
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})


// !admin
//api/users/:userId
//get single user with profile
router.get('/:userId', async (req, res) => {
    try {
        let user = await User.findOne({
            where: { id: req.params.userId }, attributes: { exclude: ['password'] }, include: [{ model: Profile }]
        }
        )

        if (user) {
            res.status(200).json(user)
        }
        res.status(404).json({ message: 'user not found' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'something went wrongs' })
    }

})
// !admin
//api/users/:userId
//update user

router.put('/:userId', adminAuth, async (req, res) => {

    try {
        await User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            money: req.body.money
        }, {
            where: {
                id: req.params.userId
            }
        })
        res.status(200).json({ message: 'User details updated' })
    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})



// !admin
//api/users/:userId
//destroy user

router.delete('/:userId', async (req, res) => {
    try {
        await User.destroy({
            where: { id: req.params.userId }
        })

        res.status(200).json({ message: "user deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'something went wrongs' })
    }

})


module.exports = router