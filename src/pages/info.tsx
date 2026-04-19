import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone as PhoneIcon, Facebook, MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function InfoPage() {
  return (
    <>
      <SEO
        title="Thông tin quán - SamCamping Cafe"
        description="Địa chỉ, giờ mở cửa và thông tin liên hệ SamCamping Cafe"
      />
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="container py-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
            </Link>
          </div>
        </div>

        <div className="container py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl font-bold">SamCamping Cafe</h1>
            <p className="text-muted-foreground">Coffee & Camping Vibes</p>
          </div>

          {/* Location */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold mb-1">Địa chỉ</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    123 Đường Camping<br />
                    Phường Thiên Nhiên, Quận Xanh<br />
                    TP. Hồ Chí Minh
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                    Xem bản đồ →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold mb-2">Giờ mở cửa</h2>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Thứ 2 - Thứ 6</span>
                      <span className="font-medium text-foreground">7:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thứ 7 - Chủ nhật</span>
                      <span className="font-medium text-foreground">6:00 - 23:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold mb-2">Liên hệ</h2>
                  <div className="space-y-2">
                    <a href="tel:0901234567" className="block">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <PhoneIcon className="h-4 w-4" />
                        090 123 4567
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">Kết nối với chúng tôi</h2>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                </a>
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Zalo
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}