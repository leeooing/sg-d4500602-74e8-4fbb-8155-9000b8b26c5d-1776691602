import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, CreditCard, HelpCircle, Check, Clock } from "lucide-react";

// Mock data
const mockRequests = [
  {
    id: "REQ001",
    table: "B05",
    type: "callstaff",
    message: "Gọi nhân viên",
    time: "2 phút trước",
    status: "pending",
  },
  {
    id: "REQ002",
    table: "B12",
    type: "payment",
    message: "Yêu cầu thanh toán",
    time: "5 phút trước",
    status: "pending",
  },
  {
    id: "REQ003",
    table: "B08",
    type: "help",
    message: "Cần hỗ trợ khác",
    time: "8 phút trước",
    status: "pending",
  },
  {
    id: "REQ004",
    table: "B03",
    type: "callstaff",
    message: "Gọi nhân viên",
    time: "15 phút trước",
    status: "completed",
  },
];

const typeConfig = {
  callstaff: { label: "Gọi nhân viên", icon: Phone, color: "text-blue-600" },
  payment: { label: "Thanh toán", icon: CreditCard, color: "text-green-600" },
  help: { label: "Hỗ trợ khác", icon: HelpCircle, color: "text-purple-600" },
};

export default function AdminRequests() {
  const [requests, setRequests] = useState(mockRequests);

  const handleComplete = (id: string) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: "completed" } : req
    ));
  };

  const pendingRequests = requests.filter(req => req.status === "pending");
  const completedRequests = requests.filter(req => req.status === "completed");

  return (
    <AdminLayout>
      <SEO title="Staff Requests - SamCamping Admin" />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Staff Requests</h1>
          <p className="text-muted-foreground mt-1">Yêu cầu gọi nhân viên từ khách</p>
        </div>

        <div className="space-y-8">
          {/* Pending Requests */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Đang chờ xử lý ({pendingRequests.length})
            </h2>
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Không có yêu cầu nào đang chờ
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRequests.map((request) => {
                  const TypeIcon = typeConfig[request.type as keyof typeof typeConfig].icon;
                  return (
                    <Card key={request.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="font-mono text-base px-3 py-1">
                                {request.table}
                              </Badge>
                              <div className={`flex items-center gap-2 ${typeConfig[request.type as keyof typeof typeConfig].color}`}>
                                <TypeIcon className="h-5 w-5" />
                                <span className="font-medium">{typeConfig[request.type as keyof typeof typeConfig].label}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{request.time}</p>
                          </div>
                          <Button size="sm" onClick={() => handleComplete(request.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Hoàn thành
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Requests */}
          {completedRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Đã hoàn thành ({completedRequests.length})
              </h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {completedRequests.map((request) => {
                      const TypeIcon = typeConfig[request.type as keyof typeof typeConfig].icon;
                      return (
                        <div key={request.id} className="p-4 opacity-60">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="font-mono">
                              {request.table}
                            </Badge>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <TypeIcon className="h-4 w-4" />
                              <span className="text-sm">{typeConfig[request.type as keyof typeof typeConfig].label}</span>
                            </div>
                            <span className="text-sm text-muted-foreground ml-auto">{request.time}</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                              <Check className="h-3 w-3 mr-1" />
                              Hoàn thành
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}