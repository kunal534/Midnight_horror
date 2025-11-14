export interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price: string;
  category: string;
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: '1',
    title: 'Horror Book Collection',
    description: 'Complete collection of classic horror novels including Stephen King, H.P. Lovecraft, and Edgar Allan Poe.',
    imageUrl: '/images/affiliates/horror-books.jpg',
    affiliateLink: 'https://amzn.to/your-affiliate-link',
    price: '$29.99',
    category: 'Books',
  },
  {
    id: '2',
    title: 'Horror Movie Streaming',
    description: 'Premium horror streaming service with thousands of classic and new horror films.',
    imageUrl: '/images/affiliates/streaming.jpg',
    affiliateLink: 'https://your-affiliate-link.com',
    price: '$9.99/month',
    category: 'Streaming',
  },
  
  // ✅ ADD YOUR NEW AFFILIATE PRODUCTS BELOW THIS LINE
  // Just copy this template:
  /*
  {
    id: '3',
    title: 'Product Name',
    description: 'Product description',
    imageUrl: '/images/affiliates/product.jpg',
    affiliateLink: 'https://your-link.com',
    price: '$XX.XX',
    category: 'Category',
  },
  */
];
