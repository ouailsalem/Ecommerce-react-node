const express = require('express')
const router = express.Router()
const { Review } = require('../db/index');
const uniqid = require('uniqid');
const auth = require('../middlewares/auth');
const { User } = require('../db/index')
const adminAuth = require('../middlewares/adminAuth');

//!admin
//api/reviews/
router.get('/', adminAuth,async (req, res) => {
    try {
        let reviews = await Review.findAll()
        if(!reviews) res.status(404).json({message:"no reviews found"})
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })

    }
})
//!admin
//api/reviews/reviewId

router.get('/:reviewId', adminAuth, async (req, res) => {
    try {
        let review = await Review.findOne({ where: { id: req.params.reviewId } })
        if (!review) res.status(404).json({ message: "no review found with this id" })
        res.status(200).json(review)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "something went wrong" })

    }
})
//api/reviews/product/:productId
// get a post reviews
router.get('/product/:productId', async (req, res) => {
    try {
        let reviews = await Review.findAll({ where: { productId: req.params.productId } })
        res.status(200).json(reviews)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "something went wrong" })

    }
})

//!admin
//api/reviews/:reviewId
// delete a review
router.delete('/:reviewId', adminAuth, async (req, res) => {
    try {
        await Review.destroy({
            where: { id: req.params.reviewId }
        })
        res.status(200).json({ message: 'review deleted' })

    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})
//api/reviews/myReviews

router.get('/myreviews', auth, async (req, res) => {
    try {
        let reviews = await Review.findAll({ where: { userId: req.user.id } })
        res.status(200).json({ payload: reviews })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })

    }
})
//api/reviews/:postId
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


        //TODO: validate if there's a post
        const { id, userId, productId, review, rating, time } = formReview
        let user = await User.findOne({ where: { id: userId }, attributes: ['name'], })
        let reviewPosted = await Review.create({
            name: user.name,
            id,
            userId,
            productId,
            review,
            rating,
            time
        })
        //TODO: remove payload
        res.status(200).json({ payload: reviewPosted })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }

})

module.exports = router