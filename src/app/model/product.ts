export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    rating: {
      rate: number;  // Average rating
      count: number; // Number of reviews
    };
    image: string;
  }
  