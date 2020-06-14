const Sequelize = require('sequelize');
const db = require('../config/database')
require('dotenv').config()

const Profile = db.define('profile', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    wilaya: {
        type: Sequelize.STRING
    },
    dayra: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING
    }


}, { timestamps: false });
//
module.exports = Profile