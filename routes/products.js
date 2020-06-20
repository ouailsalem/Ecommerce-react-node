const express = require('express')
const router = express.Router()
const Product = require('../models/Products')
const Order = require('../models/Orders')
const Review = require('../models/Reviews')
const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')


//api/products
//get all products
router.get('/', async (req, res) => {
    try {
        let products = await Product.findAll({ attributes: { exclude: ['password', 'description', 'pictures', 'time', 'contact'] } })
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})


//api/products/:productId
//get one product

router.get('/:productId', async (req, res) => {
    try {
        let product = await Product.findOne({
            where: { id: req.params.productId }
        })
        if (!product) { res.status(404).json({ message: 'product not found' }) }
        try {
            let reviews = await Review.findAll({ where: { productId: req.params.productId } })
            res.status(200).json({ payload: { product, reviews } })

        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.error(error)
        res.status(501).json({ message: 'something went wrong' })
    }

})


// !admin
//api/products/add 
//post  a product
router.post('/add', adminAuth, async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        smallDescription: req.body.smallDescription,
        price: req.body.price,
        mainPicture: req.body.mainPicture,
        pictures: req.body.pictures,
        available: req.body.available,
        time: new Date().toISOString()
    }
    let { name, description, smallDescription, price, pictures, mainPicture, available, time } = data
    try {
        let result = await Product.create({
            name,
            description,
            smallDescription,
            price,
            mainPicture,
            pictures,
            available,
            time
        })
        res.status(200).json({ payload: result })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }

})



// !admin
//api/products/:productId 
//update  a product
router.put('/:productId', adminAuth, async (req, res) => {
    try {
        await Product.update({
            name: req.body.name,
            description: req.body.description,
            smallDescription: req.body.smallDescription,
            price: req.body.price,
            mainPicture: req.body.mainPicture,
            pictures: req.body.pictures,
            available: req.body.available,
            contact: req.body.contact,
        }, {
            where: {
                id: req.params.productId
            }
        })
        res.status(200).json('Product updated')
    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})
// !admin
//api/products/:productId 
//delete  a product
router.delete('/:productId', adminAuth, async (req, res) => {
    try {
        await Product.destroy({
            where: { id: req.params.productId }
        })
        await Review.destroy({
            where: { productId: req.params.productId }
        })
        res.status(404).json({ message: 'product deleted' })

    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})
// !admin
//api/products/orders 
//get all orders

router.get('/orders/all', adminAuth, async (req, res) => {
    try {
        let orders = await Order.findAll()
        res.status(200).json(orders)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})

// !admin
//api/products/orders 
//get single order

router.get('/orders/:orderId', adminAuth, async (req, res) => {
    try {
        let order = await Order.findOne({ where: { id: req.params.orderId } })
        if (!order) res.status(404).json({ message: "order not found" })
        res.status(200).json(order)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})


// !admin
//api/products/orders 
//update an order

router.put('/orders/:orderId', adminAuth, async (req, res) => {
    try {
        await Order.update({
            productId: req.body.product_id,
            product: req.body.product,
            quantity: req.body.quantity,
            name: req.body.name,
            phoneNumber: req.body.name,
            address: req.body.name,
            wilaya: req.body.name,
            dayra: req.body.name,
            status: req.body.status,
            refer: req.params.refer || "no refer"
        }, {
            where: {
                id: req.params.orderId
            }
        })
        res.status(200).json({ message: 'Order updated' })
    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})





//api/products/:product_id
//post order
router.get('/order/:product_id/:refer', async (req, res) => {
    const data = {
        productId: req.params.product_id,
        product: req.params.product,
        quantity: req.body.quantity,
        name: req.body.name,
        phoneNumber: req.body.name,
        address: req.body.name,
        wilaya: req.body.name,
        dayra: req.body.name,
        time: new Date().toISOString(),
        status: false,
        refer: req.params.refer || "no refer"
    }
    let { productId, product, quantity, name, phoneNumber, address, wilaya, dayra, time, status, refer } = data
    try {
        let result = await Order.create({
            productId,
            product,
            quantity,
            name,
            phoneNumber,
            address,
            wilaya,
            dayra,
            time,
            refer,
            status
        })
        res.status(200).json({ message: 'order added' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }
})
module.exports = router