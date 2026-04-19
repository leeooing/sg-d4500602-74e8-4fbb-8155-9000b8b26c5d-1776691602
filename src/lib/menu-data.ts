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
    id: "ca-phe-den",
    name: "Cà phê đen",
    description: "Cà phê phin nguyên chất",
    price: 30000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
    featured: true,
  },
  {
    id: "ca-phe-sua",
    name: "Cà phê sữa",
    description: "Cà phê phin truyền thống với sữa đặc",
    price: 30000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    featured: true,
  },
  {
    id: "ca-phe-muoi",
    name: "Cà phê muối",
    description: "Cà phê đặc biệt với lớp bọt muối mặn mà",
    price: 38000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
  },
  {
    id: "ca-phe-kem-sua-hat-nhan",
    name: "Cà phê kem sữa hạt nhân",
    description: "Cà phê kem thơm ngậy với hạt nhân",
    price: 45000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
    bestSeller: true,
  },

  // TEA - TRÀ CÚC SAM THỊ (size M - 35k)
  {
    id: "tra-cuc-sam-thi-nong-m",
    name: "Trà cúc sam thị nóng (M)",
    description: "Trà cúc sam thị nóng size M",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    bestSeller: true,
  },
  {
    id: "tra-cuc-sam-thi-lanh-m",
    name: "Trà cúc sam thị lạnh (M)",
    description: "Trà cúc sam thị lạnh size M",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    bestSeller: true,
  },
  {
    id: "tra-cuc-sam-thi-chua-ngot-m",
    name: "Trà cúc sam thị chua ngọt (M)",
    description: "Trà cúc sam thị chua ngọt size M",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    bestSeller: true,
  },

  // TEA - TRÀ CÚC SAM THỊ (size L - 45k)
  {
    id: "tra-cuc-sam-thi-nong-l",
    name: "Trà cúc sam thị nóng (L)",
    description: "Trà cúc sam thị nóng size L",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },
  {
    id: "tra-cuc-sam-thi-lanh-l",
    name: "Trà cúc sam thị lạnh (L)",
    description: "Trà cúc sam thị lạnh size L",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
  },
  {
    id: "tra-cuc-sam-thi-chua-ngot-l",
    name: "Trà cúc sam thị chua ngọt (L)",
    description: "Trà cúc sam thị chua ngọt size L",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },

  // TEA - TRÀ SỮA/TRÀ TRÁI CÂY
  {
    id: "tra-sua-san-san",
    name: "Trà sữa san san",
    description: "Trà sữa san san thơm ngon",
    price: 35000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?w=500",
    featured: true,
    bestSeller: true,
  },
  {
    id: "tra-thach-dao-highland",
    name: "Trà thạch đào highland",
    description: "Trà đào thơm mát với thạch",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },
  {
    id: "matcha-latte",
    name: "Matcha latte",
    description: "Matcha latte thơm béo",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
  },
  {
    id: "tra-trai-cay-nhiet-doi",
    name: "Trà trái cây nhiệt đới",
    description: "Trà trái cây tươi mát nhiệt đới",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },
  {
    id: "tra-mang-cau",
    name: "Trà mãng cầu",
    description: "Trà mãng cầu ngọt thanh",
    price: 48000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
  },
  {
    id: "luc-tra-chanh-leo-oi-hong",
    name: "Lục trà chanh leo ối hồng",
    description: "Lục trà chanh leo ối hồng tươi mát",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },

  // ĐỒ UỐNG ĐÁ XAY
  {
    id: "choco-banana",
    name: "Choco banana",
    description: "Đá xay chocolate chuối thơm ngon",
    price: 45000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
    featured: true,
    bestSeller: true,
  },
  {
    id: "lassi-viet-quat",
    name: "Lassi việt quất",
    description: "Lassi việt quất mát lạnh",
    price: 45000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500",
  },
  {
    id: "matcha-freeze",
    name: "Matcha freeze",
    description: "Matcha đá xay thơm mát",
    price: 45000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
  },

  // ĐỒ UỐNG XỨ HƯỚNG MỚI
  {
    id: "bo-gia-dua-non",
    name: "Bơ giã dừa non",
    description: "Bơ giã dừa non thơm béo",
    price: 50000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
    featured: true,
    bestSeller: true,
  },
  {
    id: "coc-mang-cau",
    name: "Cốc mãng cầu",
    description: "Sinh tố mãng cầu ngọt thanh",
    price: 50000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
  },
  {
    id: "xoai-mit-sua-dua-sam-san",
    name: "Xoài, mít, sữa dừa, Sam San",
    description: "Sinh tố trái cây nhiệt đới đặc biệt",
    price: 50000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
  },
  {
    id: "sinh-to-bo-chuoi",
    name: "Sinh tố bơ chuối",
    description: "Sinh tố bơ chuối béo ngậy",
    price: 50000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
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

  // NHÓM GIA ĐÌNH SAM THỊ - Bình trà
  {
    id: "binh-tra-1-lit",
    name: "Bình trà trái cây nhiệt đới 1 lít",
    description: "Bình trà trái cây nhiệt đới cho gia đình và nhóm bạn",
    price: 109000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },
  {
    id: "binh-tra-1-5-lit",
    name: "Bình trà trái cây nhiệt đới 1.5 lít",
    description: "Bình trà trái cây nhiệt đới lớn cho gia đình và nhóm bạn",
    price: 129000,
    category: "combo",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
  },
];