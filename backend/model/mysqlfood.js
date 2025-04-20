// models/Food.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import User from './mysqluser.js';  // Import User model

const Food = sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Reference the User model
      key: 'id',    // Make sure 'id' is used here to match the field in the User model
    },
    onDelete: 'CASCADE', // Automatically delete food items if the associated user is deleted
    onUpdate: 'CASCADE', // Automatically update food items if the associated user's ID is updated
  },
}, {
  timestamps: true, 
});

// Establish the relationship between Food and User
Food.belongsTo(User, { foreignKey: 'created_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Food;
