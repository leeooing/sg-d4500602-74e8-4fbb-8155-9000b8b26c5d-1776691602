import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { menuItems, categories } from "@/lib/menu-data";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function MenuSelectionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return !item.soldOut && matchesSearch && matchesCategory;
  });

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
    });
    toast({
      title: "Đã thêm vào giỏ",
      description: item.name,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleContinue = () => {
    if (cart.length === 0) {
      router.push("/booking/review");
      return;
    }

    // Save cart to localStorage
    localStorage.setItem("bookingCart", JSON.stringify(cart));
    router.push("/booking/review");
  };

  const handleSkip = () => {
    localStorage.removeItem("bookingCart");
    router.push("/booking/review");
  };

  return (
    <>
      <SEO title="Chọn món - Đặt bàn" description="Chọn món ăn trước" />
      <div className="min-h-screen bg-muted/30 pb-32">
        {/* Header */}
        <div className="bg-background border-b sticky top-0 z-10">
          <div className="container max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/booking">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-2xl font-bold font-serif">Chọn món</h1>
                <p className="text-sm text-muted-foreground">Tùy chọn - Có thể bỏ qua</p>
              </div>
            </div>

            {/* Search */}
            <Input
              placeholder="Tìm món..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
            />

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
                className="whitespace-nowrap rounded-full"
              >
                Tất cả
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="whitespace-nowrap rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 gap-3">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3 flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-primary">
                        {item.price.toLocaleString()}đ
                      </div>
                      {cart.find((i) => i.id === item.id) ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">
                            {cart.find((i) => i.id === item.id)?.quantity}
                          </span>
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Thêm
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Cart Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-20">
          <div className="container max-w-2xl mx-auto">
            {cart.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="font-semibold">{getTotalItems()} món</span>
                  </div>
                  <div className="font-bold text-lg text-primary">
                    {getTotalPrice().toLocaleString()}đ
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleSkip}>
                    Bỏ qua
                  </Button>
                  <Button onClick={handleContinue}>
                    Tiếp tục
                  </Button>
                </div>
              </div>
            ) : (
              <Button className="w-full" onClick={handleSkip}>
                Bỏ qua bước này
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}