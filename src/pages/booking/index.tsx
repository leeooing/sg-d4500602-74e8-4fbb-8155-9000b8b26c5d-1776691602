import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Users, User, Phone, MessageSquare } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { branches, generateBookingCode, type BookingFormData } from "@/lib/booking-data";

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    branchId: "",
    date: "",
    time: "",
    guests: 2,
    name: "",
    phone: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingCode = generateBookingCode();
    const bookingData = {
      ...formData,
      code: bookingCode,
    };
    localStorage.setItem("pending_booking", JSON.stringify(bookingData));
    router.push("/booking/payment");
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <SEO
        title="Đặt bàn - SamCamping Cafe"
        description="Đặt bàn trước tại SamCamping Cafe, thanh toán cọc online nhanh chóng"
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

        <div className="container py-6">
          <div className="max-w-lg mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="font-serif text-3xl font-bold">Đặt bàn</h1>
              <p className="text-muted-foreground">Điền thông tin để đặt bàn trước</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Branch */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Chi nhánh *</Label>
                    <Select
                      value={formData.branchId}
                      onValueChange={(value) => setFormData({ ...formData, branchId: value })}
                      required
                    >
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Chọn chi nhánh" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            <div>
                              <div className="font-medium">{branch.name}</div>
                              <div className="text-xs text-muted-foreground">{branch.address}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Thời gian
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Ngày *</Label>
                      <Input
                        id="date"
                        type="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Giờ *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Số người *</Label>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="guests"
                        type="number"
                        min={1}
                        max={20}
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        required
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Thông tin liên hệ
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ tên *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0901234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="note">Ghi chú</Label>
                      <div className="flex gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-3" />
                        <Textarea
                          id="note"
                          placeholder="Yêu cầu đặc biệt (nếu có)..."
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          className="flex-1 min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deposit Notice */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    💡 Cần đặt cọc <span className="font-bold text-primary">100.000đ</span> để giữ bàn. 
                    Tiền cọc sẽ được trừ vào hóa đơn khi quý khách đến quán.
                  </p>
                </CardContent>
              </Card>

              {/* Submit */}
              <Button type="submit" size="lg" className="w-full">
                Tiếp tục thanh toán cọc
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}