const Sequelize = require('sequelize');
const db = require('../config/database');
require('dotenv').config()

const Review = db.define('review', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
    },
    review: {
        type: Sequelize.TEXT("medium"),
    },
    productId: {
        type: Sequelize.INTEGER
    },
    rating: {
        type: Sequelize.INTEGER
    },
    time: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING

    }

}, { timestamps: false });



module.exports = Review
