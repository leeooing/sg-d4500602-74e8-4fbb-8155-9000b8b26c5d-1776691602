import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Users, MapPin, Phone, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Booking {
  bookingCode: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  adults: string;
  children: string;
  service: string;
  notes: string;
  status: "pending" | "confirmed" | "rejected" | "expired";
  createdAt: string;
}

export default function AdminCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      filterBookingsByDate(selectedDate);
    }
  }, [selectedDate, allBookings]);

  const loadBookings = () => {
    const bookings: Booking[] = [];
    
    // Load current booking
    const current = localStorage.getItem("currentBooking");
    if (current) {
      bookings.push(JSON.parse(current));
    }

    // Load booking history
    const history = localStorage.getItem("bookingHistory");
    if (history) {
      bookings.push(...JSON.parse(history));
    }

    setAllBookings(bookings);
  };

  const filterBookingsByDate = (date: Date) => {
    const dateStr = formatDateToCompare(date);
    const filtered = allBookings.filter((booking) => {
      const bookingDate = convertBookingDate(booking.date);
      return bookingDate === dateStr;
    });
    setFilteredBookings(filtered);
  };

  const formatDateToCompare = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  const convertBookingDate = (dateStr: string) => {
    // If already in dd/mm/yy format
    if (dateStr.includes("/")) {
      return dateStr;
    }
    // If in yyyy-mm-dd format
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year.slice(2)}`;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Chờ xác nhận", variant: "secondary" },
      confirmed: { label: "Đã xác nhận", variant: "default" },
      rejected: { label: "Đã hủy", variant: "destructive" },
      expired: { label: "Hết hạn", variant: "outline" },
    };
    const { label, variant } = config[status] || { label: status, variant: "outline" };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getServiceLabel = (service: string) => {
    const labels: Record<string, string> = {
      "table-4": "Bàn 4 người",
      "table-6": "Bàn 6 người",
      "table-8": "Bàn 8 người",
      "kitchen": "Khu bếp",
    };
    return labels[service] || service;
  };

  const getBookingStats = () => {
    const today = formatDateToCompare(new Date());
    const todayBookings = allBookings.filter(b => convertBookingDate(b.date) === today);
    
    return {
      total: todayBookings.length,
      pending: todayBookings.filter(b => b.status === "pending").length,
      confirmed: todayBookings.filter(b => b.status === "confirmed").length,
      rejected: todayBookings.filter(b => b.status === "rejected").length,
    };
  };

  const stats = getBookingStats();
  const isToday = selectedDate && formatDateToCompare(selectedDate) === formatDateToCompare(new Date());

  return (
    <>
      <SEO title="Lịch đặt bàn - Admin" description="Xem lịch đặt bàn theo ngày" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold font-serif">Lịch đặt bàn</h1>
            <p className="text-muted-foreground mt-2">Xem và quản lý booking theo ngày</p>
          </div>

          {/* Stats - Today */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hôm nay</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Chờ xác nhận</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Đã xác nhận</p>
                    <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Đã hủy</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Chọn ngày</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Bookings List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {isToday ? "Booking hôm nay" : `Booking ngày ${selectedDate && formatDateToCompare(selectedDate)}`}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {filteredBookings.length} booking
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Hôm nay
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Không có booking nào trong ngày này</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((booking) => (
                        <Card key={booking.bookingCode} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {getStatusIcon(booking.status)}
                                <div>
                                  <div className="font-semibold text-lg">#{booking.bookingCode}</div>
                                  <div className="text-sm text-muted-foreground">{booking.name}</div>
                                </div>
                              </div>
                              {getStatusBadge(booking.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>
                                  {parseInt(booking.adults) + parseInt(booking.children || "0")} người
                                  {parseInt(booking.children || "0") > 0 && 
                                    ` (${booking.adults} NL, ${booking.children} TE)`
                                  }
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{getServiceLabel(booking.service)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{booking.phone}</span>
                              </div>
                            </div>

                            {booking.notes && (
                              <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                                <span className="font-medium">Ghi chú:</span> {booking.notes}
                              </div>
                            )}

                            <div className="mt-3 flex gap-2">
                              <Link href={`/admin/bookings/${booking.bookingCode}`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                  Chi tiết
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}