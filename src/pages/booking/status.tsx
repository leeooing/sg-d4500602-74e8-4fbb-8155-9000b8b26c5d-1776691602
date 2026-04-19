import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Check, Clock, X, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { branches } from "@/lib/booking-data";

export default function BookingStatusPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("current_booking");
    if (stored) {
      const data = JSON.parse(stored);
      setBookingData(data);
      
      // Simulate admin confirmation after 5 seconds for demo
      if (data.status === "pending_confirmation") {
        setTimeout(() => {
          const updated = { ...data, status: "confirmed" };
          localStorage.setItem("current_booking", JSON.stringify(updated));
          setBookingData(updated);
        }, 5000);
      }
    } else {
      router.push("/booking");
    }
  }, [router]);

  if (!bookingData) return null;

  const branch = branches.find((b) => b.id === bookingData.branchId);
  const status = bookingData.status;

  return (
    <>
      <SEO
        title="Trạng thái đặt bàn - SamCamping Cafe"
        description="Kiểm tra trạng thái đặt bàn của bạn"
      />
      <div className="min-h-screen bg-background pb-8">
        <div className="container py-8">
          <div className="max-w-lg mx-auto space-y-6">
            {/* Pending Confirmation */}
            {status === "pending_confirmation" && (
              <>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
                    <Clock className="h-10 w-10 text-amber-500 animate-pulse" />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold mb-2">Chờ xác nhận</h1>
                    <Badge variant="outline" className="text-lg px-4 py-1">
                      {bookingData.code}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Quán đang kiểm tra bill của bạn.<br/>
                    Thông báo xác nhận sẽ gửi đến số điện thoại đăng ký trong ít phút.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold">Thông tin đặt bàn</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Chi nhánh:</span>
                        <span className="font-medium">{branch?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thời gian:</span>
                        <span className="font-medium">
                          {new Date(bookingData.date).toLocaleDateString("vi-VN")} - {bookingData.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số người:</span>
                        <span className="font-medium">{bookingData.guests} người</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      💡 Quán sẽ kiểm tra và xác nhận đặt bàn trong vòng 30 phút. 
                      Nếu có vấn đề, nhân viên sẽ liên hệ qua số điện thoại bạn đã đăng ký.
                    </p>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Confirmed */}
            {status === "confirmed" && (
              <>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Check className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold mb-2 text-primary">Đặt bàn thành công!</h1>
                    <Badge className="text-lg px-4 py-1 bg-primary">
                      {bookingData.code}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Đặt bàn của bạn đã được xác nhận.<br/>
                    Hẹn gặp bạn tại quán!
                  </p>
                </div>

                <Card className="border-primary/20">
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold">Thông tin đặt bàn</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Chi nhánh:</span>
                        <span className="font-medium">{branch?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Địa chỉ:</span>
                        <span className="font-medium text-right">{branch?.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thời gian:</span>
                        <span className="font-medium">
                          {new Date(bookingData.date).toLocaleDateString("vi-VN")} - {bookingData.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số người:</span>
                        <span className="font-medium">{bookingData.guests} người</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tên:</span>
                        <span className="font-medium">{bookingData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SĐT:</span>
                        <span className="font-medium">{bookingData.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      ✅ Tiền cọc 100.000đ sẽ được trừ vào hóa đơn khi bạn đến quán.
                    </p>
                  </CardContent>
                </Card>

                <Link href="/">
                  <Button size="lg" className="w-full">
                    Quay về menu
                  </Button>
                </Link>
              </>
            )}

            {/* Rejected */}
            {status === "rejected" && (
              <>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                    <X className="h-10 w-10 text-destructive" />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold mb-2 text-destructive">Đặt bàn chưa thành công</h1>
                    <Badge variant="outline" className="text-lg px-4 py-1">
                      {bookingData.code}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Rất tiếc, chúng tôi không thể xác nhận đặt bàn của bạn do:<br/>
                    <span className="font-medium text-foreground">
                      {bookingData.rejectReason || "Thông tin chuyển khoản không khớp"}
                    </span>
                  </p>
                </div>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold">Thông tin đặt bàn</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Chi nhánh:</span>
                        <span className="font-medium">{branch?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thời gian:</span>
                        <span className="font-medium">
                          {new Date(bookingData.date).toLocaleDateString("vi-VN")} - {bookingData.time}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold mb-2">Bạn có thể:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Đặt bàn lại với thông tin chính xác</li>
                      <li>Liên hệ hotline để được hỗ trợ</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-3">
                  <Link href="/booking">
                    <Button variant="outline" size="lg" className="w-full">
                      Đặt bàn lại
                    </Button>
                  </Link>
                  <a href="tel:0901234567">
                    <Button size="lg" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Liên hệ
                    </Button>
                  </a>
                </div>
              </>
            )}

            {/* Expired */}
            {status === "expired" && (
              <>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
                    <Clock className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold mb-2">Đặt bàn đã hết hạn</h1>
                    <Badge variant="outline" className="text-lg px-4 py-1">
                      {bookingData.code}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Đặt bàn này đã quá thời gian xác nhận và tự động hủy.
                  </p>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      💡 Vui lòng đặt bàn lại hoặc liên hệ hotline nếu cần hỗ trợ.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-3">
                  <Link href="/booking">
                    <Button variant="outline" size="lg" className="w-full">
                      Đặt bàn lại
                    </Button>
                  </Link>
                  <a href="tel:0901234567">
                    <Button size="lg" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Liên hệ
                    </Button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}