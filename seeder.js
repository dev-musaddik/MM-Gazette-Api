const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const slugify = require('slugify');

// Load env vars
dotenv.config();

// Load Models
const Product = require('./models/Product');
const Article = require('./models/Article');
const Category = require('./models/Category');
const Brand = require('./models/Brand');
const User = require('./models/User');
const Order = require('./models/Order');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fake Data
const categories = [
  { name: 'Smartphone', description: 'Latest mobile phones' },
  { name: 'Laptop', description: 'High performance laptops' },
  { name: 'Smart Home', description: 'IoT devices for home' },
  { name: 'Wearables', description: 'Smart watches and bands' },
  { name: 'Gaming', description: 'Consoles and accessories' },
  { name: 'Accessories', description: 'Cables, chargers, cases' },
];

const brands = [
  { name: 'Apple', description: 'Think Different' },
  { name: 'Samsung', description: 'Inspire the World' },
  { name: 'Sony', description: 'Be Moved' },
  { name: 'Dell', description: 'The power to do more' },
  { name: 'Logitech', description: 'Defy Logic' },
  { name: 'Asus', description: 'In Search of Incredible' },
];

const products = [
  {
    name: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone with titanium design, A17 Pro chip, and the most powerful camera system ever in an iPhone.',
    category: 'Smartphone',
    brand: 'Apple',
    basePrice: 1199,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Processor': 'A17 Pro', 'RAM': '8GB', 'Storage': '256GB', 'Screen': '6.7 inch OLED' },
    featured: true,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Welcome to the era of mobile AI. With the S24 Ultra, you can unleash your creativity, productivity, and possibility.',
    category: 'Smartphone',
    brand: 'Samsung',
    basePrice: 1299,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1706029486828-569502665805?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB', 'Storage': '512GB', 'Screen': '6.8 inch AMOLED' },
    featured: true,
  },
  {
    name: 'MacBook Pro 16"',
    description: 'Mind-blowing. Head-turning. The most advanced Mac laptop ever for demanding workflows.',
    category: 'Laptop',
    brand: 'Apple',
    basePrice: 2499,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1926&auto=format&fit=crop'],
    specs: { 'Processor': 'M3 Max', 'RAM': '36GB', 'Storage': '1TB', 'Screen': '16.2 inch Liquid Retina XDR' },
    featured: true,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and crystal clear calls.',
    category: 'Accessories',
    brand: 'Sony',
    basePrice: 399,
    stock: 100,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop'],
    specs: { 'Type': 'Over-ear', 'Battery': '30 Hours', 'Connectivity': 'Bluetooth 5.2' },
    featured: false,
  },
  {
    name: 'Dell XPS 13',
    description: 'Our most powerful 13-inch XPS laptop is up to twice as powerful as before in the same size.',
    category: 'Laptop',
    brand: 'Dell',
    basePrice: 1099,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Processor': 'Intel Core Ultra 7', 'RAM': '16GB', 'Storage': '512GB', 'Screen': '13.4 inch FHD+' },
    featured: false,
  },
  {
    name: 'Asus ROG Zephyrus G14',
    description: 'Power meets portability in the versatile ROG Zephyrus G14.',
    category: 'Gaming',
    brand: 'Asus',
    basePrice: 1599,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1636489953081-c4e3334f076e?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Processor': 'Ryzen 9', 'GPU': 'RTX 4070', 'RAM': '32GB', 'Screen': '14 inch OLED 120Hz' },
    featured: true,
  },
];

const articles = [
  {
    title: 'iPhone 15 Pro Max Review: Titanium Titan',
    content: 'The iPhone 15 Pro Max is the best iPhone Apple has ever made. The new titanium design makes it lighter and more comfortable to hold, while the A17 Pro chip delivers console-level gaming performance. The camera system is versatile and captures stunning photos in all lighting conditions. Battery life is excellent, easily lasting a full day of heavy use.',
    category: 'Review',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070&auto=format&fit=crop',
    tags: ['Apple', 'iPhone', 'Review', 'Smartphone'],
    published: true,
  },
  {
    title: 'Samsung Galaxy S24 Ultra: The AI Phone',
    content: 'Samsung has gone all-in on AI with the S24 Ultra. Features like Circle to Search, Live Translate, and Note Assist are genuinely useful. The hardware is top-notch as always, with a fantastic display and S Pen integration. The camera zoom capabilities remain unmatched in the industry.',
    category: 'Review',
    image: 'https://images.unsplash.com/photo-1706029486828-569502665805?q=80&w=2070&auto=format&fit=crop',
    tags: ['Samsung', 'Galaxy', 'Review', 'AI'],
    published: true,
  },
  {
    title: 'The Future of Wearable Tech',
    content: 'Wearable technology is evolving rapidly. From health monitoring to augmented reality, devices are becoming more integrated into our daily lives. We explore the latest trends and what to expect in the coming years.',
    category: 'Opinion',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    tags: ['Wearables', 'Tech', 'Future'],
    published: true,
  },
  {
    title: 'How to Choose the Right Gaming Laptop',
    content: 'Choosing a gaming laptop can be overwhelming. Do you prioritize portability or raw power? What GPU do you need? We break down the key factors to consider when making your purchase.',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop',
    tags: ['Gaming', 'Laptop', 'Guide'],
    published: true,
  },
  {
    title: 'Sony WH-1000XM5 vs Bose QC45',
    content: 'A detailed comparison of the two leading noise-canceling headphones on the market. We test sound quality, comfort, ANC performance, and battery life to help you decide which one is right for you.',
    category: 'Review',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop',
    tags: ['Sony', 'Bose', 'Headphones', 'Comparison'],
    published: true,
  },
];

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await Article.deleteMany();

    console.log('Data Destroyed...'.red.inverse);

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'admin',
    });

    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    console.log('Users Created...'.green.inverse);

    // Create Categories
    const createdCategories = await Category.insertMany(categories.map(c => ({ ...c, slug: slugify(c.name, { lower: true }) })));
    console.log('Categories Created...'.green.inverse);

    // Create Brands
    const createdBrands = await Brand.insertMany(brands.map(b => ({ ...b, slug: slugify(b.name, { lower: true }) })));
    console.log('Brands Created...'.green.inverse);

    // Create Products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log('Products Created...'.green.inverse);

    // Add Reviews to Products
    for (const product of createdProducts) {
      const review = {
        user: user1._id,
        name: user1.name,
        rating: 5,
        comment: 'Amazing product! Highly recommended.',
      };
      product.reviews.push(review);
      product.numReviews = 1;
      product.rating = 5;
      await product.save();
    }
    console.log('Product Reviews Added...'.green.inverse);

    // Create Articles
    const articlesWithSlugs = articles.map(article => ({
      ...article,
      slug: slugify(article.title, { lower: true }),
    }));
    await Article.insertMany(articlesWithSlugs);
    console.log('Articles Created...'.green.inverse);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await Article.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
