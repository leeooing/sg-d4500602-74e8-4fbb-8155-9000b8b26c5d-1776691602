import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Users, Edit2, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/lib/api";

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
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year.slice(2)}`;
  };

  const handleConfirm = async () => {
    if (!bookingData) return;
    setLoading(true);

    try {
      // Create booking in database
      const booking = await createBooking({
        name: bookingData.name,
        phone: bookingData.phone,
        date: formatDate(bookingData.date),
        time: bookingData.time,
        adults: parseInt(bookingData.adults),
        children: parseInt(bookingData.children || "0"),
        service: bookingData.service,
        notes: bookingData.notes,
      });

      // Store booking code for payment page
      localStorage.setItem("currentBookingCode", booking.bookingCode);
      localStorage.removeItem("pendingBooking");

      toast({
        title: "Đặt bàn thành công!",
        description: `Mã booking: ${booking.bookingCode}`,
      });

      router.push("/booking/payment");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đặt bàn. Vui lòng thử lại.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const getServiceLabel = (service: string) => {
    const labels: Record<string, string> = {
      "table-4": "Bàn 4 người",
      "table-6": "Bàn 6 người",
      "table-8": "Bàn 8 người",
      "kitchen": "Khu bếp nướng BBQ",
    };
    return labels[service] || service;
  };

  if (!bookingData) {
    return null;
  }

  return (
    <>
      <SEO
        title="Xác nhận đặt bàn - SamCamping Cafe"
        description="Xem lại thông tin đặt bàn"
      />
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-background border-b sticky top-0 z-10">
          <div className="container max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/booking">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold font-serif">Xác nhận đặt bàn</h1>
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thông tin đặt bàn</CardTitle>
                <Link href="/booking">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Sửa
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date & Time */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Ngày & Giờ</span>
                <span className="font-medium">
                  {formatDate(bookingData.date)} - {bookingData.time}
                </span>
              </div>

              {/* Guests */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Số người</span>
                <span className="font-medium">
                  {parseInt(bookingData.adults) + parseInt(bookingData.children || "0")} người
                  {parseInt(bookingData.children || "0") > 0 && 
                    ` (${bookingData.adults} người lớn, ${bookingData.children} trẻ em)`
                  }
                </span>
              </div>

              {/* Service */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Dịch vụ</span>
                <span className="font-medium">{getServiceLabel(bookingData.service)}</span>
              </div>

              {/* Contact */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Người đặt</span>
                <div className="text-right">
                  <div className="font-medium">{bookingData.name}</div>
                  <div className="text-sm text-muted-foreground">{bookingData.phone}</div>
                </div>
              </div>

              {/* Notes */}
              {bookingData.notes && (
                <div className="py-3 border-b">
                  <div className="text-muted-foreground mb-2">Ghi chú</div>
                  <div className="text-sm">{bookingData.notes}</div>
                </div>
              )}

              {/* Deposit Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="font-semibold">💰 Tiền cọc</div>
                <div className="text-sm text-muted-foreground">
                  Để giữ chỗ, quý khách vui lòng cọc <strong className="text-foreground">100.000đ</strong> sau khi xác nhận đặt bàn.
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleConfirm} 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {loading ? "Đang xử lý..." : "Xác nhận đặt bàn"}
                </Button>
                <Link href="/booking">
                  <Button variant="outline" className="w-full" disabled={loading}>
                    Quay lại chỉnh sửa
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}