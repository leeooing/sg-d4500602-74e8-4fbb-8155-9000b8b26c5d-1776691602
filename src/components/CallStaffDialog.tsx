import { useState } from "react";
import { Bell, Coffee, Droplets, UtensilsCrossed, Receipt, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitStaffRequest } from "@/lib/api";

interface CallStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableId?: string;
}

const defaultRequests = [
  { id: "water", icon: Droplets, label: "Xin thêm nước" },
  { id: "menu", icon: Coffee, label: "Xem menu" },
  { id: "utensils", icon: UtensilsCrossed, label: "Thêm dụng cụ" },
  { id: "bill", icon: Receipt, label: "Thanh toán" },
  { id: "other", icon: HelpCircle, label: "Khác" },
];

export function CallStaffDialog({ open, onOpenChange, tableId }: CallStaffDialogProps) {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) {
      toast({
        title: "Vui lòng chọn loại yêu cầu",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const requestType = defaultRequests.find(r => r.id === selectedType)?.label || "Khác";
      
      await submitStaffRequest({
        tableId: tableId || "Bàn khách", // Fallback if no table ID
        requestType,
        note,
      });

      toast({
        title: "Đã gọi nhân viên",
        description: "Nhân viên sẽ đến ngay ạ!",
      });

      // Reset & close
      setSelectedType(null);
      setNote("");
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
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
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
              className="cursor-pointer hover:shadow-lg transition-shadow"
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
              className="cursor-pointer hover:shadow-lg transition-shadow"
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