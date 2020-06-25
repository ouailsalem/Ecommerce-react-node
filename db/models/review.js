'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [10, 500],   
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    }
  }, { tableName: 'review' });

  return Review;
};
