---
title: QR Code generator cho từng bàn
status: todo
priority: medium
type: feature
tags: [qr, tables, admin]
created_by: agent
created_at: 2026-04-20
position: 14
---

## Notes
Generate QR code cho mỗi bàn, khi scan sẽ vào menu với table ID.

## Checklist
- [ ] Cài qrcode hoặc qrcode.react
- [ ] Tạo QR generation function
- [ ] Admin page: generate & download QR cho từng bàn
- [ ] QR scan → menu page với table context
- [ ] Hiển thị "Bạn đang ở bàn X" khi scan QR
- [ ] Call staff tự động gửi table number

## Acceptance
- Admin download được QR từng bàn
- Scan QR vào đúng menu với table info
- Call staff biết table number