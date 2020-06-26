const express = require('express')
const router = express.Router()
const { Product } = require('../db/index')
const { Order } = require('../db/index')
const { Review } = require('../db/index');
const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')



//!-------------------------------------------- Products -------------------------------------- //
//-------------------------------------------------GET-----------------------------------------//
//? get ALL_PRODUCTS
router.get('/', async (req, res) => {
    try {
        let products = await Product.findAll({ attributes: { exclude: ['description', 'pictures', 'time', 'contact'] } })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//!=================

//?get SINGLE_PRODUCT
router.get('/:productId', async (req, res) => {
    try {
        let product = await Product.findOne({
            where: { id: req.params.productId }
        })
        if (!product) { res.status(404).json({ message: 'Product not found' }) }

        res.status(200).json({ payload: { product } })

    } catch (error) {
        res.status(501).json({ error: 'Something went wrong' })
    }

})



//! -------------------------------------------- Products -------------------------------------- //
//-------------------------------------------------POST-----------------------------------------//

//?post  PRODUCT
router.post('/add', adminAuth, async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        smallDescription: req.body.smallDescription,
        price: req.body.price,
        mainPicture: req.body.mainPicture,
        videoLink: req.body.videoLink,
        pictures: req.body.pictures,
        available: req.body.available,
        time: new Date().toISOString()
    }
    let { name, description, smallDescription, price, pictures, mainPicture, videoLink, available, time } = data
    try {
        await Product.create({
            name,
            description,
            smallDescription,
            price,
            mainPicture,
            videoLink,
            pictures,
            available,
            time
        })
        res.status(200).json({ message: "product added" })
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' })
    }

})

//! -------------------------------------------- Products -------------------------------------- //
//-------------------------------------------------DELETE-----------------------------------------//

//?delete PRODUCT
router.delete('/:productId', adminAuth, async (req, res) => {
    try {
        await Product.destroy({
            where: { id: req.params.productId }
        })
        res.status(200).json({ message: 'Product deleted' })

    } catch (error) {
        res.status(500).json({ error: 'something went wrong' })
    }

})

//! -------------------------------------------- PRODUCTS -------------------------------------- //
//-----------------------------------------------UPDATE----------------------------------------//
//? update  PRODUCT
router.put('/:productId', adminAuth, async (req, res) => {
    try {
        await Product.update({
            name: req.body.name,
            description: req.body.description,
            smallDescription: req.body.smallDescription,
            price: req.body.price,
            mainPicture: req.body.mainPicture,
            videoLink: req.body.videoLink,
            pictures: req.body.pictures,
            available: req.body.available
        }, {
            where: {
                id: req.params.productId
            }
        })
        res.status(200).json({ message: 'Product updated' })
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' })
    }

})

//!-----------------------------------------------Orders-----------------------------------------//
//--------------------------------------------------GET-----------------------------------------//
//?get ALL_ORDERS //!ADMIN

router.get('/orders/all', adminAuth, async (req, res) => {
    try {
        let orders = await Order.findAll()
        res.status(200).json(orders)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})

//?get SINGLE_ORDER  //!ADMIN

router.get('/orders/all/:orderId', adminAuth, async (req, res) => {
    try {
        let order = await Order.findOne({ where: { id: req.params.orderId } })
        if (!order) res.status(404).json({ message: "Order Not Found" })
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

//! -------------------------------------------- ORDERS -------------------------------------- //
//-----------------------------------------------POST------------------------------------------//
router.post('/order/:productId/:refer', async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const data = {
        product: req.body.product,
        quantity: req.body.quantity,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        wilaya: req.body.wilaya,
        dayra: req.body.dayra,
        time: new Date().toISOString(),
        refer: req.params.refer || "no refer",
        status: false,
        userId: req.body.userId || "guest",
        productOrderedId: req.params.productId
    }
    let { product, quantity, name, phoneNumber, address, wilaya, dayra, time, status, refer, userId, productOrderedId } = data
    try {
        if (userId === "guest") {

            await Order.create({
                product,
                quantity,
                name,
                phoneNumber,
                address,
                wilaya,
                dayra,
                time,
                refer,
                status,
                productOrderedId
            })
            res.status(200).json({ message: 'Order added' })

        } else {
            await Order.create({
                product,
                quantity,
                name,
                phoneNumber,
                address,
                wilaya,
                dayra,
                time,
                refer,
                status,
                userId,
                productOrderedId
            })
            res.status(200).json({ message: 'Order added' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

//! -------------------------------------------- ORDERS ----------------------------------------- //
//------------------------------------------------DELETE-----------------------------------------//

//?delete  an order
router.delete('/orders/all/:orderId', adminAuth, async (req, res) => {
    try {
        await Order.destroy({
            where: { id: req.params.orderId }
        })
        res.status(200).json({ message: 'Order deleted' })

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }

})

//! -------------------------------------------- ORDERS -------------------------------------- //
//-----------------------------------------------UPDATE----------------------------------------//
//? update an order
router.put('/orders/all/:orderId', adminAuth, async (req, res) => {
    console.log(req.body)
    try {
        await Order.update({
            product: req.body.product,
            quantity: req.body.quantity,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            wilaya: req.body.wilaya,
            dayra: req.body.dayra,
            status: req.body.status
        }, {
            where: {
                id: req.params.orderId
            }
        })
        res.status(200).json({ message: 'Order updated' })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }

})





module.exports = router