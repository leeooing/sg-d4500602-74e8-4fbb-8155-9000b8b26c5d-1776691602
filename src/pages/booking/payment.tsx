import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Copy, CheckCircle2, CreditCard, Check } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getBookingByCode } from "@/lib/api";

const depositAmount = 100000;
const bankInfo = {
  bank: "Techcombank",
  accountNumber: "1903666888999",
  accountName: "SAMCAMPING CAFE",
};

export default function BookingPaymentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    const loadBooking = async () => {
      const code = localStorage.getItem("currentBookingCode");
      if (!code) {
        router.push("/booking");
        return;
      }

      try {
        const booking = await getBookingByCode(code);
        if (booking) {
          setBookingData(booking);
        } else {
          router.push("/booking");
        }
      } catch (error) {
        console.error("Failed to load booking:", error);
        router.push("/booking");
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [router]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
    toast({
      variant: "default",
      title: `Đã sao chép`,
      description: text,
    });
  };

  const handleConfirmPayment = () => {
    router.push("/booking/upload");
  };

  if (loading || !bookingData) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      </div>
    );
  }

  const transferContent = `SAMCAMPING ${bookingData.bookingCode}`;

  return (
    <>
      <SEO
        title="Thông tin chuyển khoản - SamCamping Cafe"
        description="Chuyển khoản đặt cọc để hoàn tất đặt bàn tại SamCamping Cafe"
      />
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="container py-4">
            <Link href="/booking">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
            </Link>
          </div>
        </div>

        <div className="container py-6">
          <div className="max-w-lg mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-2xl font-bold">Thông tin chuyển khoản</h1>
              <Badge variant="outline" className="text-lg px-4 py-1">
                {bookingData.bookingCode}
              </Badge>
            </div>

            {/* Booking Summary */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold mb-3">Thông tin đặt bàn</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày & Giờ:</span>
                    <span className="font-medium">
                      {bookingData.date} - {bookingData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số người:</span>
                    <span className="font-medium">
                      {parseInt(bookingData.adults) + parseInt(bookingData.children || "0")} người
                      {parseInt(bookingData.children || "0") > 0 && 
                        ` (${bookingData.adults} người lớn, ${bookingData.children} trẻ em)`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dịch vụ:</span>
                    <span className="font-medium">
                      {bookingData.service === "table-4" && "Bàn 4 người"}
                      {bookingData.service === "table-6" && "Bàn 6 người"}
                      {bookingData.service === "table-8" && "Bàn 8 người"}
                      {bookingData.service === "kitchen" && "Khu bếp"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Amount */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Số tiền cần chuyển</p>
                <p className="text-4xl font-bold text-primary">{depositAmount.toLocaleString()}đ</p>
              </CardContent>
            </Card>

            {/* Bank Info */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold mb-3">Thông tin ngân hàng</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Ngân hàng</Label>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{bankInfo.bank}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Số tài khoản</Label>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{bankInfo.accountNumber}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(bankInfo.accountNumber, "account")}
                      >
                        {copied === "account" ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chủ tài khoản</Label>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{bankInfo.accountName}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nội dung chuyển khoản</Label>
                    <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <span className="font-bold text-primary">{transferContent}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(transferContent, "content")}
                      >
                        {copied === "content" ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-primary" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ⚠️ <span className="font-semibold">Lưu ý quan trọng:</span> Vui lòng chuyển khoản 
                  chính xác <span className="font-bold">nội dung</span> và <span className="font-bold">số tiền</span> để 
                  hệ thống tự động xác nhận đặt bàn của bạn.
                </p>
              </CardContent>
            </Card>

            {/* Action */}
            <Button size="lg" className="w-full" onClick={handleConfirmPayment}>
              Tôi đã chuyển khoản
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-muted-foreground">{children}</p>;
}