import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
} from "@/components/ui/alert-dialog";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Table {
  id: string;
  name: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
}

export default function TablesPage() {
  const { toast } = useToast();
  const [tables, setTables] = useState<Table[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
  });

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = () => {
    const saved = localStorage.getItem("cafeTables");
    if (saved) {
      setTables(JSON.parse(saved));
    } else {
      // Default tables
      const defaultTables: Table[] = [
        { id: "1", name: "Bàn 1", capacity: 4, status: "available" },
        { id: "2", name: "Bàn 2", capacity: 4, status: "available" },
        { id: "3", name: "Bàn 3", capacity: 6, status: "available" },
        { id: "4", name: "Bàn 4", capacity: 6, status: "available" },
        { id: "5", name: "Bàn 5", capacity: 8, status: "available" },
        { id: "6", name: "Bàn VIP", capacity: 10, status: "available" },
      ];
      setTables(defaultTables);
      localStorage.setItem("cafeTables", JSON.stringify(defaultTables));
    }
  };

  const saveTables = (newTables: Table[]) => {
    localStorage.setItem("cafeTables", JSON.stringify(newTables));
    setTables(newTables);
  };

  const handleAdd = () => {
    if (!formData.name || !formData.capacity) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    const newTable: Table = {
      id: Date.now().toString(),
      name: formData.name,
      capacity: parseInt(formData.capacity),
      status: "available",
    };

    const newTables = [...tables, newTable];
    saveTables(newTables);

    toast({
      title: "Thành công",
      description: `Đã thêm ${formData.name}`,
    });

    setIsAddDialogOpen(false);
    setFormData({ name: "", capacity: "" });
  };

  const handleEdit = () => {
    if (!selectedTable || !formData.name || !formData.capacity) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    const newTables = tables.map((table) =>
      table.id === selectedTable.id
        ? { ...table, name: formData.name, capacity: parseInt(formData.capacity) }
        : table
    );

    saveTables(newTables);

    toast({
      title: "Thành công",
      description: `Đã cập nhật ${formData.name}`,
    });

    setIsEditDialogOpen(false);
    setSelectedTable(null);
    setFormData({ name: "", capacity: "" });
  };

  const handleDelete = () => {
    if (!selectedTable) return;

    const newTables = tables.filter((table) => table.id !== selectedTable.id);
    saveTables(newTables);

    toast({
      title: "Thành công",
      description: `Đã xóa ${selectedTable.name}`,
    });

    setIsDeleteDialogOpen(false);
    setSelectedTable(null);
  };

  const openEditDialog = (table: Table) => {
    setSelectedTable(table);
    setFormData({
      name: table.name,
      capacity: table.capacity.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (table: Table) => {
    setSelectedTable(table);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      available: { label: "Trống", variant: "default" },
      occupied: { label: "Đang dùng", variant: "destructive" },
      reserved: { label: "Đã đặt", variant: "secondary" },
    };
    const { label, variant } = config[status] || { label: status, variant: "secondary" };
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <>
      <SEO title="Quản lý bàn - Admin" description="Quản lý bàn ghế quán cafe" />
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif">Quản lý bàn</h1>
              <p className="text-muted-foreground mt-1">
                Tổng số: {tables.length} bàn
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Thêm bàn
            </Button>
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <Card key={table.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{table.name}</CardTitle>
                    {getStatusBadge(table.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    <span>{table.capacity} người</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditDialog(table)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Sửa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => openDeleteDialog(table)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {tables.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground mb-4">Chưa có bàn nào</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Thêm bàn đầu tiên
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm bàn mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin bàn ghế mới
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Tên bàn *</Label>
                <Input
                  id="add-name"
                  placeholder="Ví dụ: Bàn 1, Bàn VIP..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-capacity">Số chỗ ngồi *</Label>
                <Input
                  id="add-capacity"
                  type="number"
                  min={1}
                  max={20}
                  placeholder="Ví dụ: 4, 6, 8..."
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAdd}>Thêm bàn</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa bàn</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin bàn ghế
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tên bàn *</Label>
                <Input
                  id="edit-name"
                  placeholder="Ví dụ: Bàn 1, Bàn VIP..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Số chỗ ngồi *</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  min={1}
                  max={20}
                  placeholder="Ví dụ: 4, 6, 8..."
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleEdit}>Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc muốn xóa <strong>{selectedTable?.name}</strong>?
                <br />
                Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Xóa bàn
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
}