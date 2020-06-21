const Sequelize = require('sequelize');
const db = require('../config/database');
const Review = require('./Reviews');
require('dotenv').config()

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
    },
    smallDescription: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.FLOAT
    },
    pictures: {
        type: Sequelize.TEXT
    },
    mainPicture: {
        type: Sequelize.TEXT
    },
    available: {
        type: Sequelize.BOOLEAN
    },
    time: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    }


}, { timestamps: false });


module.exports = Product
