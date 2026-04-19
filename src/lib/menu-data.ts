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

export const categories = [
  { id: "coffee", name: "Cà phê", icon: "Coffee" },
  { id: "tea", name: "Trà", icon: "Leaf" },
  { id: "smoothie", name: "Đá xay", icon: "IceCream" },
  { id: "cake", name: "Bánh", icon: "Cake" },
  { id: "juice", name: "Nước ép", icon: "Cherry" },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Cà phê sữa đá",
    description: "Cà phê phin truyền thống pha với sữa đặc, đá mát lạnh",
    price: 35000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400",
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    name: "Bạc xỉu",
    description: "Cà phê sữa nhiều sữa, vị ngọt dịu nhẹ",
    price: 35000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    bestSeller: true,
  },
  {
    id: "3",
    name: "Cà phê đen đá",
    description: "Cà phê phin nguyên chất, đậm đà truyền thống",
    price: 30000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  },
  {
    id: "4",
    name: "Trà đào cam sả",
    description: "Trà đen kết hợp đào, cam tươi và sả thơm",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    featured: true,
  },
  {
    id: "5",
    name: "Trà sữa trân châu",
    description: "Trà sữa thơm ngon với trân châu đen dai ngọt",
    price: 40000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1525385444649-f6e58c9321c0?w=400",
    bestSeller: true,
  },
  {
    id: "6",
    name: "Sinh tố bơ",
    description: "Bơ xay mịn, béo ngậy, thơm ngon",
    price: 45000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
  },
  {
    id: "7",
    name: "Đá xay dâu",
    description: "Dâu tươi xay nhuyễn với đá, mát lạnh sảng khoái",
    price: 50000,
    category: "smoothie",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400",
    featured: true,
  },
  {
    id: "8",
    name: "Bánh tiramisu",
    description: "Bánh tiramisu Ý thơm vị cà phê, kem mềm mịn",
    price: 55000,
    category: "cake",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
  },
  {
    id: "9",
    name: "Bánh croissant bơ",
    description: "Bánh croissant giòn tan, thơm bơ tươi",
    price: 35000,
    category: "cake",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
  },
  {
    id: "10",
    name: "Nước ép cam",
    description: "Cam tươi nguyên chất, giàu vitamin C",
    price: 40000,
    category: "juice",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
  },
];