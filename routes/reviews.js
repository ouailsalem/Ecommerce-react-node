const express = require('express')
const router = express.Router()
const { Review, Product } = require('../db/index');
const uniqid = require('uniqid');
const auth = require('../middlewares/auth');
const { User } = require('../db/index')
const adminAuth = require('../middlewares/adminAuth');

//!-------------------------------------------- Profile -------------------------------------- //
//------------------------------------------------GET------------------------------------------//
//?get ALL_REVIEWS !admin

router.get('/', adminAuth, async (req, res) => {
    try {
        let reviews = await Review.findAll()
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
})
//!admin
//api/reviews/reviewId
//?get SINGLE_REVIEW !admin
router.get('/:reviewId', adminAuth, async (req, res) => {
    try {
        let review = await Review.findOne({ where: { id: req.params.reviewId } })
        if (!review) res.status(404).json({ message: "Review not found" })
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
})

//?get POST_REVIEWS !admin
router.get('/product/:productId', async (req, res) => {
    try {
        let reviews = await Review.findAll({ where: { productId: req.params.productId } })
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })

    }
})

//!-------------------------------------------- Profile -------------------------------------- //
//----------------------------------------------DELETE-----------------------------------------//
//?delete REVIEWS !admin

router.delete('/:reviewId', adminAuth, async (req, res) => {
    try {
        await Review.destroy({
            where: { id: req.params.reviewId }
        })
        res.status(200).json({ message: 'review deleted' })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }

})

//!-------------------------------------------- Profile -------------------------------------- //
//----------------------------------------------POST-----------------------------------------//
//?post REVIEW
router.post('/:productId', auth, async (req, res) => {
    try {
        const review = {
            id: uniqid(),
            userId: req.user.id,
            productId: req.params.productId,
            review: req.body.review,
            rating: req.body.rating,
            time: new Date().toISOString()
        }

        const { id, userId, productId, review, rating, time } = review
        let product = await Product.findOne({ where: { id: productId })
        if(!product) res.status(404).json({message:"Product not found"})
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
        res.status(500).json({ error: 'Something went wrong' })
    }

})


//--------------experimental--------------//
//?get MY_REVIEWS

router.get('/myreviews', auth, async (req, res) => {
    try {
        let reviews = await Review.findAll({ where: { userId: req.user.id } })
        res.status(200).json({ payload: reviews })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })

    }
})
module.exports = router