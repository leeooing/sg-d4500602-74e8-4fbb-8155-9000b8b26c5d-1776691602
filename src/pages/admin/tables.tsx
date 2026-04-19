import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, QrCode } from "lucide-react";

// Mock data
const tables = [
  { id: "T01", number: "B01", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B01", status: "available" },
  { id: "T02", number: "B02", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B02", status: "occupied" },
  { id: "T03", number: "B03", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B03", status: "available" },
  { id: "T04", number: "B04", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B04", status: "reserved" },
  { id: "T05", number: "B05", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B05", status: "available" },
  { id: "T06", number: "B06", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B06", status: "available" },
  { id: "T07", number: "B07", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B07", status: "occupied" },
  { id: "T08", number: "B08", qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://samcamping.app/menu?table=B08", status: "available" },
];

const statusConfig = {
  available: { label: "Trống", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  occupied: { label: "Đang dùng", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  reserved: { label: "Đã đặt", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
};

export default function AdminTables() {
  const downloadQR = (tableNumber: string, qrUrl: string) => {
    // Mock download
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `QR-${tableNumber}.png`;
    link.click();
  };

  const downloadAllQR = () => {
    alert("Tính năng download tất cả QR codes sẽ được thêm vào sau");
  };

  return (
    <AdminLayout>
      <SEO title="Tables & QR Codes - SamCamping Admin" />
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Tables & QR Codes</h1>
              <p className="text-muted-foreground mt-1">Quản lý bàn và mã QR</p>
            </div>
            <Button onClick={downloadAllQR}>
              <Download className="h-4 w-4 mr-2" />
              Tải tất cả QR
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tables.map((table) => (
            <Card key={table.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-mono">{table.number}</CardTitle>
                  <Badge className={statusConfig[table.status as keyof typeof statusConfig].color}>
                    {statusConfig[table.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <CardDescription>Mã QR cho bàn {table.number}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-white rounded-lg p-4 border border-border">
                  <img
                    src={table.qrCode}
                    alt={`QR Code ${table.number}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => downloadQR(table.number, table.qrCode)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải QR
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}