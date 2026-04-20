import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Users, MapPin, UtensilsCrossed, Package, MessageSquare, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BookingData {
  branchId: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  adults: string;
  children: string;
  notes: string;
  service: string;
  foodOption: string;
  combo: string;
  bookingCode?: string;
  createdAt?: string;
  status?: string;
}

const branchNames: Record<string, string> = {
  "branch-1": "Chi nhánh 1 - Trung tâm",
  "branch-2": "Chi nhánh 2 - Quận 7",
};

const serviceNames: Record<string, string> = {
  "table-4": "Thuê bàn ghế 4 người (359.000đ)",
  "table-6": "Thuê bàn ghế 6 người (459.000đ)",
  "table-8": "Thuê bàn ghế 8 người (559.000đ)",
  "kitchen": "Khu bếp của bạn",
};

const foodOptionNames: Record<string, string> = {
  "bring-own": "Mang đồ ăn theo",
  "order-sam": "Đặt đồ ăn bên Sam",
};

const comboNames: Record<string, string> = {
  "combo-2": "COMBO 2 NGƯỜI - CHILL OUT (399.000đ)",
  "combo-4": "COMBO 4 NGƯỜI - GIA ĐÌNH SUM VẦY (799.000đ)",
  "combo-8": "COMBO 8 NGƯỜI - TIỆC BBQ NHÓM (1.499.000đ)",
};

export default function BookingReviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("pendingBooking");
    if (savedData) {
      const data = JSON.parse(savedData);
      setBookingData(data);
    } else {
      router.push("/booking");
    }
  }, [router]);

  const formatDate = (dateStr: string) => {
    // Convert yyyy-mm-dd to dd/mm/yy
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year.slice(2)}`;
  };

  const handleConfirm = () => {
    if (!bookingData) return;
    setLoading(true);

    // Generate short 4-character booking code
    const bookingCode = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Store booking with formatted date
    const finalBooking = {
      ...bookingData,
      date: formatDate(bookingData.date), // Convert to dd/mm/yy for display
      bookingCode,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    localStorage.setItem("currentBooking", JSON.stringify(finalBooking));
    localStorage.removeItem("pendingBooking");

    // Add to history
    const history = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
    history.push(finalBooking);
    localStorage.setItem("bookingHistory", JSON.stringify(history));

    toast({
      title: "Đặt bàn thành công!",
      description: `Mã booking: ${bookingCode}`,
    });

    router.push("/booking/payment");
  };

  const handleEdit = () => {
    router.push("/booking");
  };

  if (!bookingData) {
    return null;
  }

  const totalGuests = parseInt(bookingData.adults || "0") + parseInt(bookingData.children || "0");

  return (
    <>
      <SEO title="Xác nhận đặt bàn - SamCamping Cafe" />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="max-w-[480px] mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/booking">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Xác nhận thông tin</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[480px] mx-auto px-4 py-6 space-y-4">
          {/* Alert */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-sm">Vui lòng kiểm tra thông tin</p>
                  <p className="text-sm text-muted-foreground">
                    Đảm bảo tất cả thông tin chính xác trước khi xác nhận
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin đặt bàn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Branch */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Chi nhánh</p>
                  <p className="font-medium">{branchNames[bookingData.branchId] || "Chưa chọn"}</p>
                </div>
              </div>

              <Separator />

              {/* Date & Time */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Ngày & Giờ</span>
                <span className="font-medium">
                  {formatDate(bookingData.date)} - {bookingData.time}
                </span>
              </div>

              <Separator />

              {/* Guests */}
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Số người</p>
                  <div className="space-y-1">
                    <p className="font-medium">
                      Tổng: {totalGuests} người
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Người lớn: {bookingData.adults}</span>
                      <span>Trẻ em: {bookingData.children}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service & Food */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dịch vụ & Đồ ăn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Dịch vụ</span>
                <span className="font-medium">
                  {bookingData.service === "table-4" && "Thuê bàn ghế 4 người"}
                  {bookingData.service === "table-6" && "Thuê bàn ghế 6 người"}
                  {bookingData.service === "table-8" && "Thuê bàn ghế 8 người"}
                  {bookingData.service === "kitchen" && "Khu bếp của bạn"}
                </span>
              </div>

              <Separator />

              {/* Food Option */}
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Đồ ăn</p>
                  <p className="font-medium">{foodOptionNames[bookingData.foodOption]}</p>
                  {bookingData.foodOption === "order-sam" && bookingData.combo && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="font-normal">
                        {comboNames[bookingData.combo]}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Tên khách hàng</p>
                <p className="font-medium">{bookingData.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">{bookingData.phone}</p>
              </div>
              {bookingData.notes && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Ghi chú</p>
                      <p className="text-sm mt-1">{bookingData.notes}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-background pt-4 pb-6 space-y-3">
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt bàn"}
            </Button>
            <Button
              onClick={handleEdit}
              variant="outline"
              className="w-full h-12 text-base"
              size="lg"
              disabled={loading}
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}