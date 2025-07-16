type NavLink = {
  id: number;
  title: string;
  path: string;
}

type Store = {
  id: number;
  name: string;
  location: string;
  image: string; 
}

type Locations = {
  id: string;
  name: string;
}

export const stores: Store[] = [
  {
    id: 1,
    name: "Store 1",
    location: "Location 1",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 2,
    name: "Store 2",
    location: "Abuja, FCT",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 3,
    name: "Store 3",
    location: "Imo State",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 4,
    name: "Store 3",
    location: "Ibadan",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 5,
    name: "Store 3",
    location: "Lagos",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 6,
    name: "Store 3",
    location: "Lagos",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 7,
    name: "Store 3",
    location: "Lagos",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
  {
    id: 8,
    name: "Store 3",
    location: "Lagos",
    image: "https://www.foodlocker.com.ng/public/main/images/icons/ic-logo-00.webp"
  },
]

export const navLinks: NavLink[] = [
  {
    id: 1,
    title: "Home",
    path: "/"
  },
  {
    id: 2,
    title: "Stores",
    path: "/stores"
  },
  {
    id: 3,
    title: "Products",
    path: "/products"
  },
  {
    id: 4,
    title: "About",
    path: "/about"
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact"
  }
]

export const products = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    description: "Kidney beans",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2018/04/buy-kidney-beans-online-212x212.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    description: "Description for Product 2",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2018/11/buy-tilapia-fish-online-212x212.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2014/07/IMG_1649-212x212.jpg",
    price: 49.99,
    description: "Freshly Smoked Catfish (5 large pieces)"
  },
  {
    id: 4,
    name: "Product 4",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2014/07/IMG_1661-212x212.jpg",
    price: 49.99,
    description: "Freshly Smoked Catfish (Egun) – Medium Size (pack of 10)"
  },
  {
    id: 5,
    name: "Product 5",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2021/07/IMG-20210527-WA0010-212x212.jpg",
    price: 49.99,
    description: "Description for Product 3"
  },
  {
    id: 6,
    name: "Product 6",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2021/07/IMG-20210527-WA0010-212x212.jpg",
    price: 49.99,
    description: "Description for Product 3"
  },
  {
    id: 7,
    name: "Product 7",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2024/02/dry-shombo-212x212.jpg",
    price: 49.99,
    description: "Dry shombo ( 1 paint)"
  },
  {
    id: 8,
    name: "Product 8",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2023/09/dry-periwinkle-212x212.jpg",
    price: 49.99,
    description: "Dry Periwinkle (200g)"
  },
  {
    id: 9,
    name: "Product 9",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2016/10/buy-cap-rice-online-212x212.jpg",
    price: 49.99,
    description: "Cap rice (Original)"
  },
  {
    id: 10,
    name: "Product 10",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2018/04/buy-black-beans-online-212x212.jpg",
    price: 49.99,
    description: "Black beans for frejon meal ( ewa ibeji)"
  },
  {
    id: 11,
    name: "Product 11",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2021/07/IMG-20210527-WA0010-212x212.jpg",
    price: 49.99,
    description: "Description for Product 3"
  },
  {
    id: 12,
    name: "Product ",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2018/11/buy-Bag-Of-Rice-Aroso-online-212x212.jpg",
    price: 49.99,
    description: "Aroso Rice (Original)"
  },
  {
    id: 13,
    name: "ONITSHA YAM",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2014/08/IMG_0462-212x212.jpg",
    price: 49.99,
    description: "Description for Product 3"
  },
  {
    id: 14,
    name: "Plantain",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2014/07/IMG_1689-212x212.jpg",
    price: 49.99,
    description: "Description for Product 3"
  },
  {
    id: 15,
    name: "Product 3",
    image: "https://www.themarketfoodshop.com/wp-content/uploads/2023/04/hake-fish-carton-212x212.jpg",
    price: 49.99,
    description: "Description for Product 3"
  },
]

export const locations: Locations[] = [
  {
    id: "1",
    name: "Lagos"
  },
  {
    id: "2",
    name: "Abuja"
  },
  {
    id: "3",
    name: "Port Harcourt"
  },
  {
    id: "4",
    name: "Ibadan"
  },
  {
    id: "5",
    name: "Enugu"
  },
  {
    id: "6",
    name: "Kaduna"
  },
  {
    id: "7",
    name: "Kano"
  },
  {
    id: "8",
    name: "Owerri"
  }
]