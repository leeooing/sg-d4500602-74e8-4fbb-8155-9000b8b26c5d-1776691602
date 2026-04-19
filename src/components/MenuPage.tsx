import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Info, Calendar, Star, MapPin, Wifi, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems, categories } from "@/lib/menu-data";

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [callStaffOpen, setCallStaffOpen] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesCategory;
  });

  const featuredItems = menuItems.filter((item) => item.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-First Container - max-width on desktop */}
      <div className="mx-auto max-w-[480px]">
        {/* Hero Header with Cover Image */}
        <div className="relative h-[280px]">
          <Image
            src="/Messenger_creation_27A608A3-FDB0-4E2D-9358-ECDDC7E0FEC0.jpg"
            alt="SamCamping Cafe"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Main Content Card */}
        <div className="px-4 -mt-8 relative z-10">
          <Card className="bg-white shadow-lg rounded-3xl border-0">
            <CardContent className="p-6 space-y-5">
              {/* Title */}
              <h1 className="text-2xl font-serif font-bold text-foreground text-center">
                SamCamping Menu
              </h1>

              {/* Info Section */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Sau trường cấp 3 Mạc Đỉnh Chi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>0968 088 189</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 shrink-0" />
                  <span>WiFi: SamCamping | Pass: samcamping68</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                SamCamping không chỉ là nơi ăn uống, mà là điểm hẹn để chậm lại, để thảnh thơi, để kết nối và tận hưởng trọn vẹn cảm giác tự do giữa thiên nhiên, RETREAT !, Coffee & Out Door BBQ.
              </p>

              {/* Tab Buttons */}
              <div className="flex gap-3">
                <Link href="/booking" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm"
                  >
                    Đặt bàn
                  </Button>
                </Link>
                <a 
                  href="https://m.me/samcamping" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full border-2 border-primary text-primary hover:bg-primary/5 font-semibold"
                  >
                    Tư vấn
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Category Cards */}
          <div className="mt-6 space-y-4">
            {categories.filter(c => c.id !== "all").map((category) => (
              <Link href={`#${category.id}`} key={category.id} className="block">
                <div className="relative h-[180px] w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-2xl font-medium text-white uppercase tracking-wider drop-shadow-md">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Menu Items by Category */}
          <div className="mt-12 space-y-12 pb-8">
            {categories.filter(c => c.id !== "all").map((category) => {
              const categoryItems = filteredItems.filter(item => item.category === category.id);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id} id={category.id} className="scroll-mt-6">
                  <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                    {categoryItems.map((item) => (
                      <Link href={`/menu/${item.id}`} key={item.id} className="block">
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm rounded-2xl">
                          <CardContent className="p-0">
                            <div className="flex gap-4 p-3">
                              <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 py-1 pr-1">
                                <div className="flex flex-col h-full justify-between">
                                  <div className="space-y-1">
                                    <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                                      {item.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-snug">
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="text-primary font-bold text-lg">
                                      {item.price.toLocaleString()}đ
                                    </div>
                                    {item.featured && (
                                      <Badge className="bg-primary/10 text-primary border-0 rounded-full">
                                        Hot
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            samcamping.com
          </div>
        </div>
      </div>
    </div>
  );
}