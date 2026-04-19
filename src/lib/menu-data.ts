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
  {
    id: "1",
    name: "Cà phê sữa đá",
    description: "Cà phê phin truyền thống với sữa đặc",
    price: 25000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    featured: true,
  },
  {
    id: "2",
    name: "Bạc xỉu",
    description: "Cà phê sữa pha theo tỷ lệ đặc biệt",
    price: 28000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400",
  },
  {
    id: "3",
    name: "Trà đào cam sả",
    description: "Trà hoa quả tươi mát, ngọt dịu",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    featured: true,
  },
  {
    id: "4",
    name: "Trà sữa trân châu",
    description: "Trà sữa truyền thống với trân châu dai",
    price: 32000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400",
  },
  {
    id: "5",
    name: "Sinh tố bơ",
    description: "Đá xay bơ béo ngậy, thơm ngon",
    price: 38000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
    featured: true,
  },
  {
    id: "6",
    name: "Đá xay dâu",
    description: "Đá xay dâu tươi mát lạnh",
    price: 35000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1546547001-d2e3150e3f6f?w=400",
  },
  {
    id: "7",
    name: "BBQ Combo 2 người",
    description: "Thịt ba chỉ, sườn nướng, rau củ, nước chấm",
    price: 350000,
    category: "bbq",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    featured: true,
    soldOut: false,
  },
  {
    id: "8",
    name: "Set lẩu mini",
    description: "Lẩu nấm hải sản cho 2 người",
    price: 280000,
    category: "bbq",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
  },
  {
    id: "9",
    name: "Combo đồ ăn nhẹ",
    description: "Khoai tây chiên, gà popcorn, salad",
    price: 120000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
  },
  {
    id: "10",
    name: "Combo healthy",
    description: "Salad rau củ, smoothie bowl, bánh mì ngũ cốc",
    price: 95000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
  },
  {
    id: "combo-breakfast",
    name: "Combo Breakfast",
    description: "Bánh mì + Cà phê sữa đá + Trứng ốp la",
    price: 55000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500",
    featured: true,
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