'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {

    product: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    wilaya: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dayra: {
      type: DataTypes.STRING
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
