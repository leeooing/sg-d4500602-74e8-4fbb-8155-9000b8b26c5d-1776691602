import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone, User, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data
const stats = {
  newBookings: 5,
  pendingPayment: 3,
  paymentSubmitted: 7,
  confirmed: 12,
  staffRequests: 4,
};

const recentBookings = [
  {
    id: "BK001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    date: "2026-04-20",
    time: "18:00",
    guests: 4,
    status: "paymentsubmitted",
  },
  {
    id: "BK002",
    customer: "Trần Thị B",
    phone: "0912345678",
    date: "2026-04-21",
    time: "19:30",
    guests: 2,
    status: "pendingpayment",
  },
  {
    id: "BK003",
    customer: "Lê Văn C",
    phone: "0923456789",
    date: "2026-04-20",
    time: "20:00",
    guests: 6,
    status: "confirmed",
  },
];

const staffRequests = [
  { table: "B05", type: "Gọi nhân viên", time: "2 phút trước" },
  { table: "B12", type: "Thanh toán", time: "5 phút trước" },
  { table: "B08", type: "Hỗ trợ khác", time: "8 phút trước" },
];

const statusColors = {
  pendingpayment: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  paymentsubmitted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const statusLabels = {
  pendingpayment: "Chờ cọc",
  paymentsubmitted: "Đã gửi bill",
  confirmed: "Đã xác nhận",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <SEO title="Dashboard - SamCamping Admin" />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Tổng quan hoạt động quán</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Link href="/admin/bookings?status=new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardDescription>Booking mới</CardDescription>
                <CardTitle className="text-3xl text-primary">{stats.newBookings}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/admin/bookings?status=pendingpayment">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardDescription>Chờ cọc</CardDescription>
                <CardTitle className="text-3xl text-yellow-600">{stats.pendingPayment}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/admin/bookings?status=paymentsubmitted">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardDescription>Đã gửi bill</CardDescription>
                <CardTitle className="text-3xl text-blue-600">{stats.paymentSubmitted}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/admin/bookings?status=confirmed">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardDescription>Đã xác nhận</CardDescription>
                <CardTitle className="text-3xl text-green-600">{stats.confirmed}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/admin/requests">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardDescription>Yêu cầu gọi NV</CardDescription>
                <CardTitle className="text-3xl text-destructive">{stats.staffRequests}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Bookings gần đây</CardTitle>
                <Link href="/admin/bookings">
                  <Button variant="ghost" size="sm">
                    Xem tất cả
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.map((booking) => (
                <Link key={booking.id} href={`/admin/bookings/${booking.id}`}>
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{booking.customer}</span>
                        </div>
                        <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                          {statusLabels[booking.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {booking.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {booking.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Staff Requests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Yêu cầu gọi nhân viên</CardTitle>
                <Link href="/admin/requests">
                  <Button variant="ghost" size="sm">
                    Xem tất cả
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {staffRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {request.table}
                      </Badge>
                      <span className="font-medium">{request.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.time}</p>
                  </div>
                  <Button size="sm">Xử lý</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}