'use strict';

const Sequelize = require('sequelize');
const ReviewModel = require('./models/review.js');
const UserModel = require('./models/user.js');
const ProfileModel = require('./models/profile.js');
const ProductModel = require('./models/product.js');
const OrderModel = require('./models/order.js');
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD
  , {
    host: process.env.HOST,
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  },

);

const Review = ReviewModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Review.belongsTo(User);
Review.belongsTo(Product);


Profile.belongsTo(User);

User.hasOne(Profile, {
  onDelete: 'CASCADE'
})
User.hasMany(Review, {
  onDelete: 'CASCADE'
})
Product.hasMany(Review, {
  onDelete: 'CASCADE'
})
User.hasMany(Order)
Order.belongsTo(User)




module.exports = {
  sequelize,
  Sequelize,
  Review,
  User,
  Profile,
  Product,
  Order
}