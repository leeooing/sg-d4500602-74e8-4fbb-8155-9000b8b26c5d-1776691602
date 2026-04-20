import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle2, 
  XCircle,
  Loader2,
  ImageIcon
} from "lucide-react";
import { getBooking, updateBooking, deleteBooking } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminBookingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    if (id && typeof id === "string") {
      loadBooking(parseInt(id));
    }
  }, [id]);

  const loadBooking = async (bookingId: number) => {
    try {
      const data = await getBooking(bookingId);
      setBooking(data);
      setAdminNote(data.adminNote || "");
    } catch (error) {
      console.error("Failed to load booking:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin booking",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!booking) return;
    setActionLoading(true);

    try {
      await updateBooking(booking.id, {
        status: "confirmed",
        adminNote,
      });

      toast({
        title: "Thành công",
        description: "Đã xác nhận đặt bàn",
      });

      await loadBooking(booking.id);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xác nhận đặt bàn",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!booking) return;
    setActionLoading(true);

    try {
      await updateBooking(booking.id, {
        status: "rejected",
        adminNote,
      });

      toast({
        title: "Đã từ chối",
        description: "Đã từ chối đặt bàn",
      });

      await loadBooking(booking.id);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể từ chối đặt bàn",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!booking) return;

    try {
      await deleteBooking(booking.id);

      toast({
        title: "Đã xóa",
        description: "Đã xóa booking khỏi hệ thống",
      });

      router.push("/admin/bookings");
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa booking",
        variant: "destructive",
      });
    }
  };

  const handleSaveNote = async () => {
    if (!booking) return;

    try {
      await updateBooking(booking.id, {
        adminNote,
      });

      toast({
        title: "Đã lưu",
        description: "Ghi chú đã được cập nhật",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu ghi chú",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!booking) {
    return (
      <AdminLayout>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">Không tìm thấy booking</p>
            <Link href="/admin/bookings">
              <Button>Quay lại danh sách</Button>
            </Link>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "outline" as const, label: "Chờ xác nhận", className: "border-amber-500 text-amber-600" },
      confirmed: { variant: "default" as const, label: "Đã xác nhận", className: "bg-primary" },
      rejected: { variant: "destructive" as const, label: "Đã từ chối", className: "" },
      expired: { variant: "secondary" as const, label: "Hết hạn", className: "" },
    };
    const config = variants[status as keyof typeof variants] || variants.pending;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <>
      <SEO title={`Booking #${booking.bookingCode} - Admin`} />
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/bookings">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-serif">Booking #{booking.bookingCode}</h1>
                <p className="text-muted-foreground">Chi tiết đơn đặt bàn</p>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin khách hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Họ tên:</span>
                    <span className="font-medium">{booking.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Số điện thoại:</span>
                    <a href={`tel:${booking.phone}`} className="font-medium text-primary hover:underline">
                      {booking.phone}
                    </a>
                  </div>
                  {booking.email && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Email:</span>
                      <a href={`mailto:${booking.email}`} className="font-medium text-primary hover:underline">
                        {booking.email}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thông tin đặt bàn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày:</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giờ:</span>
                    <span className="font-medium">{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số người lớn:</span>
                    <span className="font-medium">{booking.adults}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số trẻ em:</span>
                    <span className="font-medium">{booking.children || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dịch vụ:</span>
                    <span className="font-medium">
                      {booking.service === "table-4" && "Bàn 4 người"}
                      {booking.service === "table-6" && "Bàn 6 người"}
                      {booking.service === "table-8" && "Bàn 8 người"}
                      {booking.service === "kitchen" && "Khu bếp"}
                    </span>
                  </div>
                  {booking.notes && (
                    <div>
                      <span className="text-muted-foreground">Ghi chú:</span>
                      <p className="mt-1 p-3 bg-muted rounded-md">{booking.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ghi chú admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Thêm ghi chú nội bộ..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleSaveNote} variant="outline" size="sm">
                    Lưu ghi chú
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {booking.paymentProof && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bill chuyển khoản</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={booking.paymentProof}
                        alt="Bill"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {booking.status === "pending" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Hành động</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleConfirm}
                      disabled={actionLoading}
                      className="w-full gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      Xác nhận đặt bàn
                    </Button>
                    <Button
                      onClick={handleReject}
                      disabled={actionLoading}
                      variant="destructive"
                      className="w-full gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      Từ chối
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Xóa booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Hành động này không thể hoàn tác. Booking sẽ bị xóa vĩnh viễn.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Xóa booking
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc muốn xóa booking #{booking.bookingCode}? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}