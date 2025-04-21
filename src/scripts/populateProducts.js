require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const connectDB = require('../config/connectDB');

const populateProducts = async () => {
  try {
    await connectDB();

    const products = [
      {
        name: 'Abstract Cushion',
        description: 'A vibrant cushion to enhance your living space.',
        price: 25.99,
        SKU: 'HD001',
        colors: [
          {
            color: 'Blue',
            stock: 10,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Blue Cushion'
              }
            ]
          },
          {
            color: 'Yellow',
            stock: 8,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Yellow Cushion'
              }
            ]
          }
        ],
        category: 'Home Décor'
      },
      {
        name: 'Decorative Wall Art',
        description: 'Elegant wall art to add personality to your home.',
        price: 34.99,
        SKU: 'HD002',
        colors: [
          {
            color: 'Multi',
            stock: 12,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1531891570158-e71b35a485bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Decorative Wall Art'
              }
            ]
          }
        ],
        category: 'Home Décor'
      },
      {
        name: 'Floral Artboard',
        description: 'A stunning artboard with floral patterns.',
        price: 45.99,
        SKU: 'AB001',
        colors: [
          {
            color: 'Multicolor',
            stock: 5,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Floral Artboard'
              }
            ]
          }
        ],
        category: 'Artboard'
      },
      {
        name: 'Abstract Line Art',
        description: 'Minimalist art piece for modern interiors.',
        price: 38.99,
        SKU: 'AB002',
        colors: [
          {
            color: 'Black & White',
            stock: 7,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Abstract Line Art'
              }
            ]
          }
        ],
        category: 'Artboard'
      },
      {
        name: 'Stylish Phone Case',
        description: 'A protective phone case with a modern design.',
        price: 15.99,
        SKU: 'AC001',
        colors: [
          {
            color: 'Red',
            stock: 20,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Red Phone Case'
              }
            ]
          },
          {
            color: 'Black',
            stock: 25,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Black Phone Case'
              }
            ]
          }
        ],
        category: 'Accessories'
      },
      {
        name: 'Leather Keychain',
        description: 'Handcrafted leather keychain with custom engraving.',
        price: 12.99,
        SKU: 'AC002',
        colors: [
          {
            color: 'Brown',
            stock: 15,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Leather Keychain'
              }
            ]
          }
        ],
        category: 'Accessories'
      },
      {
        name: 'Canvas Tote Bag',
        description: 'A durable tote bag with artistic prints.',
        price: 19.99,
        SKU: 'ME001',
        colors: [
          {
            color: 'Beige',
            stock: 15,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Canvas Tote Bag'
              }
            ]
          }
        ],
        category: 'Merch'
      },
      {
        name: 'Ceramic Coffee Mug',
        description: 'Artisan coffee mug with unique design.',
        price: 16.99,
        SKU: 'ME002',
        colors: [
          {
            color: 'White',
            stock: 18,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Ceramic Coffee Mug'
              }
            ]
          }
        ],
        category: 'Merch'
      },
      {
        name: 'Retro T-Shirt',
        description: 'A comfortable t-shirt with a retro design.',
        price: 29.99,
        SKU: 'AP001',
        colors: [
          {
            color: 'White',
            stock: 25,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Retro T-Shirt'
              }
            ]
          },
          {
            color: 'Black',
            stock: 20,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Black T-Shirt'
              }
            ]
          }
        ],
        category: 'Apparel'
      },
      {
        name: 'Graphic Hoodie',
        description: 'Warm and stylish hoodie with custom graphic print.',
        price: 49.99,
        SKU: 'AP002',
        colors: [
          {
            color: 'Gray',
            stock: 15,
            images: [
              {
                url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                alt: 'Gray Hoodie'
              }
            ]
          }
        ],
        category: 'Apparel'
      }
    ];

    await Product.insertMany(products);
    console.log('Products populated successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating products:', error);
    mongoose.connection.close();
  }
};

populateProducts();
