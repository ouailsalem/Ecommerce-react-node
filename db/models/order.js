'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {

    product: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue:1
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 50]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 20]
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 255]
      }
    },
    wilaya: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dayra: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 255]
      }
    },
    time: {
      type: DataTypes.STRING
    },
    refer: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    }
  }, { tableName: 'order' });



  return Order;
};
