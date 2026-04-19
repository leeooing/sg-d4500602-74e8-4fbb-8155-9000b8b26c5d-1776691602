import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Phone, Info, Calendar, Star, MapPin, Wifi, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems, categories } from "@/lib/menu-data";
import { CallStaffDialog } from "@/components/CallStaffDialog";

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [callStaffOpen, setCallStaffOpen] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredItems = menuItems.filter((item) => item.featured);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header with Cover Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/Messenger_creation_27A608A3-FDB0-4E2D-9358-ECDDC7E0FEC0.jpg"
          alt="SamCamping Cafe"
          fill
          className="object-cover"
          priority />
        
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {/* Logo */}
          <div className="mb-6 relative w-[30%] max-w-[200px] aspect-square md:w-40 md:h-40">
            <Image
              src="/logosamcamping.png"
              alt="SamCamping Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority />
          </div>

          {/* Restaurant Name */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg" style={{ fontWeight: "900", fontSize: "56px", margin: "10px 0px", padding: "0px" }}>Sam Camping

          </h1>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/95">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm md:text-base" style={{ textAlign: "left" }}>Sau trường cấp 3 Mạc Đĩnh Chi

              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm md:text-base" style={{ textAlign: "left" }}>0968 088 189</span>
            </div>
            
            <div className="flex items-center gap-2 md:col-span-2">
              <Wifi className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm md:text-base" style={{ textAlign: "left" }}>WiFi: SamCamping | Pass: samcamping68</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-sm md:text-base max-w-2xl leading-relaxed" style={{ textAlign: "left", margin: "10px 0px" }}>SamCamping không chỉ là nơi ăn uống, mà là điểm hẹn để chậm lại, để thảnh thơi, để kết nối và tận hưởng trọn vẹn cảm giác tự do giữa thiên nhiên, RETREAT !, Coffee & Out Door BBQ.

          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Link href="/booking" className="flex-1">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Đặt bàn
              </Button>
            </Link>
            <Link href="/info" className="flex-1">
              <Button size="lg" variant="outline" className="w-full bg-white/90 hover:bg-white border-2 border-primary text-primary font-semibold shadow-lg">
                <MapPin className="mr-2 h-5 w-5" />
                Địa chỉ
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 w-full bg-white/90 hover:bg-white border-2 border-secondary text-secondary font-semibold shadow-lg"
              onClick={() => setCallStaffOpen(true)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Tư vấn miễn phí
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-background border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm món..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[72px] z-30 bg-background border-b">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide" style={{ margin: "0px" }}>
          {categories.filter((cat) => cat.id !== "all").map((category) =>
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="whitespace-nowrap flex-shrink-0">
            
              {category.name}
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Featured Items */}
        {activeCategory === "all" && featuredItems.length > 0 &&
        <section>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <h2 className="font-serif text-2xl font-semibold">Món nổi bật</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredItems.map((item) =>
            <Link key={item.id} href={`/menu/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                    <div className="relative h-48">
                      <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform" />
                  
                      {item.soldOut &&
                  <Badge className="absolute top-3 right-3" variant="destructive">
                          Hết hàng
                        </Badge>
                  }
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        {item.price.toLocaleString("vi-VN")}đ
                      </p>
                    </CardContent>
                  </Card>
                </Link>
            )}
            </div>
          </section>
        }

        {/* All Items Grid */}
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">
            {activeCategory === "all" ?
            "Thực đơn" :
            categories.find((c) => c.id === activeCategory)?.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) =>
            <Link key={item.id} href={`/menu/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group h-full">
                  <div className="relative aspect-square">
                    <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform" />
                  
                    {item.featured &&
                  <Badge className="absolute top-2 left-2 bg-accent" variant="secondary">
                        <Star className="h-3 w-3 mr-1 fill-accent-foreground" />
                        Hot
                      </Badge>
                  }
                    {item.soldOut &&
                  <Badge className="absolute top-2 right-2" variant="destructive">
                        Hết
                      </Badge>
                  }
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-base font-semibold text-primary">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>

          {filteredItems.length === 0 &&
          <div className="text-center py-12">
              <p className="text-muted-foreground">Không tìm thấy món nào</p>
            </div>
          }
        </section>
      </div>

      <CallStaffDialog open={callStaffOpen} onOpenChange={setCallStaffOpen} />
    </div>);

}