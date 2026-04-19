import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Phone, MapPin, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems, categories } from "@/lib/menu-data";

export function MenuPage() {
  const [activeTab, setActiveTab] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Image */}
      <div className="relative h-[200px] w-full">
        <Image
          src="/Messenger_creation_27A608A3-FDB0-4E2D-9358-ECDDC7E0FEC0.jpg"
          alt="SamCamping Cafe"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content Card */}
      <div className="relative -mt-8 px-4 pb-8">
        <Card className="shadow-xl">
          <CardContent className="p-6 space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-serif font-bold text-foreground">
              SamCamping Menu
            </h1>

            {/* Info Section */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Sau trường cấp 3 Mạc Đĩnh Chi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>0968 088 189</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 shrink-0 text-primary" />
                <span>WiFi: SamCamping | Pass: samcamping68</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              SamCamping không chỉ là nơi ăn uống, mà là điểm hẹn để chậm lại, để thảnh thơi, để kết nối và tận hưởng trọn vẹn cảm giác tự do giữa thiên nhiên, RETREAT !, Coffee & Out Door BBQ.
            </p>

            {/* Tab Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className={activeTab === "main" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}
                onClick={() => setActiveTab("main")}
              >
                Main menu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={activeTab === "bar" ? "border-primary text-primary" : "text-muted-foreground"}
                onClick={() => setActiveTab("bar")}
              >
                Bar
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-muted/50 border-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Cards */}
        <div className="mt-6 space-y-4">
          {categories.map((category) => (
            <Link href={`#${category.id}`} key={category.id}>
              <Card className="overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-[200px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Menu Items by Category */}
        {categories.map((category) => {
          const categoryItems = filteredItems.filter(item => item.category === category.id);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} id={category.id} className="mt-8">
              <h2 className="text-xl font-serif font-bold mb-4 text-foreground">
                {category.name}
              </h2>
              <div className="space-y-3">
                {categoryItems.map((item) => (
                  <Link href={`/menu/${item.id}`} key={item.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 py-3 pr-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground line-clamp-1">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <div className="text-primary font-bold shrink-0">
                                {item.price.toLocaleString()}đ
                              </div>
                            </div>
                            {item.featured && (
                              <Badge className="mt-2 bg-primary/10 text-primary border-0">
                                Best seller
                              </Badge>
                            )}
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

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          samcamping.com
        </div>
      </div>
    </div>
  );
}