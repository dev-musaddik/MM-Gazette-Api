const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional if you have it
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db'); // Assuming this path

dotenv.config();

const importData = async () => {
  try {
    // Connect to DB manually if connectDB isn't standard
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Import Users
    const createdUsers = [];
    for (const user of users) {
        const newUser = await User.create(user);
        createdUsers.push(newUser);
    }
    const adminUser = createdUsers[0]._id;

    // Import Products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // If products had a user field
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    console.log(`Imported ${createdUsers.length} users and ${createdProducts.length} products!`);

    console.log(`Imported ${createdProducts.length} products!`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroyData();
} else {
  importData();
}
