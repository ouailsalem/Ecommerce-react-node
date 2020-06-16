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
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
    pictures: {
        type: Sequelize.STRING
    },
    mainPicture: {
        type: Sequelize.STRING
    },
    available: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    }


}, { timestamps: false });


module.exports = Product