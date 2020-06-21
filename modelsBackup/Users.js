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
        type: Sequelize.STRING(30),
        allowNull: false,
        validation: {
            len: [3, 20]
        }
    },
    email: {
        type: Sequelize.STRING(30),
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
        type: Sequelize.INTEGER,
        defaultValue: 0
    }


}, { timestamps: false });

Document.hasOne(Profile, {
    onDelete: "cascade"
});
//
module.exports = User
