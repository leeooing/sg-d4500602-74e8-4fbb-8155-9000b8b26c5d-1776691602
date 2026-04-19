import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Phone, Info, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems, categories } from "@/lib/menu-data";

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredItems = menuItems.filter((item) => item.featured);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Logo */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/FB_IMG_1775706386937.jpg"
                  alt="SamCamping Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-foreground">SamCamping</h1>
                <p className="text-xs text-muted-foreground">Cafe & Camping Vibes</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Bàn #12
            </Badge>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm món..."
            className="pl-10 h-12 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
            className="whitespace-nowrap"
          >
            Tất cả
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="whitespace-nowrap"
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Items */}
      {activeCategory === "all" && !searchQuery && (
        <section className="container py-6">
          <h2 className="font-serif font-bold text-2xl mb-4 text-foreground">Món nổi bật</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredItems.map((item) => (
              <Link key={item.id} href={`/menu/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {item.bestSeller && (
                      <Badge className="absolute top-2 right-2 bg-accent">
                        <Star className="w-3 h-3 mr-1" />
                        Best seller
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                    <p className="font-bold text-primary">{item.price.toLocaleString()}đ</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Items Grid */}
      <section className="container py-6">
        <h2 className="font-serif font-bold text-2xl mb-4 text-foreground">
          {activeCategory === "all" ? "Tất cả món" : categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <Link key={item.id} href={`/menu/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {item.bestSeller && (
                    <Badge className="absolute top-2 right-2 bg-accent text-xs">
                      Best seller
                    </Badge>
                  )}
                  {item.soldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Hết hàng</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                  <p className="font-bold text-primary">{item.price.toLocaleString()}đ</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Link href="/booking">
          <Button size="lg" className="rounded-full shadow-lg h-14 w-14 p-0">
            <Calendar className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/info">
          <Button size="lg" variant="secondary" className="rounded-full shadow-lg h-14 w-14 p-0">
            <Info className="h-6 w-6" />
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="rounded-full shadow-lg h-14 w-14 p-0 bg-card">
          <Phone className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}