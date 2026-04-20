import { useState, useEffect } from "react";
import Link from "next/link";
import { Info, Bell, Calendar, ChevronRight, Globe, Search, ArrowUp, ChevronDown } from "lucide-react";
import { menuItems, categories } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { CallStaffDialog } from "@/components/CallStaffDialog";
import { useLanguage, useTranslation } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuPageProps {
  tableId?: string;
}

type LanguageCode = "vi" | "en" | "ko" | "zh" | "ja";

const languages: { code: LanguageCode; name: string; flag: string }[] = [
  { code: "vi", name: "Ngôn ngữ", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export function MenuPage({ tableId }: MenuPageProps) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [callStaffOpen, setCallStaffOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`category-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32 font-sans font-medium text-foreground">
      {/* Hero Cover Image */}
      <div className="relative h-[220px] sm:h-[280px] w-full max-w-3xl mx-auto overflow-visible rounded-b-3xl sm:rounded-b-none shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=80"
          alt="Sam Camping"
          className="w-full h-full object-cover rounded-b-2xl sm:rounded-none"
        />
        <div className="absolute inset-0 bg-black/40 rounded-b-2xl sm:rounded-none" />
        
        {/* Title inside cover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
            Sam Camping
          </h1>
        </div>

        {/* Circular Logo overlapping bottom edge */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-background rounded-full p-1 shadow-md z-10">
          <div className="w-full h-full bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <img src="/logosamcamping.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 mt-14">
        {/* Info Banner */}
        <Link href="/info">
          <div className="bg-secondary/70 hover:bg-secondary transition-colors rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-foreground text-background rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs font-bold font-serif">
                i
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("nav.info")}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Wi-Fi, Điện thoại, Facebook và nhiều hơn nữa
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Link>

        {/* Categories Pill Tags */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Chọn danh mục</h2>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="px-4 py-2 bg-secondary/80 hover:bg-secondary text-sm font-semibold rounded-xl transition-all"
              >
                {t(`categories.${cat.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Rendered by Category Sections */}
        <div className="mt-10 space-y-12">
          {categories.map((category) => {
            const items = menuItems.filter((i) => i.category === category.id);
            if (items.length === 0) return null;

            return (
              <div key={category.id} id={`category-${category.id}`} className="scroll-mt-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-primary">{t(`categories.${category.id}`)}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.id === "coffee" ? "Cà phê có hương vị đất với hương thực vật rừng" : 
                     category.id === "tea" ? "Trà thảo mộc tươi mát từ thiên nhiên" :
                     "Hương vị nguyên bản từ núi rừng"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {items.map((item) => (
                    <Link key={item.id} href={`/menu/${item.id}`} className="group block">
                      <div className="flex flex-col h-full">
                        {/* Image without card borders */}
                        <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-secondary/50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-bold text-[13px] sm:text-sm uppercase leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          
                          {/* Tags row */}
                          <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2">
                            {item.bestSeller && (
                              <span className="text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                HOT
                              </span>
                            )}
                            <span className="text-[10px] text-primary flex items-center gap-0.5 font-bold">
                              🌿 Thuần chay
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="mt-auto font-bold text-sm">
                            {item.price.toLocaleString()} đ
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Yumzi style Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex flex-col items-center justify-end pointer-events-none">
        <div className="w-full max-w-3xl flex flex-col items-end gap-3 pointer-events-auto">
          {/* Scroll to Top button */}
          <button
            onClick={scrollToTop}
            className={`w-10 h-10 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-md ${
              showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          {/* Main Floating Bar */}
          <div className="w-full h-14 bg-primary/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-between px-2">
            
            <div className="flex items-center h-full">
              {/* Language Switcher inside bottom bar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-full px-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors rounded-l-full">
                    <span className="text-lg">A/文</span>
                    <span className="text-sm font-semibold">{t("Ngôn ngữ")}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40 rounded-2xl shadow-xl border-0 mb-2">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex items-center gap-3 py-3 px-4 cursor-pointer rounded-xl transition-all ${
                        language === lang.code ? "bg-primary text-white font-medium" : ""
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-px h-6 bg-white/20 mx-1"></div>

              {/* Call Staff */}
              <button 
                onClick={() => setCallStaffOpen(true)}
                className="h-full px-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm font-semibold">Gọi nhân viên</span>
              </button>
            </div>

            <div className="flex items-center gap-1 pr-1 h-full py-1.5">
              {/* Booking */}
              <Link href="/booking" className="h-full">
                <button className="h-full aspect-square flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
              </Link>
              
              {/* Search */}
              <button className="h-full aspect-square flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <CallStaffDialog
        open={callStaffOpen}
        onOpenChange={setCallStaffOpen}
        tableId={tableId}
      />
    </div>
  );
}