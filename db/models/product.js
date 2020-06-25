'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.TEXT
    },
    smallDescription: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.STRING
    },
    pictures: {
      type: DataTypes.TEXT
    },
    mainPicture: {
      type: DataTypes.TEXT
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
