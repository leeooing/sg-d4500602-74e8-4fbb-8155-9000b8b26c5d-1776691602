import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Plus, Search, Filter, FileText, Calendar as CalendarIcon, Users, ChevronRight, Download, FileSpreadsheet, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getBookings } from "@/lib/api";
import { exportBookings } from "@/lib/export-utils";

export default function AdminBookingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery) ||
      booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pendingBookings = filteredBookings.filter((b) => b.status === "pending");
  const confirmedBookings = filteredBookings.filter((b) => b.status === "confirmed");
  const rejectedBookings = filteredBookings.filter((b) => b.status === "rejected");
  const expiredBookings = filteredBookings.filter((b) => b.status === "expired");

  const handleExport = (format: "csv" | "excel", status?: string) => {
    let dataToExport = filteredBookings;
    let filename = "tat-ca-bookings";

    if (status) {
      dataToExport = filteredBookings.filter((b) => b.status === status);
      filename = `bookings-${status}`;
    }

    exportBookings(dataToExport, format, filename);
    toast({
      title: "Xuất thành công",
      description: `Đã xuất ${dataToExport.length} booking sang ${format.toUpperCase()}`,
    });
  };

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

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/admin/bookings/${booking.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-semibold text-lg mb-1">#{booking.bookingCode}</div>
            <div className="text-sm text-muted-foreground">{booking.name}</div>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{booking.date} - {booking.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{parseInt(booking.adults) + parseInt(booking.children || "0")} người</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{booking.phone}</span>
          </div>
        </div>

        <div className="flex items-center justify-end mt-3 text-primary">
          <span className="text-sm font-medium">Chi tiết</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <SEO title="Quản lý đơn đặt bàn - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Quản lý đặt bàn</h1>
              <p className="text-muted-foreground">
                Tổng {bookings.length} booking
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Xuất dữ liệu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Xuất CSV (Tất cả)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Xuất Excel (Tất cả)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel", "pending")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Xuất Chờ xác nhận
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel", "confirmed")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Xuất Đã xác nhận
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel", "rejected")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Xuất Từ chối
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã booking, tên, số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">
                Chờ xác nhận ({pendingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Đã xác nhận ({confirmedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Đã từ chối ({rejectedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="expired">
                Hết hạn ({expiredBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    Không có đơn đặt bàn chờ xác nhận
                  </CardContent>
                </Card>
              ) : (
                pendingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              )}
            </TabsContent>

            <TabsContent value="confirmed" className="space-y-4 mt-6">
              {confirmedBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    Không có đơn đặt bàn đã xác nhận
                  </CardContent>
                </Card>
              ) : (
                confirmedBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4 mt-6">
              {rejectedBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    Không có đơn đặt bàn bị từ chối
                  </CardContent>
                </Card>
              ) : (
                rejectedBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              )}
            </TabsContent>

            <TabsContent value="expired" className="space-y-4 mt-6">
              {expiredBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    Không có đơn đặt bàn hết hạn
                  </CardContent>
                </Card>
              ) : (
                expiredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}