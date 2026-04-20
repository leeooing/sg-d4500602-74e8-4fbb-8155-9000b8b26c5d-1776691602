import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle2, Loader2, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getBookingByCode, updateBooking } from "@/lib/api";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function BookingUploadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [billImage, setBillImage] = useState<string>("");

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
          if (booking.paymentProof) {
            setBillImage(booking.paymentProof);
          }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBillImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!billImage) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ảnh bill",
        variant: "destructive",
      });
      return;
    }

    if (!bookingData) return;

    setUploading(true);

    try {
      await updateBooking(bookingData.id, {
        paymentProof: billImage,
      });

      toast({
        title: "Thành công",
        description: "Đã gửi bill thành công!",
      });

      router.push(`/booking/status?code=${bookingData.bookingCode}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi bill. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
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

  return (
    <>
      <SEO
        title="Gửi bill chuyển khoản - SamCamping Cafe"
        description="Upload ảnh bill để xác nhận đặt bàn"
      />
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="container py-4">
            <Link href="/booking/payment">
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
              <h1 className="font-serif text-2xl font-bold">Gửi bill chuyển khoản</h1>
              <Badge variant="outline" className="px-4 py-1">
                {bookingData.code}
              </Badge>
            </div>

            {/* Upload Area */}
            <Card>
              <CardContent className="p-6">
                {!billImage ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium mb-1">Tải ảnh bill chuyển khoản</p>
                        <p className="text-sm text-muted-foreground">
                          Chụp ảnh hoặc screenshot giao dịch
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                      <Image
                        src={billImage}
                        alt="Bill preview"
                        fill
                        className="object-contain bg-muted"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm font-semibold mb-2">Lưu ý khi chụp bill:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Chụp rõ thông tin giao dịch</li>
                  <li>Đảm bảo thấy số tiền và nội dung chuyển khoản</li>
                  <li>Ảnh không bị mờ hoặc tối</li>
                </ul>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={!billImage || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                "Gửi bill"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}