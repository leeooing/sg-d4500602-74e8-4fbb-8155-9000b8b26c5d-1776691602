// API Helper Functions - Using LocalStorage

import * as storage from "./localStorage";

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
  items?: storage.BookingItem[];
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
  items?: storage.BookingItem[];
}

export async function createBooking(data: CreateBookingData): Promise<{ id: number; bookingCode: string }> {
  try {
    console.log("Creating booking with data:", data);
    
    // Use localStorage directly
    const booking = storage.createBooking(data);
    
    console.log("Booking created successfully:", booking);
    return {
      id: booking.id,
      bookingCode: booking.bookingCode,
    };
  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
}

export async function getBookings(): Promise<Booking[]> {
  return storage.getAllBookings();
}

export async function getBooking(id: number): Promise<Booking | null> {
  return storage.getBookingById(id);
}

export async function getBookingByCode(code: string): Promise<Booking | null> {
  return storage.getBookingByCode(code);
}

export async function getBookingById(id: number): Promise<Booking | null> {
  return storage.getBookingById(id);
}

export async function updateBooking(id: number, data: Partial<Booking>): Promise<Booking> {
  const updated = storage.updateBooking(id, data);
  if (!updated) throw new Error("Booking not found");
  return updated;
}

export async function deleteBooking(id: number): Promise<void> {
  const deleted = storage.deleteBooking(id);
  if (!deleted) throw new Error("Booking not found");
}

// ==================== TABLES ====================

export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  createdAt: string;
  updatedAt: string;
}

export async function getTables(): Promise<Table[]> {
  return storage.getAllTables();
}

export async function createTable(data: { name: string; capacity: number }): Promise<Table> {
  return storage.createTable(data);
}

export async function updateTable(id: string, data: Partial<Table>): Promise<Table> {
  const updated = storage.updateTable(id, data);
  if (!updated) throw new Error("Table not found");
  return updated;
}

export async function deleteTable(id: string): Promise<void> {
  const deleted = storage.deleteTable(id);
  if (!deleted) throw new Error("Table not found");
}

// ==================== MENU ====================

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

export async function getMenuItems(): Promise<MenuItem[]> {
  return storage.getAllMenuItems();
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
  return storage.createMenuItem(data);
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
  const updated = storage.updateMenuItem(id, data);
  if (!updated) throw new Error("Menu item not found");
  return updated;
}

export async function deleteMenuItem(id: string): Promise<void> {
  const deleted = storage.deleteMenuItem(id);
  if (!deleted) throw new Error("Menu item not found");
}

// ==================== STAFF REQUESTS ====================

export async function submitStaffRequest(data: { tableId: string; requestType: string; note?: string }): Promise<void> {
  console.log("Submitting staff request:", data);
  // Mock implementation - in real app would send to backend
  return new Promise(resolve => setTimeout(resolve, 500));
}