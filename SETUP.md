# 🚀 Setup Guide - SamCamping Cafe

---

## ⚠️ IMPORTANT: Production Deployment

**This app requires PostgreSQL database and CANNOT run on Softgen preview environment.**

For production deployment with Docker + PostgreSQL on VPS, see: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## Quick Start (5 phút)

### 1. Clone & Install
```bash
git clone <repo-url>
cd samcamping-cafe
npm install
```

### 2. Start Database
```bash
docker-compose up -d
```

### 3. Setup Database
```bash
# Copy environment variables
cp .env.example .env

# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npm run db:seed
```

### 4. Start App
```bash
npm run dev
```

Mở http://localhost:3000 ✅

---

## Chi tiết Setup

### A. Cài đặt Dependencies

```bash
npm install
```

Packages chính:
- `@prisma/client` - Database ORM
- `prisma` - Prisma CLI
- Next.js 15, React 18, TypeScript
- shadcn/ui components

### B. Database Setup

#### Option 1: Docker (Khuyến nghị)

```bash
# Start PostgreSQL + pgAdmin
docker-compose up -d

# Check
docker-compose ps
```

Services:
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:5050

#### Option 2: Local PostgreSQL

Nếu đã có PostgreSQL local:

```bash
# Edit .env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/samcamping_cafe"
```

### C. Prisma Migration

```bash
# Generate Prisma Client
npx prisma generate

# Create tables
npx prisma migrate dev --name init

# Seed sample data
npm run db:seed
```

Seed data bao gồm:
- 6 bàn mẫu (Bàn 1-5 + Bàn VIP)
- 40+ món ăn từ menu
- Admin user (username: admin, password: admin123)

### D. Verify Setup

```bash
# Open Prisma Studio
npx prisma studio
# → http://localhost:5555

# Hoặc dùng pgAdmin
# → http://localhost:5050
```

---

## Environment Variables

File `.env`:

```bash
# Database
DATABASE_URL="postgresql://samcamping:samcamping123@localhost:5432/samcamping_cafe"

# Admin (change in production!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"

# App
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**⚠️ IMPORTANT:** Đổi admin password trước khi deploy production!

---

## Database Schema

### Tables

**bookings**
- Lưu đơn đặt bàn
- Có bookingCode unique
- Tracking status, bill image

**tables**
- Danh sách bàn ghế
- Capacity, status (available/occupied/reserved)

**menu_items**
- Thực đơn món ăn
- Category, price, availability

**staff_requests**
- Yêu cầu gọi nhân viên
- Request type (call-staff, payment, support)

**admins**
- Tài khoản admin
- Username, password (hash trong production!)

### Prisma Commands

```bash
# Generate client
npx prisma generate

# Create migration
npx prisma migrate dev --name your_migration_name

# Reset database (⚠️ XÓA DATA!)
npx prisma migrate reset

# Open Studio
npx prisma studio

# Format schema
npx prisma format
```

---

## Development Workflow

### 1. Làm việc với Database

```bash
# Mở Prisma Studio
npm run db:studio

# Hoặc dùng pgAdmin
# http://localhost:5050
```

### 2. Thay đổi Schema

```bash
# Edit prisma/schema.prisma
# Thêm/sửa models

# Create migration
npx prisma migrate dev --name add_new_field

# Prisma Client tự động regenerate
```

### 3. Seed lại Database

```bash
npm run db:seed
```

---

## Troubleshooting

### "Port 5432 already in use"

PostgreSQL đã chạy trên máy:

**Option A:** Stop PostgreSQL local
```bash
# macOS
brew services stop postgresql

# Linux
sudo systemctl stop postgresql

# Windows
# Stop PostgreSQL service via Services app
```

**Option B:** Đổi port Docker
```yaml
# docker-compose.yml
services:
  postgres:
    ports:
      - "5433:5432"  # Dùng 5433

# .env
DATABASE_URL="postgresql://samcamping:samcamping123@localhost:5433/samcamping_cafe"
```

### "Cannot connect to database"

```bash
# Check Docker
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart
docker-compose restart
```

### Prisma Client errors

```bash
# Regenerate
npx prisma generate

# Reset (⚠️ mất data)
npx prisma migrate reset
```

### Migration conflicts

```bash
# Drop database và tạo lại
npx prisma migrate reset

# Hoặc resolve conflicts manually
npx prisma migrate resolve --applied <migration_name>
```

---

## Production Deployment

### 1. Build

```bash
npm run build
```

### 2. Environment

```bash
# .env.production
DATABASE_URL="postgresql://user:password@host:5432/dbname"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="<strong-password-here>"
NODE_ENV="production"
```

### 3. Run Migrations

```bash
npx prisma migrate deploy
```

### 4. Start

```bash
npm start
# hoặc
pm2 start ecosystem.config.js
```

---

## Backup & Restore

### Backup

```bash
# Via Docker
docker exec samcamping_db pg_dump -U samcamping samcamping_cafe > backup-$(date +%Y%m%d).sql

# Via pg_dump local
pg_dump -U samcamping -h localhost -p 5432 samcamping_cafe > backup.sql
```

### Restore

```bash
# Via Docker
docker exec -i samcamping_db psql -U samcamping samcamping_cafe < backup.sql

# Via psql local
psql -U samcamping -h localhost -p 5432 samcamping_cafe < backup.sql
```

---

## Next Steps

1. ✅ Setup xong → Test app: http://localhost:3000
2. ✅ Login admin: http://localhost:3000/admin/login
3. ✅ Xem database: http://localhost:5555 (Prisma Studio)
4. ✅ Đọc README.docker.md để hiểu rõ hơn về Docker
5. ✅ Customize menu, tables, settings

Happy coding! 🎉

## Scripts NPM

```bash
# Seed database
npm run db:seed

# Reset database (drop + recreate + seed)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name your_migration_name

# Open Prisma Studio
npm run db:studio
```