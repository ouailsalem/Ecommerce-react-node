'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING
    },
    smallDescription: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    pictures: {
      type: DataTypes.TEXT
    },
    mainPicture: {
      type: DataTypes.STRING
    },
    available: {
      type: DataTypes.BOOLEAN
    },
    time: {
      type: DataTypes.STRING
    }
  }, { tableName: 'product' });


  return Product;
};
