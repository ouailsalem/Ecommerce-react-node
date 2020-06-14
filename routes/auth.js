const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/Users')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ['password'] } })
        res.status(200).json({ user: user })
    } catch (err) {
        res.status(500).json({ message: 'sever errror' })

    }
})

module.exports = router