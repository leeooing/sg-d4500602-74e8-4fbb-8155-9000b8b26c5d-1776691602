import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    name: "SamCamping Cafe",
    hotline: "0901234567",
    email: "hello@samcamping.vn",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    openHours: "8:00 - 22:00",
    facebook: "facebook.com/samcamping",
    instagram: "@samcamping",
    depositAmount: 200000,
    bankName: "Vietcombank",
    bankAccount: "1234567890",
    bankAccountName: "NGUYEN VAN A",
  });

  const handleSave = () => {
    alert("Đã lưu thông tin quán!");
  };

  return (
    <AdminLayout>
      <SEO title="Settings - SamCamping Admin" />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Cài đặt thông tin quán</p>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Thông tin hiển thị cho khách hàng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên quán</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotline">Hotline</Label>
                  <Input
                    id="hotline"
                    value={settings.hotline}
                    onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Giờ mở cửa</Label>
                <Input
                  id="hours"
                  value={settings.openHours}
                  onChange={(e) => setSettings({ ...settings, openHours: e.target.value })}
                  placeholder="8:00 - 22:00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Mạng xã hội</CardTitle>
              <CardDescription>Liên kết social media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={settings.facebook}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                  placeholder="facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  placeholder="@yourhandle"
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt đặt bàn</CardTitle>
              <CardDescription>Thông tin cọc và thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deposit">Số tiền cọc (VNĐ)</Label>
                <Input
                  id="deposit"
                  type="number"
                  value={settings.depositAmount}
                  onChange={(e) => setSettings({ ...settings, depositAmount: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank">Ngân hàng</Label>
                <Input
                  id="bank"
                  value={settings.bankName}
                  onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account">Số tài khoản</Label>
                <Input
                  id="account"
                  value={settings.bankAccount}
                  onChange={(e) => setSettings({ ...settings, bankAccount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Chủ tài khoản</Label>
                <Input
                  id="accountName"
                  value={settings.bankAccountName}
                  onChange={(e) => setSettings({ ...settings, bankAccountName: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleSave}>
              <Save className="h-5 w-5 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}