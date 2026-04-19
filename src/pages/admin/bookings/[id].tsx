import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, User, Phone, Calendar, Clock, MapPin, FileText, Image as ImageIcon, Check, X } from "lucide-react";

// Mock data
const mockBooking = {
  id: "BK001",
  code: "SC20260420001",
  customer: "Nguyễn Văn A",
  phone: "0901234567",
  branch: "SamCamping Quận 1",
  address: "123 Nguyễn Huệ, Q1, HCM",
  date: "2026-04-20",
  time: "18:00",
  guests: 4,
  notes: "Cần bàn gần cửa sổ",
  status: "paymentsubmitted",
  createdAt: "2026-04-19T10:30:00",
  deposit: {
    amount: 200000,
    bank: "Vietcombank",
    accountNumber: "1234567890",
    accountName: "NGUYEN VAN A",
    content: "SAMCAMPING SC20260420001",
    billImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
  },
};

const statusConfig = {
  pendingpayment: { label: "Chờ cọc", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  paymentsubmitted: { label: "Đã gửi bill", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  confirmed: { label: "Đã xác nhận", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  cancelled: { label: "Đã hủy", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
};

export default function BookingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [booking] = useState(mockBooking);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = () => {
    if (confirm("Xác nhận booking này?")) {
      alert("Booking đã được xác nhận!");
      router.push("/admin/bookings");
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }
    alert(`Booking đã bị từ chối. Lý do: ${rejectReason}`);
    setRejectDialogOpen(false);
    router.push("/admin/bookings");
  };

  return (
    <AdminLayout>
      <SEO title={`Booking ${booking.code} - SamCamping Admin`} />
      <div className="p-8">
        <div className="mb-8">
          <Link href="/admin/bookings">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Booking {booking.code}</h1>
              <p className="text-muted-foreground mt-1">Chi tiết đặt bàn</p>
            </div>
            <Badge className={statusConfig[booking.status as keyof typeof statusConfig].color}>
              {statusConfig[booking.status as keyof typeof statusConfig].label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Tên khách</p>
                  <p className="font-medium">{booking.customer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Số điện thoại</p>
                  <p className="font-medium">{booking.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đặt bàn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Chi nhánh</p>
                  <p className="font-medium">{booking.branch}</p>
                  <p className="text-sm text-muted-foreground">{booking.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Ngày & giờ</p>
                  <p className="font-medium">{booking.date} • {booking.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Số người</p>
                  <p className="font-medium">{booking.guests} người</p>
                </div>
              </div>
              {booking.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ghi chú</p>
                    <p className="font-medium">{booking.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deposit Info */}
          {booking.status === "paymentsubmitted" && booking.deposit && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cọc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Số tiền cọc</p>
                    <p className="font-semibold text-lg text-primary">
                      {booking.deposit.amount.toLocaleString()}đ
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngân hàng</p>
                    <p className="font-medium">{booking.deposit.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Số tài khoản</p>
                    <p className="font-medium font-mono">{booking.deposit.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Chủ tài khoản</p>
                    <p className="font-medium">{booking.deposit.accountName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nội dung chuyển khoản</p>
                    <p className="font-medium font-mono">{booking.deposit.content}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Bill Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Bill chuyển khoản</CardTitle>
                  <CardDescription>Ảnh bill khách gửi lên</CardDescription>
                </CardHeader>
                <CardContent>
                  {booking.deposit.billImage ? (
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={booking.deposit.billImage}
                        alt="Bill chuyển khoản"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mb-2" />
                      <p className="text-sm">Chưa có bill</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Actions */}
        {booking.status === "paymentsubmitted" && (
          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setRejectDialogOpen(true)}
            >
              <X className="h-5 w-5 mr-2" />
              Từ chối
            </Button>
            <Button
              size="lg"
              onClick={handleApprove}
            >
              <Check className="h-5 w-5 mr-2" />
              Xác nhận booking
            </Button>
          </div>
        )}
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối booking</DialogTitle>
            <DialogDescription>
              Vui lòng nhập lý do từ chối để gửi cho khách
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="reason">Lý do từ chối</Label>
            <Textarea
              id="reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="VD: Bill không khớp số tiền, thời gian đã full..."
              rows={4}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Từ chối booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}