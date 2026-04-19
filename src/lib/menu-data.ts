export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  bestSeller?: boolean;
  soldOut?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export const categories: Category[] = [
  { id: "all", name: "Tất cả", icon: "Coffee", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800" },
  { id: "coffee", name: "Cà phê", icon: "Coffee", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800" },
  { id: "tea", name: "Trà", icon: "Leaf", image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=800" },
  { id: "smoothie", name: "Đá xay", icon: "IceCream", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800" },
  { id: "bbq", name: "Khu BBQ", icon: "Flame", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" },
  { id: "combo", name: "Combo Đồ ăn", icon: "Utensils", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800" },
];

export const menuItems: MenuItem[] = [
  // COFFEE MENU
  {
    id: "ca-phe-sua-da",
    name: "Cà phê sữa đá",
    description: "Cà phê phin truyền thống với sữa đặc",
    price: 25000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    featured: true,
    bestSeller: true,
  },
  {
    id: "ca-phe-den-da",
    name: "Cà phê đen đá",
    description: "Cà phê phin nguyên chất",
    price: 20000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
  },
  {
    id: "bac-xiu",
    name: "Bạc xỉu",
    description: "Cà phê sữa nhiều sữa, ít cà phê",
    price: 25000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
  },
  {
    id: "ca-phe-sua-nong",
    name: "Cà phê sữa nóng",
    description: "Cà phê phin nóng với sữa đặc",
    price: 25000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
  },
  {
    id: "ca-phe-den-nong",
    name: "Cà phê đen nóng",
    description: "Cà phê phin nóng nguyên chất",
    price: 20000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
  },

  // TEA MENU
  {
    id: "tra-dao",
    name: "Trà đào",
    description: "Trà đào cam sả thơm mát",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    featured: true,
  },
  {
    id: "tra-vai",
    name: "Trà vải",
    description: "Trà vải nhiệt đới thanh mát",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
  },
  {
    id: "tra-tac",
    name: "Trà tắc",
    description: "Trà tắc chanh tươi mát lạnh",
    price: 30000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },
  {
    id: "tra-chanh",
    name: "Trà chanh",
    description: "Trà chanh leo thanh nhiệt",
    price: 30000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
  },
  {
    id: "tra-o-long",
    name: "Trà Ô Long",
    description: "Trà Ô Long nguyên chất thơm lừng",
    price: 20000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
  },

  // SMOOTHIE MENU
  {
    id: "sinh-to-bo",
    name: "Sinh tố bơ",
    description: "Sinh tố bơ béo ngậy, thơm ngon",
    price: 40000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
    featured: true,
  },
  {
    id: "sinh-to-dau",
    name: "Sinh tố dâu",
    description: "Sinh tố dâu tươi mát lạnh",
    price: 35000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500",
  },
  {
    id: "sinh-to-sapoche",
    name: "Sinh tố sapoche",
    description: "Sinh tố sapoche ngọt thanh",
    price: 35000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
  },
  {
    id: "sinh-to-xoai",
    name: "Sinh tố xoài",
    description: "Sinh tố xoài ngọt mát",
    price: 35000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
  },
  {
    id: "sinh-to-dua-hau",
    name: "Sinh tố dưa hấu",
    description: "Sinh tố dưa hấu giải nhiệt",
    price: 30000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784907?w=500",
  },

  // BBQ Table Rentals
  {
    id: "bbq-table-4",
    name: "Thuê bàn ghế 4 người",
    description: "Bàn ghế BBQ cho 4 người, bao gồm vỉ nướng và dụng cụ",
    price: 359000,
    category: "bbq",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
  },
  {
    id: "bbq-table-6",
    name: "Thuê bàn ghế 6 người",
    description: "Bàn ghế BBQ cho 6 người, bao gồm vỉ nướng và dụng cụ",
    price: 459000,
    category: "bbq",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
  },
  {
    id: "bbq-table-8",
    name: "Thuê bàn ghế 8 người",
    description: "Bàn ghế BBQ cho 8 người, bao gồm vỉ nướng và dụng cụ",
    price: 559000,
    category: "bbq",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
  },

  // Combo Packages
  {
    id: "combo-2-chill",
    name: "COMBO 2 NGƯỜI - CHILL OUT",
    description: "Combo cho 2 người thư giãn, bao gồm đồ uống và món ăn nhẹ",
    price: 399000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
    featured: true,
  },
  {
    id: "combo-4-family",
    name: "COMBO 4 NGƯỜI - GIA ĐÌNH SUM VẦY",
    description: "Combo gia đình 4 người, bao gồm món chính, đồ uống và tráng miệng",
    price: 799000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
    featured: true,
  },
  {
    id: "combo-8-party",
    name: "COMBO 8 NGƯỜI - TIỆC BBQ NHÓM",
    description: "Combo tiệc BBQ cho 8 người, bao gồm thực phẩm BBQ, đồ uống và salad",
    price: 1499000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
    featured: true,
  },
];