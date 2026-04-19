import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, Calendar, Clock, User, Phone } from "lucide-react";
import Link from "next/link";

// Mock data
const mockBookings = [
  {
    id: "BK001",
    code: "SC20260420001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    branch: "SamCamping Quận 1",
    date: "2026-04-20",
    time: "18:00",
    guests: 4,
    notes: "Cần bàn gần cửa sổ",
    status: "paymentsubmitted",
    createdAt: "2026-04-19T10:30:00",
  },
  {
    id: "BK002",
    code: "SC20260421001",
    customer: "Trần Thị B",
    phone: "0912345678",
    branch: "SamCamping Quận 3",
    date: "2026-04-21",
    time: "19:30",
    guests: 2,
    notes: "",
    status: "pendingpayment",
    createdAt: "2026-04-19T11:00:00",
  },
  {
    id: "BK003",
    code: "SC20260420002",
    customer: "Lê Văn C",
    phone: "0923456789",
    branch: "SamCamping Quận 1",
    date: "2026-04-20",
    time: "20:00",
    guests: 6,
    notes: "Sinh nhật",
    status: "confirmed",
    createdAt: "2026-04-18T15:00:00",
  },
  {
    id: "BK004",
    code: "SC20260422001",
    customer: "Phạm Thị D",
    phone: "0934567890",
    branch: "SamCamping Quận 1",
    date: "2026-04-22",
    time: "12:00",
    guests: 3,
    notes: "",
    status: "cancelled",
    createdAt: "2026-04-19T09:00:00",
  },
];

const statusConfig = {
  pendingpayment: { label: "Chờ cọc", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  paymentsubmitted: { label: "Đã gửi bill", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  confirmed: { label: "Đã xác nhận", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  cancelled: { label: "Đã hủy", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
  completed: { label: "Hoàn thành", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
  no_show: { label: "No show", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  expired: { label: "Hết hạn", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
};

export default function AdminBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = 
      booking.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery);
    
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <AdminLayout>
      <SEO title="Bookings - SamCamping Admin" />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">Quản lý đặt bàn</p>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã, tên, SĐT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="pendingpayment">Chờ cọc</TabsTrigger>
              <TabsTrigger value="paymentsubmitted">Đã gửi bill</TabsTrigger>
              <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
              <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
              <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {filteredBookings.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        Không tìm thấy booking nào
                      </div>
                    ) : (
                      filteredBookings.map((booking) => (
                        <Link key={booking.id} href={`/admin/bookings/${booking.id}`}>
                          <div className="p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="font-mono">
                                    {booking.code}
                                  </Badge>
                                  <Badge className={statusConfig[booking.status as keyof typeof statusConfig].color}>
                                    {statusConfig[booking.status as keyof typeof statusConfig].label}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span className="font-medium text-foreground">{booking.customer}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    {booking.phone}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {booking.date}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {booking.time} • {booking.guests} người
                                  </div>
                                </div>

                                {booking.notes && (
                                  <p className="text-sm text-muted-foreground italic">
                                    Ghi chú: {booking.notes}
                                  </p>
                                )}
                              </div>

                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                Chi tiết
                              </Button>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}