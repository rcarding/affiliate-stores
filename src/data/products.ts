export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: number;
  reviewCount: number | string;
  reviewExcerpt: string;
  affiliateLink: string;
  store: string;
  category: string;
  isAvailable?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Xiaomi Smart Band 9 Active",
    price: "369.000",
    image: "/produtimage/xiaomiwatch.png",
    rating: 4.9,
    reviewCount: "11.8k",
    reviewExcerpt: "Berfungsi dengan baik, mantap, sangat affordable dan enjoy. Sangat membantu untuk berprogress everyday. jalan kaki menjadi lebih menyenangkan meskipun capek juga sih. But its okay, I enjoy luv",
    affiliateLink: "https://vt.tokopedia.com/t/ZS9Lbfu7dBbX3-lDSlU/",
    store: "Amazon",
    category: "Tech",
    isAvailable: true
  },
  {
    id: "2",
    title: "Minimalist Leather Backpack",
    price: "220.000",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: "5,4k",
    reviewExcerpt: "Beautiful craftsmanship and genuine leather. Fits a 15-inch laptop perfectly. It looks better as it ages.",
    affiliateLink: "#",
    store: "Tokopedia",
    category: "Lifestyle",
    isAvailable: false
  },
  {
    id: "3",
    title: "AeroPress Coffee Maker",
    price: "366.000",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 5600,
    reviewExcerpt: "The perfect coffee maker for travel and home. Brews a smooth, rich cup of coffee in under 2 minutes. Easy to clean.",
    affiliateLink: "#",
    store: "TikTok Shop",
    category: "Home",
    isAvailable: false
  },
  {
    id: "4",
    title: "Fujifilm X100V Digital Camera",
    price: "25.000.000",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 412,
    reviewExcerpt: "Incredible film simulations and classic design. The weather sealing is a great addition. Perfect for street photography.",
    affiliateLink: "#",
    store: "Tokopedia",
    category: "Tech",
    isAvailable: false
  },
  {
    id: "5",
    title: "Hydro Flask Wide Mouth Water Bottle",
    price: "500.000",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 8900,
    reviewExcerpt: "Keeps drinks cold for 24 hours or hot for 12. The powder coat is durable and the wide mouth makes it easy to clean.",
    affiliateLink: "#",
    store: "Tokopedia",
    category: "Lifestyle",
    isAvailable: false
  }
];
