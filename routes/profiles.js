const express = require('express')
const router = express.Router()
const { Review, User, Profile } = require('../db/index');
const auth = require('../middlewares/auth');


//api/profile
//@get myprofile
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
        res.status(500).json({ error: err })
    }
})

//api/profile/:userId
//@get user Profile
router.get('/:userId', async (req, res) => {

    try {
        let profile = await User.findOne({
            where: { id: req.params.userId }, attributes: { exclude: ['password', 'email'] }, include: [{ model: Profile, attributes: { exclude: ['phoneNumber', 'dayra', 'userId'] } }]
        })
        res.status(200).json(profile)

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// /profile/update
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
        res.status(500).json({ error: err })
    }
})

// delete account @TODO:
router.delete('/delete/:userId', auth, async (req, res) => {

    try {
        let user = await User.destroy({ where: { id: req.params.userId } })
        if (!user) res.status(404).json({ message: 'user not found' })
        try {
            await Review.destroy({ where: { userId: req.params.userId } })
        } catch (err) {
            console.log("review error")
        }
        res.status(200).json({ message: 'deleted' })

    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
})
module.exports = router