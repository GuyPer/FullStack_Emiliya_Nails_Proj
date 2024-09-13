/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR DATABASE !!!!!!!
============================================
============================================
*/

const connectDB = require('./config/db')
const { users, galleryImages,products } = require('./data/data')
const User = require('./models/User')
const Gallery = require('./models/Gallery')
const Product = require('./models/Product')
const chalk = require("chalk");

const seedAll = async() => {

  console.log(chalk.green.bold('\nDatabase seeding started...'));

  try {
      // Seed users
      // delete all existing users
      await User.deleteMany();
      // insert seed users
      const insertedUsers = await User.insertMany(users);
      console.log(chalk.blue.bold( `[i] Inserted ${insertedUsers.length} users`));

      // Seed Gallery
      // delete all existing Gallery images
      await Gallery.deleteMany();
      // insert seed gallery
      const insertGallery = await Gallery.insertMany(galleryImages);
      console.log(chalk.blue.bold( `[i] Inserted ${insertGallery.length} gallery images`));
      // Seed Products
      // delete all existing Products
      await Product.deleteMany();
      // insert seed gallery
      const insertProducts = await Product.insertMany(products);
      console.log(chalk.blue.bold( `[i] Inserted ${insertProducts.length} products`));
      // Success
      console.log(chalk.green.bold('[v] Completed successfully'))
      process.exit(0);

  } catch(e) {

    // Error
      console.log(chalk.red.bold(`[x] Seeding error, ${e.message}`))
      process.exit(1);
  }
}



// Connect to database
connectDB().then(()=>{
  // Seed all collections
  seedAll()
});