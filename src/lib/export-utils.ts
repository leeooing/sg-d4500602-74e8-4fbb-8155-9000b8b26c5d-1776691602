import * as XLSX from "xlsx";

export interface BookingExportData {
  "Mã booking": string;
  "Tên khách": string;
  "Số điện thoại": string;
  "Ngày": string;
  "Giờ": string;
  "Người lớn": number;
  "Trẻ em": number;
  "Dịch vụ": string;
  "Trạng thái": string;
  "Ghi chú": string;
  "Ghi chú admin": string;
  "Ngày tạo": string;
}

// Format service name
function formatService(service: string): string {
  const serviceMap: Record<string, string> = {
    "table-4": "Bàn 4 người",
    "table-6": "Bàn 6 người",
    "table-8": "Bàn 8 người",
    "kitchen": "Khu bếp",
  };
  return serviceMap[service] || service;
}

// Format status
function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    rejected: "Từ chối",
    expired: "Hết hạn",
  };
  return statusMap[status] || status;
}

// Convert booking to export format
function formatBookingForExport(booking: any): BookingExportData {
  return {
    "Mã booking": booking.bookingCode,
    "Tên khách": booking.name,
    "Số điện thoại": booking.phone,
    "Ngày": booking.date,
    "Giờ": booking.time,
    "Người lớn": booking.adults,
    "Trẻ em": booking.children || 0,
    "Dịch vụ": formatService(booking.service),
    "Trạng thái": formatStatus(booking.status),
    "Ghi chú": booking.notes || "",
    "Ghi chú admin": booking.adminNote || "",
    "Ngày tạo": new Date(booking.createdAt).toLocaleString("vi-VN"),
  };
}

// Export to CSV
export function exportToCSV(bookings: any[], filename: string = "bookings") {
  const data = bookings.map(formatBookingForExport);
  
  // Create CSV content
  const headers = Object.keys(data[0] || {}).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${value}"`)
      .join(",")
  );
  const csv = [headers, ...rows].join("\n");

  // Create blob and download
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export to Excel
export function exportToExcel(bookings: any[], filename: string = "bookings") {
  const data = bookings.map(formatBookingForExport);

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Set column widths
  const colWidths = [
    { wch: 12 }, // Mã booking
    { wch: 20 }, // Tên khách
    { wch: 15 }, // SĐT
    { wch: 12 }, // Ngày
    { wch: 10 }, // Giờ
    { wch: 10 }, // Người lớn
    { wch: 8 },  // Trẻ em
    { wch: 15 }, // Dịch vụ
    { wch: 15 }, // Trạng thái
    { wch: 30 }, // Ghi chú
    { wch: 30 }, // Ghi chú admin
    { wch: 18 }, // Ngày tạo
  ];
  ws["!cols"] = colWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Bookings");

  // Write file
  XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`);
}

// Export filtered bookings
export function exportBookings(
  bookings: any[],
  format: "csv" | "excel",
  filename?: string
) {
  if (bookings.length === 0) {
    alert("Không có dữ liệu để xuất");
    return;
  }

  const defaultFilename = filename || "bookings";

  if (format === "csv") {
    exportToCSV(bookings, defaultFilename);
  } else {
    exportToExcel(bookings, defaultFilename);
  }
}