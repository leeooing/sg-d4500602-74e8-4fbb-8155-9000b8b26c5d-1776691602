import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { getTables, createTable, updateTable, deleteTable } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminTablesPage() {
  const { toast } = useToast();
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
  });

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error("Failed to load tables:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bàn",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (table?: any) => {
    if (table) {
      setEditingTable(table);
      setFormData({
        name: table.name,
        capacity: table.capacity.toString(),
      });
    } else {
      setEditingTable(null);
      setFormData({ name: "", capacity: "" });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.capacity) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingTable) {
        await updateTable(editingTable.id, {
          name: formData.name,
          capacity: parseInt(formData.capacity),
        });
        toast({
          title: "Thành công",
          description: "Đã cập nhật thông tin bàn",
        });
      } else {
        await createTable({
          name: formData.name,
          capacity: parseInt(formData.capacity),
        });
        toast({
          title: "Thành công",
          description: "Đã thêm bàn mới",
        });
      }

      setDialogOpen(false);
      loadTables();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: editingTable ? "Không thể cập nhật bàn" : "Không thể thêm bàn",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTable(id);
      toast({
        title: "Đã xóa",
        description: "Đã xóa bàn khỏi hệ thống",
      });
      loadTables();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa bàn",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTable = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bàn này?")) return;
    
    try {
      await deleteTable(id);
      toast({ title: "Thành công", description: "Đã xóa bàn" });
      loadTables();
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa bàn. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: { variant: "default" as const, label: "Trống" },
      occupied: { variant: "destructive" as const, label: "Đang dùng" },
      reserved: { variant: "outline" as const, label: "Đã đặt" },
    };
    const config = variants[status as keyof typeof variants] || variants.available;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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
      <SEO title="Quản lý bàn - Admin" />
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">Quản lý bàn</h1>
              <p className="text-muted-foreground">Quản lý danh sách bàn ghế trong quán</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm bàn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingTable ? "Chỉnh sửa bàn" : "Thêm bàn mới"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingTable
                        ? "Cập nhật thông tin bàn"
                        : "Tạo bàn mới cho quán"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên bàn</Label>
                      <Input
                        id="name"
                        placeholder="Bàn 1"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Số chỗ ngồi</Label>
                      <Input
                        id="capacity"
                        type="number"
                        min="1"
                        max="20"
                        placeholder="4"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      {editingTable ? "Cập nhật" : "Thêm bàn"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {tables.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Chưa có bàn nào</p>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm bàn đầu tiên
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tables.map((table) => (
                <Card key={table.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{table.name}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{table.capacity} chỗ</span>
                        </div>
                      </div>
                      {getStatusBadge(table.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => {
                          setEditingTable(table);
                          setDialogOpen(true);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTable(table.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}