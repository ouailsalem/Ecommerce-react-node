const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const { User } = require('../db/index')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ['password'] } })
        if (user) res.status(200).json({ user: user })
        res.status(400).json({ messsage: "invalid token" })

    } catch (err) {
        res.status(500).json({ message: 'sever errror' })

    }
})

module.exports = router