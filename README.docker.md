# 🐳 Docker Setup - SamCamping Cafe

---

## 🚀 Production Deployment

**For complete VPS deployment guide with step-by-step instructions, see: [DEPLOYMENT.md](./DEPLOYMENT.md)**

This README covers Docker setup only. For full production deployment including:
- VPS setup
- Domain & SSL
- Nginx reverse proxy
- PM2 process management
- Backups & monitoring

→ **Follow [DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## Yêu cầu
- Docker Desktop hoặc Docker Engine
- Docker Compose v2.0+

## Bước 1: Khởi động Database

```bash
# Start PostgreSQL + pgAdmin
docker-compose up -d

# Check containers
docker-compose ps
```

**Services:**
- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050`

**Credentials:**
- PostgreSQL:
  - User: `samcamping`
  - Password: `samcamping123`
  - Database: `samcamping_cafe`

- pgAdmin:
  - Email: `admin@samcamping.com`
  - Password: `admin123`

## Bước 2: Cấu hình môi trường

```bash
# Copy .env.example
cp .env.example .env

# .env đã có DATABASE_URL đúng, không cần sửa
```

## Bước 3: Setup Prisma

```bash
# Install Prisma CLI
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations (tạo tables)
npx prisma migrate dev --name init

# Seed database với sample data
npm run seed
```

## Bước 4: Khởi động Next.js

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Truy cập ứng dụng

- App: `http://localhost:3000`
- pgAdmin: `http://localhost:5050`

## Quản lý Database

### Via pgAdmin Web UI

1. Mở `http://localhost:5050`
2. Login với credentials
3. Add New Server:
   - Name: SamCamping
   - Host: `postgres` (container name)
   - Port: `5432`
   - Username: `samcamping`
   - Password: `samcamping123`

### Via Prisma Studio

```bash
npx prisma studio
# Mở http://localhost:5555
```

### Via CLI

```bash
# Connect to PostgreSQL
docker exec -it samcamping_db psql -U samcamping -d samcamping_cafe

# List tables
\dt

# Query
SELECT * FROM bookings;

# Exit
\q
```

## Các lệnh Docker hữu ích

```bash
# Xem logs
docker-compose logs -f postgres

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Stop và xóa volumes (DATA SẼ MẤT!)
docker-compose down -v

# Backup database
docker exec samcamping_db pg_dump -U samcamping samcamping_cafe > backup.sql

# Restore database
docker exec -i samcamping_db psql -U samcamping samcamping_cafe < backup.sql
```

## Scripts NPM

```bash
# Seed database
npm run seed

# Reset database (drop + recreate + seed)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name your_migration_name
```

## Troubleshooting

### Port 5432 đã được sử dụng
```bash
# Thay đổi port trong docker-compose.yml
ports:
  - "5433:5432"  # Dùng port 5433 thay vì 5432

# Update DATABASE_URL trong .env
DATABASE_URL="postgresql://samcamping:samcamping123@localhost:5433/samcamping_cafe"
```

### Cannot connect to database
```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### Prisma Client errors
```bash
# Regenerate
npx prisma generate

# Reset
npx prisma migrate reset
```

## Production Deployment

Để deploy production với Docker:

```bash
# Build image
docker build -t samcamping-cafe .

# Run with docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```