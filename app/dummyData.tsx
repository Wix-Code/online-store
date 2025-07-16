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
    description: "Description for Product 1"
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    description: "Description for Product 2"
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
    description: "Description for Product 3"
  }
]

const locations: Locations[] = [
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