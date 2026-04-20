import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Search, Calendar, Info, Phone, Bell } from "lucide-react";
import { menuItems, categories } from "@/lib/menu-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CallStaffDialog } from "@/components/CallStaffDialog";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface MenuPageProps {
  tableId?: string;
}

export function MenuPage({ tableId }: MenuPageProps) {
  const { t } = useTranslation("common");
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold font-serif">{t("app.name")}</h1>
              {tableId && (
                <p className="text-sm text-primary-foreground/80">
                  Bàn số {tableId}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <LanguageSwitcher />
              <Link href="/info">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Info className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/bookings">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Calendar className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t("menu.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </div>

      {/* Categories - Horizontal Scroll */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="whitespace-nowrap rounded-full"
            >
              {t("menu.all")}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap rounded-full"
              >
                {t(`categories.${category.id}`)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container max-w-2xl mx-auto px-4 py-6">
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

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {t("menu.noResults")}
          </div>
        )}
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