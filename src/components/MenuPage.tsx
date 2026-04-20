import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Wifi, Search as SearchIcon, Calendar, Bell } from "lucide-react";
import { menuItems, categories } from "@/lib/menu-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CallStaffDialog } from "@/components/CallStaffDialog";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/contexts/LanguageContext";

interface MenuPageProps {
  tableId?: string;
}

export function MenuPage({ tableId }: MenuPageProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [callStaffOpen, setCallStaffOpen] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Count items per category
  const getCategoryCount = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <div className="relative h-[200px] sm:h-[250px] overflow-hidden">
        <img
          src="/hedaer.jpeg"
          alt="SamCamping Cafe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        
        {/* Language Switcher - Top Right */}
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-2xl mx-auto px-4 -mt-8 relative z-10 pb-24">
        {/* Info Card */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            {/* Title */}
            <h1 className="text-3xl font-bold font-serif mb-4">
              {t("app.name")}
            </h1>

            {/* Info Items */}
            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Bảo Lộc, Lâm Đồng, Việt Nam</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>0909 123 456</span>
              </div>
              {tableId && (
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 flex-shrink-0" />
                  <span>Bàn số {tableId}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("app.tagline")}. Thưởng thức cà phê chất lượng trong không gian xanh mát, 
              lý tưởng cho camping và picnic cuối tuần.
            </p>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            className="rounded-full whitespace-nowrap"
          >
            {t("menu.all")}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full whitespace-nowrap"
            >
              {t(`categories.${category.id}`)}
            </Button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t("menu.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-muted/50 border-0"
          />
        </div>

        {/* Category Cards - Large Image Style */}
        {activeCategory === "all" && !searchQuery && (
          <div className="space-y-4 mb-6">
            {categories.map((category) => {
              const categoryItems = menuItems.filter(item => item.category === category.id);
              const firstItem = categoryItems[0];
              if (!firstItem) return null;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="w-full group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={firstItem.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-white text-2xl font-bold uppercase tracking-wide mb-1">
                            {t(`categories.${category.id}`)}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {getCategoryCount(category.id)} món
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        )}

        {/* Menu Items Grid - When category selected or searching */}
        {(activeCategory !== "all" || searchQuery) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Link key={item.id} href={`/menu/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full hover:scale-105 transition-transform"
                    />
                    {item.bestSeller && (
                      <Badge className="absolute top-2 left-2 bg-primary">
                        {t("menu.bestSeller")}
                      </Badge>
                    )}
                    {item.soldOut && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">{t("menu.soldOut")}</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="font-bold text-primary">
                      {item.price.toLocaleString()}đ
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {t("menu.noResults")}
          </div>
        )}

        {/* Footer Branding */}
        <div className="text-center mt-12 pb-6">
          <p className="text-xs text-muted-foreground">
            Powered by SamCamping Cafe
          </p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
        <Button
          size="lg"
          onClick={() => setCallStaffOpen(true)}
          className="rounded-full shadow-lg h-14 w-14 p-0"
        >
          <Bell className="h-6 w-6" />
        </Button>
        <Link href="/booking">
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full shadow-lg h-14 w-14 p-0"
          >
            <Calendar className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* Call Staff Dialog */}
      <CallStaffDialog
        open={callStaffOpen}
        onOpenChange={setCallStaffOpen}
        tableId={tableId}
      />
    </div>
  );
}