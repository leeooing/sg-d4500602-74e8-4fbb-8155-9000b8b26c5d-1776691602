import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import { getBookings } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    todayBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const bookings = await getBookings();
      
      const today = new Date().toISOString().split("T")[0];
      const todayBookings = bookings.filter((b) => b.date.includes(today));

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b) => b.status === "pending").length,
        confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
        todayBookings: todayBookings.length,
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
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
      <SEO title="Dashboard - Admin" />
      <AdminLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Tổng quan hoạt động quán</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Tổng đơn đặt bàn"
              value={stats.totalBookings}
              icon={Calendar}
            />
            <StatCard
              title="Chờ xác nhận"
              value={stats.pendingBookings}
              icon={Clock}
            />
            <StatCard
              title="Đã xác nhận"
              value={stats.confirmedBookings}
              icon={CheckCircle2}
            />
            <StatCard
              title="Đơn hôm nay"
              value={stats.todayBookings}
              icon={TrendingUp}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Đơn đặt bàn gần nhất</CardTitle>
            </CardHeader>
            <CardContent>
              {recentBookings.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Chưa có đơn đặt bàn nào
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold">#{booking.bookingCode}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.name} - {booking.phone}
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="text-sm font-medium">{booking.date}</div>
                        <div className="text-sm text-muted-foreground">{booking.time}</div>
                      </div>
                      <div>
                        {booking.status === "pending" && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                            <Clock className="h-3 w-3" />
                            Chờ xác nhận
                          </span>
                        )}
                        {booking.status === "confirmed" && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Đã xác nhận
                          </span>
                        )}
                        {booking.status === "rejected" && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                            <XCircle className="h-3 w-3" />
                            Đã từ chối
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
}