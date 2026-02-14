const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses connection string from environment variables
 */
const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return; // Success, exit function
    } catch (error) {
      console.error(`❌ Error connecting to MongoDB: ${error.message}`);
      retries -= 1;
      console.log(`Retrying connection... (${retries} retries left)`);
      if (retries === 0) {
        console.error('Max retries reached. Exiting...');
        process.exit(1); 
      }
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = connectDB;
