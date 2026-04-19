import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit2, Trash2, Search, Star, AlertCircle } from "lucide-react";
import { categories as initialCategories, menuItems as initialMenuItems } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";

export default function AdminMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  
  // Category dialog state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof initialCategories[0] | null>(null);
  const [categoryForm, setCategoryForm] = useState({ id: "", name: "" });
  
  // Menu item dialog state
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemForm, setItemForm] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    featured: false,
    soldOut: false,
  });

  // Category CRUD
  const openCategoryDialog = (category?: typeof initialCategories[0]) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ id: category.id, name: category.name });
    } else {
      setEditingCategory(null);
      setCategoryForm({ id: "", name: "" });
    }
    setCategoryDialogOpen(true);
  };

  const saveCategoryForm = () => {
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...c, name: categoryForm.name } : c
      ));
    } else {
      const newId = `cat-${Date.now()}`;
      setCategories([...categories, { id: newId, name: categoryForm.name }]);
    }
    setCategoryDialogOpen(false);
  };

  const deleteCategory = (id: string) => {
    if (confirm("Xóa danh mục này? Các món trong danh mục sẽ không bị xóa.")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  // Menu item CRUD
  const openItemDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setItemForm({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        featured: item.featured || false,
        soldOut: item.soldOut || false,
      });
    } else {
      setEditingItem(null);
      setItemForm({
        id: "",
        name: "",
        description: "",
        price: 0,
        category: "coffee",
        image: "",
        featured: false,
        soldOut: false,
      });
    }
    setItemDialogOpen(true);
  };

  const saveItemForm = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? { ...item, ...itemForm } : item
      ));
    } else {
      const newId = `item-${Date.now()}`;
      setMenuItems([...menuItems, { ...itemForm, id: newId } as MenuItem]);
    }
    setItemDialogOpen(false);
  };

  const deleteItem = (id: string) => {
    if (confirm("Xóa món này?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  const toggleSoldOut = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, soldOut: !item.soldOut } : item
    ));
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <SEO title="Menu Management - SamCamping Admin" />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground mt-1">Quản lý danh mục và món</p>
        </div>

        <Tabs defaultValue="items" className="space-y-6">
          <TabsList>
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          {/* Menu Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm món..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => openItemDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm món
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          {item.featured && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {item.soldOut && (
                            <Badge variant="outline" className="text-destructive border-destructive">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Hết hàng
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                        <p className="text-sm font-medium text-primary mt-1">{item.price.toLocaleString()}đ</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleFeatured(item.id)}
                          className={item.featured ? "border-yellow-600 text-yellow-600" : ""}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleSoldOut(item.id)}
                          className={item.soldOut ? "border-destructive text-destructive" : ""}
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openItemDialog(item)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => openCategoryDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm danh mục
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-medium">{category.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openCategoryDialog(category)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteCategory(category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {menuItems.filter(item => item.category === category.id).length} món
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Category Dialog */}
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Sửa danh mục" : "Thêm danh mục"}</DialogTitle>
              <DialogDescription>
                {editingCategory ? "Cập nhật thông tin danh mục" : "Tạo danh mục mới cho menu"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Tên danh mục</Label>
                <Input
                  id="category-name"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="VD: Cà phê, Trà, Đá xay..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Hủy</Button>
              <Button onClick={saveCategoryForm}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Menu Item Dialog */}
        <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Sửa món" : "Thêm món"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Cập nhật thông tin món" : "Thêm món mới vào menu"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Tên món</Label>
                  <Input
                    id="item-name"
                    value={itemForm.name}
                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-price">Giá</Label>
                  <Input
                    id="item-price"
                    type="number"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-description">Mô tả</Label>
                <Textarea
                  id="item-description"
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-category">Danh mục</Label>
                <select
                  id="item-category"
                  value={itemForm.category}
                  onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-image">Image URL</Label>
                <Input
                  id="item-image"
                  value={itemForm.image}
                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Món nổi bật</Label>
                  <p className="text-sm text-muted-foreground">Hiển thị trong phần featured</p>
                </div>
                <Switch
                  checked={itemForm.featured}
                  onCheckedChange={(checked) => setItemForm({ ...itemForm, featured: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Hết hàng</Label>
                  <p className="text-sm text-muted-foreground">Đánh dấu món tạm hết</p>
                </div>
                <Switch
                  checked={itemForm.soldOut}
                  onCheckedChange={(checked) => setItemForm({ ...itemForm, soldOut: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setItemDialogOpen(false)}>Hủy</Button>
              <Button onClick={saveItemForm}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}