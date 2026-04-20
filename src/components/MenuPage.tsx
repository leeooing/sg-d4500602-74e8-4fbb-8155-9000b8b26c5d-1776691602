import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Wifi, Search, Calendar, Bell } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryItems = (categoryId: string) => {
    return menuItems.filter((item) => item.category === categoryId);
  };

  const showCategoryCards = activeCategory === "all" && !searchQuery;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section with Image */}
      <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&q=80"
          alt="SamCamping Cafe"
          className={`w-full h-full object-cover transition-all duration-700 ${
            mounted ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        
        {/* Language Switcher - Floating */}
        <div className={`absolute top-6 right-6 transition-all duration-500 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Info Card - Floating */}
      <div className="container max-w-3xl mx-auto px-4 -mt-16 relative z-10">
        <Card className={`overflow-hidden shadow-xl border-0 transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-foreground mb-2">
                {t("app.name")}
              </h1>
              <p className="text-muted-foreground text-base">
                {t("app.tagline")}
              </p>
            </div>

            {/* Info Icons */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>Làng Cù Lần, Đà Lạt, Lâm Đồng</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <a href="tel:0123456789" className="hover:text-primary transition-colors">
                  012 345 6789
                </a>
              </div>
              {tableId && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Wifi className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">Bàn số {tableId}</span>
                    <span className="ml-2">• WiFi: SamCamping_Guest</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Navigation */}
      <div className={`container max-w-3xl mx-auto px-4 mt-8 transition-all duration-700 delay-100 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveCategory("all")}
            className="whitespace-nowrap rounded-full px-6 transition-all hover:scale-105"
          >
            {t("menu.all")}
          </Button>
          {categories.map((category, idx) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveCategory(category.id)}
              className="whitespace-nowrap rounded-full px-6 transition-all hover:scale-105"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {t(`categories.${category.id}`)}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className={`container max-w-3xl mx-auto px-4 mt-6 transition-all duration-700 delay-200 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t("menu.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-full bg-muted/50 border-0 text-base focus-visible:ring-2 focus-visible:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-3xl mx-auto px-4 mt-8">
        {showCategoryCards ? (
          /* Large Category Cards */
          <div className="space-y-4">
            {categories.map((category, idx) => {
              const items = getCategoryItems(category.id);
              const firstItem = items[0];
              if (!firstItem) return null;

              return (
                <Card
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`overflow-hidden cursor-pointer group transition-all duration-700 hover:shadow-xl border-0 ${
                    mounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={firstItem.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-2 transform transition-transform group-hover:-translate-y-1">
                        {t(`categories.${category.id}`).toUpperCase()}
                      </h2>
                      <p className="text-white/90 text-sm font-medium">
                        {items.length} {items.length === 1 ? "món" : "món"}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Menu Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredItems.map((item, idx) => (
              <Link key={item.id} href={`/menu/${item.id}`}>
                <Card className={`overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer h-full border-0 group ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + idx * 50}ms` }}>
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.bestSeller && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg">
                        {t("menu.bestSeller")}
                      </Badge>
                    )}
                    {item.soldOut && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <Badge variant="destructive" className="text-base px-4 py-2">
                          {t("menu.soldOut")}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="font-bold text-xl text-primary pt-1">
                      {item.price.toLocaleString()}đ
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !showCategoryCards && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">{t("menu.noResults")}</p>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-8 right-6 sm:right-8 flex flex-col gap-3 z-20 transition-all duration-700 delay-500 ${
        mounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}>
        <Button
          size="lg"
          onClick={() => setCallStaffOpen(true)}
          className="rounded-full shadow-2xl h-16 w-16 p-0 transition-all hover:scale-110 hover:shadow-primary/50"
        >
          <Bell className="h-7 w-7" />
        </Button>
        <Link href="/booking">
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full shadow-2xl h-16 w-16 p-0 transition-all hover:scale-110 hover:shadow-accent/50"
          >
            <Calendar className="h-7 w-7" />
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