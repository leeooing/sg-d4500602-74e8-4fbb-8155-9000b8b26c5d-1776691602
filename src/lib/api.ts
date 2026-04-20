// API Helper Functions

// ==================== BOOKINGS ====================

export interface Booking {
  id: number;
  bookingCode: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  service: string;
  notes?: string;
  adminNote?: string;
  status: string;
  paymentProof?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  name: string;
  phone: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  service: string;
  notes?: string;
}

export async function createBooking(data: CreateBookingData): Promise<Booking> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function getBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function getBooking(id: number): Promise<Booking> {
  const res = await fetch(`${API_URL}/bookings/${id}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}

export async function getBookingByCode(code: string): Promise<Booking> {
  const res = await fetch(`/api/bookings/by-code?code=${code}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}

export async function getBookingById(id: number): Promise<Booking | null> {
  const res = await fetch(`/api/bookings/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function updateBooking(id: number, data: Partial<Booking>): Promise<Booking> {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

export async function deleteBooking(id: number): Promise<void> {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete booking");
}

// ==================== TABLES ====================

export interface Table {
  id: number;
  name: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  createdAt: string;
  updatedAt: string;
}

export async function getTables(): Promise<Table[]> {
  const res = await fetch("/api/tables");
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
}

export async function createTable(data: { name: string; capacity: number }): Promise<Table> {
  const res = await fetch("/api/tables", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create table");
  return res.json();
}

export async function updateTable(id: number, data: Partial<Table>): Promise<Table> {
  const res = await fetch(`/api/tables/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update table");
  return res.json();
}

export async function deleteTable(id: number): Promise<void> {
  const res = await fetch(`/api/tables/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete table");
}

// ==================== MENU ====================

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isAvailable: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const res = await fetch("/api/menu");
  if (!res.ok) throw new Error("Failed to fetch menu items");
  return res.json();
}

export async function createMenuItem(data: {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isAvailable?: boolean;
  isBestSeller?: boolean;
}): Promise<MenuItem> {
  const res = await fetch("/api/menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create menu item");
  return res.json();
}

export async function updateMenuItem(id: number, data: Partial<MenuItem>): Promise<MenuItem> {
  const res = await fetch(`/api/menu/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update menu item");
  return res.json();
}

export async function deleteMenuItem(id: number): Promise<void> {
  const res = await fetch(`/api/menu/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete menu item");
}