const express = require('express')
const router = express.Router()
const Product = require('../models/Products')
const Order = require('../models/Orders')
const Review = require('../models/Reviews')


//api/products
router.get('/', async (req, res) => {
    try {
        let productss = await Product.findAll()

        res.status(200).json(productss)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
})

router.get('/:productId', async (req, res) => {
    try {
        let foundProduct = await Product.findOne({
            where: { id: req.params.productId },
            include: [{
                model: Review,
                where: { productId: req.params.productId },
                required: false,
            }]
        })
        if (foundProduct) {
            res.status(200).json({ payload: foundProduct })
        }
        res.status(404).json({ message: 'product not found' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrongs' })
    }

})
//api/products
router.post('/add', async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        pictures: req.body.pictures,
        available: req.body.available,
        contact: req.body.contact,
        time: new Date().toISOString()
    }
    let { name, description, price, pictures, available, contact, time } = data
    try {
        let result = await Product.create({
            name,
            description,
            price,
            pictures,
            available,
            contact,
            time
        })
        res.status(200).json({ payload: result })
    } catch (error) {
        res.status(500).json({ error: 'something went wrong' })
    }

})
//api/products/:product_id
router.get('/:product_id/order/:refer', async (req, res) => {
    const data = {
        productId: req.params.product_id,
        product: 'watch',
        quantity: 2,
        name: 'ouail',
        phoneNumber: '+21231313',
        address: 'bp 77',
        wilaya: 'Tebessa',
        dayra: 'Cheria',
        time: new Date().toISOString(),
        status: 'false',
        refer: req.params.refer
    }
    let { productId, product, quantity, name, phoneNumber, address, wilaya, dayra, time, refer, status } = data
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
        res.status(500).json({ message: 'order added' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong' })
    }
})
router.delete('/:productId', async (req, res) => {
    try {
        await Product.destroy({
            where: { id: req.params.productId }
        })
        await Review.destroy({
            where: { productId: req.params.productId }
        })
        res.status(404).json({ message: 'product deleted' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrongs' })
    }

})
module.exports = router