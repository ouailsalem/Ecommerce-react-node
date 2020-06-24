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

Review.belongsTo(User,{
  onDelete: 'CASCADE',
});
Review.belongsTo(Product,{
  onDelete: 'CASCADE'
});


Profile.belongsTo(User,{
  onDelete: 'CASCADE',
});

User.hasOne(Profile, {
  onDelete: 'CASCADE',
  hooks: true
})
User.hasMany(Review, {
  onDelete: 'CASCADE',
  hooks: true
})
Product.hasMany(Review, {
  onDelete: 'CASCADE',
  hooks: true
})

User.hasMany(Order)

Order.belongsTo(Product,{
  as:"productOrdered"
})




module.exports = {
  sequelize,
  Sequelize,
  Review,
  User,
  Profile,
  Product,
  Order
}