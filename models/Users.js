const Sequelize = require('sequelize');
const db = require('../config/database');
const Profile = require('./Profiles');
require('dotenv').config()

const User = db.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    time: {
        type: Sequelize.STRING
    },
    money: {
        type: Sequelize.STRING,
    }


}, { timestamps: false });

//
module.exports = User