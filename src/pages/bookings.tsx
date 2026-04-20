import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Users, CheckCircle2, XCircle, AlertCircle, ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBookings } from "@/lib/api";

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

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const allBookings = await getBookings();
        // Sort by date (newest first)
        allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(allBookings);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const getServiceLabel = (service: string) => {
    const labels: Record<string, string> = {
      "table-4": "Bàn 4 người",
      "table-6": "Bàn 6 người",
      "table-8": "Bàn 8 người",
      "kitchen": "Khu bếp",
    };
    return labels[service] || service;
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

  const isUpcoming = (booking: Booking) => {
    if (booking.status === "rejected" || booking.status === "expired") {
      return false;
    }
    const bookingDate = new Date(booking.date.split("/").reverse().join("-"));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  };

  const upcomingBookings = bookings.filter(isUpcoming);
  const pastBookings = bookings.filter((b) => !isUpcoming(b));

  const displayedBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <>
      <SEO
        title="Lịch sử đặt bàn - SamCamping Cafe"
        description="Xem lại các booking đã đặt tại SamCamping Cafe"
      />
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-background border-b sticky top-0 z-10">
          <div className="container max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold font-serif">Lịch sử đặt bàn</h1>
            </div>
          </div>
        </div>

        <div className="container max-w-2xl mx-auto px-4 py-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "upcoming" ? "default" : "outline"}
              onClick={() => setActiveTab("upcoming")}
              className="flex-1"
            >
              Sắp tới ({upcomingBookings.length})
            </Button>
            <Button
              variant={activeTab === "past" ? "default" : "outline"}
              onClick={() => setActiveTab("past")}
              className="flex-1"
            >
              Đã qua ({pastBookings.length})
            </Button>
          </div>

          {/* Booking List */}
          {displayedBookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground mb-4">
                  {activeTab === "upcoming" 
                    ? "Chưa có booking nào sắp tới" 
                    : "Chưa có lịch sử booking"}
                </div>
                <Link href="/booking">
                  <Button>Đặt bàn ngay</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {displayedBookings.map((booking) => (
                <Card key={booking.bookingCode} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(booking.status)}
                        <div>
                          <div className="font-semibold text-lg">#{booking.bookingCode}</div>
                          <div className="text-sm text-muted-foreground">{booking.name}</div>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {parseInt(booking.adults) + parseInt(booking.children || "0")} người
                          {parseInt(booking.children || "0") > 0 && 
                            ` (${booking.adults} người lớn, ${booking.children} trẻ em)`
                          }
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        🎯 {getServiceLabel(booking.service)}
                      </div>
                    </div>

                    <Link href={`/booking/status?code=${booking.bookingCode}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Xem chi tiết
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}