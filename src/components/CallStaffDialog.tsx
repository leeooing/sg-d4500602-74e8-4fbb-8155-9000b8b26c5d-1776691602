import { useState } from "react";
import { Bell, HelpCircle, Phone, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { submitStaffRequest } from "@/lib/api";

interface CallStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableId?: string;
}

export function CallStaffDialog({ open, onOpenChange, tableId }: CallStaffDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleRequest = async (type: string) => {
    setLoading(true);

    try {
      let requestLabel = "Khác";
      if (type === "staff") requestLabel = "Gọi nhân viên";
      if (type === "payment") requestLabel = "Xin thanh toán";
      if (type === "help") requestLabel = "Hỗ trợ khác";
      
      await submitStaffRequest({
        tableId: tableId || "Bàn khách",
        requestType: requestLabel,
        note: "",
      });

      toast({
        title: "Đã gọi nhân viên",
        description: "Nhân viên sẽ đến ngay ạ!",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit request:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi yêu cầu. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Gọi nhân viên
          </DialogTitle>
          <DialogDescription>
            {tableId ? `Bàn số ${tableId} đang gọi nhân viên.` : "Bạn cần hỗ trợ gì ạ?"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-3">
            <Card
              className={`cursor-pointer transition-shadow ${loading ? "opacity-50 pointer-events-none" : "hover:shadow-md"}`}
              onClick={() => handleRequest("staff")}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Gọi nhân viên</h3>
                  <p className="text-sm text-muted-foreground">Cần hỗ trợ gọi món hoặc tư vấn</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-shadow ${loading ? "opacity-50 pointer-events-none" : "hover:shadow-md"}`}
              onClick={() => handleRequest("payment")}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Xin thanh toán</h3>
                  <p className="text-sm text-muted-foreground">Muốn thanh toán và rời quán</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-shadow ${loading ? "opacity-50 pointer-events-none" : "hover:shadow-md"}`}
              onClick={() => handleRequest("help")}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Hỗ trợ khác</h3>
                  <p className="text-sm text-muted-foreground">Yêu cầu hỗ trợ khác</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}