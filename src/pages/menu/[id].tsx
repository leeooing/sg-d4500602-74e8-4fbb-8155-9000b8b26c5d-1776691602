import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems } from "@/lib/menu-data";

export default function MenuDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const item = menuItems.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Không tìm thấy món</h1>
          <Link href="/">
            <Button>Quay lại menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedItems = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${item.name} - SamCamping Cafe`}
        description={item.description}
        image={item.image}
      />
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="container py-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Menu
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
          {item.bestSeller && (
            <Badge className="absolute top-4 right-4 bg-accent gap-1">
              <Star className="w-3 h-3" fill="currentColor" />
              Best seller
            </Badge>
          )}
          {item.soldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg py-2 px-4">
                Hết hàng
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="container py-6 space-y-6">
          {/* Title & Price */}
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">{item.name}</h1>
            <p className="text-3xl font-bold text-primary">{item.price.toLocaleString()}đ</p>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Mô tả</h2>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>

          {/* Ingredients placeholder */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Thành phần chính</h2>
              <div className="flex flex-wrap gap-2">
                {item.category === "coffee" && (
                  <>
                    <Badge variant="outline">Cà phê Arabica</Badge>
                    <Badge variant="outline">Sữa tươi</Badge>
                    <Badge variant="outline">Đường</Badge>
                  </>
                )}
                {item.category === "tea" && (
                  <>
                    <Badge variant="outline">Trà đen</Badge>
                    <Badge variant="outline">Đường</Badge>
                    <Badge variant="outline">Hương liệu tự nhiên</Badge>
                  </>
                )}
                {item.category === "smoothie" && (
                  <>
                    <Badge variant="outline">Trái cây tươi</Badge>
                    <Badge variant="outline">Đá xay</Badge>
                    <Badge variant="outline">Sữa/Yogurt</Badge>
                  </>
                )}
                {item.category === "cake" && (
                  <>
                    <Badge variant="outline">Bột mì cao cấp</Badge>
                    <Badge variant="outline">Bơ</Badge>
                    <Badge variant="outline">Trứng</Badge>
                  </>
                )}
                {item.category === "juice" && (
                  <>
                    <Badge variant="outline">Trái cây tươi 100%</Badge>
                    <Badge variant="outline">Không đường</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold mb-4">Món tương tự</h2>
              <div className="grid grid-cols-3 gap-3">
                {relatedItems.map((item) => (
                  <Link key={item.id} href={`/menu/${item.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-2">
                        <h3 className="font-semibold text-xs mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-xs font-bold text-primary">{item.price.toLocaleString()}đ</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}