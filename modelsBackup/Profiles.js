const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./Users');
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

Profile.belongsTo(User, {
    as: 'Current',
    foreignKey: 'id',
    constraints: false
});

//
module.exports = Profile
