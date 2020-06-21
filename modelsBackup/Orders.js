const Sequelize = require('sequelize');
const db = require('../config/database')
require('dotenv').config()

const Order = db.define('order', {
    product: {
        type: Sequelize.STRING
    },
    productId: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    wilaya: {
        type: Sequelize.STRING
    },
    dayra: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    },
    refer: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN
    }

}, { timestamps: false });
//
module.exports = Order
