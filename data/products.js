const products = [
    {
      name: 'Business Starter',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Perfect for small businesses. Includes 5 pages, contact form, and mobile responsive design.',
      brand: 'MM Universal',
      category: 'Website',
      basePrice: 499,
      stock: 1000,
      rating: 5,
      numReviews: 0,
      isService: true, // Custom flag if needed, but schema doesn't have it, so relying on category
      specs: {
          "Pages": "5",
          "Responsive": "Yes",
          "SEO": "Basic"
      }
    },
    {
      name: 'E-commerce Pro',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Full online store with payment gateway, product management, and customer dashboard.',
      brand: 'MM Universal',
      category: 'E-commerce',
      basePrice: 1299,
      stock: 1000,
      rating: 5,
      numReviews: 0,
      specs: {
          "Products": "Unlimited",
          "Payment Gateway": "Included",
          "Dashboard": "Admin Panel"
      }
    },
    {
      name: 'Custom Enterprise',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Tailored solution for large organizations. Custom features, advanced security, and scalability.',
      brand: 'MM Universal',
      category: 'Enterprise',
      basePrice: 2999,
      stock: 1000,
      rating: 5,
      numReviews: 0,
      specs: {
          "Security": "Advanced",
          "Scalability": "High",
          "Support": "Dedicated"
      }
    },
  ];
  
  module.exports = products;
