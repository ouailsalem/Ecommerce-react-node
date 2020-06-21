'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    wilaya: {
      type: DataTypes.STRING
    },
    dayra: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    }
  }, { tableName: 'profile' });

  return Profile;
};
