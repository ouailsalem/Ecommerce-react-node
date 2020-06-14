const express = require('express')
const router = express.Router()
const Review = require('../models/Reviews');
const auth = require('../middlewares/auth');
const User = require('../models/Users');

//api/profile
//@myprofile
router.get('/', auth, async (req, res) => {
    try {
        let userProfile = await Profile
            .findOne({
                where: {
                    id: req.user.id
                }
            });
        res.status(200).json({ payload: userProfile })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})
router.get('/:userId', async (req, res) => {
    let userInfos = {}

    try {
        let details = await Profile
            .findOne({
                where: {
                    id: req.params.userId
                },
                attributes: { exclude: ['id'] }
            })
        if (!details) {
            res.status(404).json({ message: "profile not found" })
        } else {
            let account = await User
                .findOne({
                    where: {
                        id: req.params.userId
                    },
                    attributes: { exclude: ['password', 'email'] }
                })
            userInfos.account = account
            userInfos.details = details
            res.status(200).json({ payload: userInfos })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})
//@update profile
router.put('/update', auth, async (req, res) => {
    try {
        await Profile
            .update({
                wilaya: req.body.wilaya || "",
                dayra: req.body.dayra || "",
                phoneNumber: req.body.phoneNumber || ""
            }, {
                where: {
                    id: req.user.id
                }
            });
        res.status(200).json('profile updated')
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})
router.delete('/delete/:userId', auth, async (req, res) => {

    try {
        let user = await User.destroy({ where: { id: req.params.userId } })
        if (!user) res.status(404).json({ message: 'user not found' })
        try {
            await Review.destroy({ where: { userId: req.params.userId } })
        } catch (err) {
            console.log("revie error")
        }
        res.status(200).json({ message: 'deleted' })

    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
})
module.exports = router