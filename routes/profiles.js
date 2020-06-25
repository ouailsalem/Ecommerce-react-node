const express = require('express')
const router = express.Router()
const { Review, User, Profile } = require('../db/index');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

//!-------------------------------------------- Profile -------------------------------------- //
//------------------------------------------------GET------------------------------------------//
//?get MY_PROFILE
router.get('/', auth, async (req, res) => {
    try {
        let profile = await Profile
            .findOne({
                where: {
                    userId: req.user.id
                }
            });
        if(!profile) res.status(404).json({message:"Profile not found"})
        res.status(200).json(profile)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
})


//?get USER_PROFILE !admin
router.get('/:userId', adminAuth, async (req, res) => {

    try {
        let profile = await User.findOne({
            where: { id: req.params.userId }, attributes: { exclude: ['password', 'email'] }, include: [{ model: Profile }]
        })
        if(!profile) res.status(404).json({message:"Profile not found"})
        res.status(200).json(profile)

    } catch (err) {
        res.status(500).json({ erorr: "Something went wrong" })
    }
})

//!-------------------------------------------- Profile -------------------------------------- //
//----------------------------------------------UPDATE-----------------------------------------//

//?update MY_PROFILE 

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


module.exports = router