// LocalStorage Service - Mock Database for Testing

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
  items?: BookingItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingItem {
  id: number;
  bookingId: number;
  menuItemId: number;
  name: string;
  price: string;
  quantity: number;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
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

// Storage keys
const BOOKINGS_KEY = "samcamping_bookings";
const TABLES_KEY = "samcamping_tables";
const MENU_ITEMS_KEY = "samcamping_menu_items";
const BOOKING_COUNTER_KEY = "samcamping_booking_counter";

// Helper to generate booking code
function generateBookingCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "SC-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Helper to get next ID
function getNextId(key: string): number {
  const counter = parseInt(localStorage.getItem(key) || "0");
  const nextId = counter + 1;
  localStorage.setItem(key, nextId.toString());
  return nextId;
}

// ==================== BOOKINGS ====================

export function getAllBookings(): Booking[] {
  const data = localStorage.getItem(BOOKINGS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getBookingById(id: number): Booking | null {
  const bookings = getAllBookings();
  return bookings.find((b) => b.id === id) || null;
}

export function getBookingByCode(code: string): Booking | null {
  const bookings = getAllBookings();
  return bookings.find((b) => b.bookingCode === code) || null;
}

export function createBooking(data: {
  name: string;
  phone: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  service: string;
  notes?: string;
  items?: BookingItem[];
}): Booking {
  const bookings = getAllBookings();
  const id = getNextId(BOOKING_COUNTER_KEY);
  const bookingCode = generateBookingCode();
  
  const now = new Date().toISOString();
  const newBooking: Booking = {
    id,
    bookingCode,
    name: data.name,
    phone: data.phone,
    date: data.date,
    time: data.time,
    adults: data.adults,
    children: data.children,
    service: data.service,
    notes: data.notes,
    status: "pending",
    items: data.items || [],
    createdAt: now,
    updatedAt: now,
  };

  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  
  return newBooking;
}

export function updateBooking(id: number, data: Partial<Booking>): Booking | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);
  
  if (index === -1) return null;
  
  bookings[index] = {
    ...bookings[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return bookings[index];
}

export function deleteBooking(id: number): boolean {
  const bookings = getAllBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  
  if (filtered.length === bookings.length) return false;
  
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
  return true;
}

// ==================== TABLES ====================

export function getAllTables(): Table[] {
  const data = localStorage.getItem(TABLES_KEY);
  return data ? JSON.parse(data) : [];
}

export function createTable(data: { name: string; capacity: number }): Table {
  const tables = getAllTables();
  const now = new Date().toISOString();
  
  const newTable: Table = {
    id: `table_${Date.now()}`,
    name: data.name,
    capacity: data.capacity,
    status: "available",
    createdAt: now,
    updatedAt: now,
  };

  tables.push(newTable);
  localStorage.setItem(TABLES_KEY, JSON.stringify(tables));
  
  return newTable;
}

export function updateTable(id: string, data: Partial<Table>): Table | null {
  const tables = getAllTables();
  const index = tables.findIndex((t) => t.id === id);
  
  if (index === -1) return null;
  
  tables[index] = {
    ...tables[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(TABLES_KEY, JSON.stringify(tables));
  return tables[index];
}

export function deleteTable(id: string): boolean {
  const tables = getAllTables();
  const filtered = tables.filter((t) => t.id !== id);
  
  if (filtered.length === tables.length) return false;
  
  localStorage.setItem(TABLES_KEY, JSON.stringify(filtered));
  return true;
}

// ==================== MENU ITEMS ====================

export function getAllMenuItems(): MenuItem[] {
  const data = localStorage.getItem(MENU_ITEMS_KEY);
  return data ? JSON.parse(data) : [];
}

export function createMenuItem(data: {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isAvailable?: boolean;
  isBestSeller?: boolean;
}): MenuItem {
  const items = getAllMenuItems();
  const now = new Date().toISOString();
  
  const newItem: MenuItem = {
    id: `item_${Date.now()}`,
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    image: data.image,
    isAvailable: data.isAvailable ?? true,
    isBestSeller: data.isBestSeller ?? false,
    createdAt: now,
    updatedAt: now,
  };

  items.push(newItem);
  localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(items));
  
  return newItem;
}

export function updateMenuItem(id: string, data: Partial<MenuItem>): MenuItem | null {
  const items = getAllMenuItems();
  const index = items.findIndex((i) => i.id === id);
  
  if (index === -1) return null;
  
  items[index] = {
    ...items[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(items));
  return items[index];
}

export function deleteMenuItem(id: string): boolean {
  const items = getAllMenuItems();
  const filtered = items.filter((i) => i.id !== id);
  
  if (filtered.length === items.length) return false;
  
  localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(filtered));
  return true;
}