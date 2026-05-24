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
    image: "https://dynamic.zacdn.com/oPl1guuIrnEoU-6E3SDj0Waw9dI=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/xiaomi-watch-8869-5638615-6.jpg",
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
    title: "MADLIONS MAD60 HE 8K Hall Effect 60% Keyboard",
    price: "450.500",
    image: "https://down-id.img.susercontent.com/file/id-11134207-7rasi-m5v88s4fio8wff",
    rating: 4.8,
    reviewCount: "1.2k",
    reviewExcerpt: "Keyboard mantap banget buat main game kompetitif. Rapid trigger nya berasa banget, build quality juga solid parah buat harga segini.",
    affiliateLink: "https://tk.tokopedia.com/ZS9KLcUeL/",
    store: "Infinitas",
    category: "Tech",
    isAvailable: true
  },
  {
    id: "3",
    title: "Vegue M6S",
    price: "250.000",
    image: "https://down-id.img.susercontent.com/file/id-11134207-8224s-mkbsgnkpcoi07c",
    rating: 4.9,
    reviewCount: 1,200+,
    reviewExcerpt: "Diluar ekspektasi microphone nya sangat bagus suaranya apalagi dengan settingan tambahan di obs studio mantep banget suaranya. Walaupun di harga 200ribuan tapi memiliki kualitas seperti microphone harga 500 ribuan.",
    affiliateLink: "https://s.shopee.co.id/6L1WxlgnEZ",
    store: "Shopee",
    category: "Home",
    isAvailable: true
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
