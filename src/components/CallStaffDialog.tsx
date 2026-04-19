import { useState } from "react";
import { Phone, CreditCard, HelpCircle, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CallStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableNumber?: string;
}

export function CallStaffDialog({ open, onOpenChange, tableNumber = "12" }: CallStaffDialogProps) {
  const [requestSent, setRequestSent] = useState(false);
  const [requestType, setRequestType] = useState<string | null>(null);

  const handleRequest = (type: string) => {
    setRequestType(type);
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setRequestType(null);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!requestSent ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Gọi nhân viên</DialogTitle>
              <DialogDescription>
                Bàn #{tableNumber} - Chọn yêu cầu hỗ trợ
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
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
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2">Đã gửi yêu cầu</h3>
            <p className="text-muted-foreground">
              {requestType === "staff" && "Nhân viên sẽ đến bàn ngay"}
              {requestType === "payment" && "Nhân viên sẽ mang hóa đơn ngay"}
              {requestType === "help" && "Nhân viên sẽ hỗ trợ bạn ngay"}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}