require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const connectDB = require('../config/connectDB');

const removeAllProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    console.log('All products removed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error removing products:', error);
    mongoose.connection.close();
  }
};

removeAllProducts();
