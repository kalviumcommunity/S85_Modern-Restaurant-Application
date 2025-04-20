// models/mysqluser.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js'; // adjust path if needed

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      len: [3, 30],
    },
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      len: [3, 30],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      len: [10, 10],
    },
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // ✅ Better to specify max length too
    },
  },
}, {
  tableName: 'users',     // ✅ ensures correct table name
  timestamps: false,      // ✅ disables createdAt/updatedAt
});

export default User;
