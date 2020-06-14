const express = require('express')
const router = express.Router()
const Review = require('../models/Reviews')
const uniqid = require('uniqid');
const auth = require('../middlewares/auth');
const User = require('../models/Users');


//api/Reviews
router.get('/', async (req, res) => {
    try {
        let reviews = await Review.findAll()
        res.status(200).json(reviews)
    } catch (error) {

    }
})
router.post('/:productId', auth, async (req, res) => {

    try {
        const formReview = {
            id: uniqid(),
            userId: req.user.id,
            productId: req.params.productId,
            review: req.body.review,
            rating: req.body.rating,
            time: new Date().toISOString()
        }
        const { id, userId, productId, review, rating, time } = formReview
        let us = await User.findOne({ where: { id: req.user.id }, attributes: ['name'], })
        console.log(us.name)
        let reviewPosted = await Review.create({
            name: us.name,
            id,
            userId,
            productId,
            review,
            rating,
            time
        })
        res.status(200).json({ payload: reviewPosted })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }

})

module.exports = router