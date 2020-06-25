const express = require('express')
const router = express.Router()
const { Product } = require('../db/index')
const { Order } = require('../db/index')
const { Review } = require('../db/index');
const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')


// api/products
// get all products
router.get('/', async (req, res) => {
    try {
        let products = await Product.findAll({ attributes: { exclude: ['description', 'pictures', 'time', 'contact'] } })
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})


// api/products/:productId
// get one product

router.get('/:productId', async (req, res) => {
    try {
        let product = await Product.findOne({
            where: { id: req.params.productId }
        })
        if (!product) { res.status(404).json({ message: 'product not found' }) }

        res.status(200).json({ payload: { product } })


    } catch (error) {
        console.error(error)
        res.status(501).json({ message: 'something went wrong' })
    }

})


// !admin
//api/products/add 
//post  a product
router.post('/add',async (req, res) => {
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
            available: req.body.available
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
        res.status(200).json({ message: 'product deleted' })

    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})

// !admin
//api/products/:productId 
//delete  an order
router.delete('/orders/all/:orderId',  async (req, res) => {
    try {
        await Order.destroy({
            where: { id: req.params.orderId }
        })
        res.status(200).json({ message: 'order deleted' })

    } catch (error) {
        res.status(500).json({ message: 'something went wrongs' })
    }

})
// !admin
//api/products/orders 
//get all orders

router.get('/orders/all', async (req, res) => {
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

router.get('/orders/all/:orderId', adminAuth, async (req, res) => {
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

router.put('/orders/all/:orderId', async (req, res) => {
    try {
        await Order.update({
            product: req.body.product,
            quantity: req.body.quantity,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            wilaya: req.body.wilaya,
            dayra: req.body.dayra,
            status:req.body.status
        }, {
            where: {
                id: req.params.orderId
            }
        })
        res.status(200).json({ message: 'Order updated' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrongs' })
    }

})




//api/products/:product_id
//post order
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
        productOrderedId: req.body.productId,
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
            res.status(200).json({ message: 'order added' })

        }else{
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
            res.status(200).json({ message: 'order added' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }
})



module.exports = router