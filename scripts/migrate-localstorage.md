# Migration từ localStorage sang PostgreSQL

## Hướng dẫn cho khách hàng

### Bước 1: Xuất dữ liệu từ browser
Khách hàng cần chạy script này trong DevTools Console (F12):

```javascript
// Export localStorage data
const data = {
  bookings: [],
  tables: []
};

// Get current booking
const currentBooking = localStorage.getItem('currentBooking');
if (currentBooking) {
  data.bookings.push(JSON.parse(currentBooking));
}

// Get booking history
const bookingHistory = localStorage.getItem('bookingHistory');
if (bookingHistory) {
  data.bookings.push(...JSON.parse(bookingHistory));
}

// Get tables
const tables = localStorage.getItem('tables');
if (tables) {
  data.tables = JSON.parse(tables);
}

// Download as JSON file
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'samcamping-data-export.json';
a.click();
```

### Bước 2: Admin import vào database
Admin chạy lệnh này trên server:

```bash
# Import data
npm run import-data -- --file=samcamping-data-export.json
```

## Lưu ý
- Dữ liệu localStorage là local per browser, mỗi khách cần export riêng
- Nếu nhiều khách sử dụng, mỗi người cần export và gửi file cho admin
- Admin có thể merge nhiều file JSON trước khi import