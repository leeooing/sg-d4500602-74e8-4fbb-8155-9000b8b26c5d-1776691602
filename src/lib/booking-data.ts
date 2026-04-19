export interface Branch {
  id: string;
  name: string;
  address: string;
}

export interface BookingFormData {
  branchId: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  note: string;
}

export interface Booking {
  id: string;
  code: string;
  branch: Branch;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  note: string;
  deposit: number;
  status: "pending_payment" | "pending_confirmation" | "confirmed" | "rejected" | "expired";
  billImage?: string;
  createdAt: Date;
}

export const branches: Branch[] = [
  {
    id: "1",
    name: "SamCamping Quận 1",
    address: "123 Đường Camping, Q.1, TP.HCM",
  },
  {
    id: "2",
    name: "SamCamping Quận 7",
    address: "456 Nguyễn Văn Linh, Q.7, TP.HCM",
  },
  {
    id: "3",
    name: "SamCamping Thủ Đức",
    address: "789 Kha Vạn Cân, TP. Thủ Đức",
  },
];

export const depositAmount = 100000;

export const bankInfo = {
  bank: "Vietcombank",
  accountNumber: "1234567890",
  accountName: "NGUYEN VAN A - SAMCAMPING",
};

export function generateBookingCode(): string {
  return "SC" + Date.now().toString().slice(-8);
}

export function formatBookingContent(code: string): string {
  return `SAMCAMPING ${code}`;
}