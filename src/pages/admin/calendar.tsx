import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Users, Phone, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { getBookings } from "@/lib/api";
import { useRouter } from "next/router";

export default function AdminCalendarPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<any[]>([]);
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

  const selectedDateStr = format(date, "dd/MM/yy");
  const filteredBookings = bookings.filter((b) => b.date === selectedDateStr);

  const todayStr = format(new Date(), "dd/MM/yy");
  const todayBookings = bookings.filter((b) => b.date === todayStr);
  const pendingCount = todayBookings.filter((b) => b.status === "pending").length;
  const confirmedCount = todayBookings.filter((b) => b.status === "confirmed").length;
  const rejectedCount = todayBookings.filter((b) => b.status === "rejected").length;

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

  const StatCard = ({ title, value, color }: any) => (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
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
      <SEO title="Lịch đặt bàn - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2">Lịch đặt bàn</h1>
            <p className="text-muted-foreground">Xem lịch booking theo ngày</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <StatCard title="Tổng booking hôm nay" value={todayBookings.length} color="" />
            <StatCard title="Chờ xác nhận" value={pendingCount} color="text-amber-600" />
            <StatCard title="Đã xác nhận" value={confirmedCount} color="text-primary" />
            <StatCard title="Đã hủy" value={rejectedCount} color="text-destructive" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Chọn ngày</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  locale={vi}
                  className="rounded-md border"
                />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setDate(new Date())}
                >
                  Hôm nay
                </Button>
              </CardContent>
            </Card>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Booking ngày {format(date, "dd/MM/yyyy", { locale: vi })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Không có booking nào trong ngày này
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredBookings
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((booking) => (
                          <Card
                            key={booking.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="font-semibold mb-1">
                                    #{booking.bookingCode}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {booking.name}
                                  </div>
                                </div>
                                {getStatusBadge(booking.status)}
                              </div>

                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {parseInt(booking.adults) + parseInt(booking.children || "0")} người
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                  <span>{booking.phone}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-3">
                                <div className="text-sm text-muted-foreground">
                                  {booking.service === "table-4" && "Bàn 4 người"}
                                  {booking.service === "table-6" && "Bàn 6 người"}
                                  {booking.service === "table-8" && "Bàn 8 người"}
                                  {booking.service === "kitchen" && "Khu bếp"}
                                </div>
                                <div className="flex items-center gap-1 text-primary">
                                  <span className="text-sm font-medium">Chi tiết</span>
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                              </div>

                              {booking.notes && (
                                <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                                  <span className="font-medium">Ghi chú:</span> {booking.notes}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}