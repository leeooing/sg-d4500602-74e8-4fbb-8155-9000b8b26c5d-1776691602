# 🚀 Deployment Guide - SamCamping Cafe Production

## Yêu cầu VPS

### Minimum Requirements:
- **OS**: Ubuntu 20.04+ / Debian 11+
- **RAM**: 2GB+ (recommended 4GB)
- **Storage**: 20GB+
- **CPU**: 2 cores+
- **Network**: Public IP address

### Recommended VPS Providers:
- DigitalOcean ($12/month - 2GB RAM)
- Vultr ($12/month - 2GB RAM)
- Linode ($12/month - 2GB RAM)
- AWS Lightsail ($10/month - 2GB RAM)
- VPS Việt Nam: INET, Nhân Hòa, VinaHost

---

## Bước 1: Setup VPS

### 1.1. SSH vào VPS
```bash
ssh root@YOUR_VPS_IP
```

### 1.2. Update hệ thống
```bash
apt update && apt upgrade -y
```

### 1.3. Tạo user mới (không dùng root)
```bash
adduser samcamping
usermod -aG sudo samcamping
su - samcamping
```

---

## Bước 2: Cài đặt Docker & Docker Compose

### 2.1. Cài Docker
```bash
# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
```

### 2.2. Cài Docker Compose
```bash
# Download latest version
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

---

## Bước 3: Cài đặt Node.js & PM2

### 3.1. Cài Node.js 18+
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js 18
nvm install 18
nvm use 18
node --version  # Should be v18.x.x
```

### 3.2. Cài PM2
```bash
npm install -g pm2

# Setup PM2 startup
pm2 startup
# Copy & run the command shown in output
```

---

## Bước 4: Clone & Setup Project

### 4.1. Clone repository
```bash
# If using Git
cd ~
git clone YOUR_GITHUB_REPO_URL samcamping-cafe
cd samcamping-cafe

# Or upload project files via SCP/SFTP
```

### 4.2. Install dependencies
```bash
npm install
```

### 4.3. Setup environment
```bash
# Copy .env.example
cp .env.example .env

# Edit .env
nano .env
```

**Configure `.env`:**
```env
# Database
DATABASE_URL="postgresql://samcamping:samcamping123@localhost:5432/samcamping_cafe"

# Admin credentials (CHANGE THESE!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="YOUR_SECURE_PASSWORD_HERE"

# App
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="http://YOUR_DOMAIN_OR_IP"
```

**⚠️ IMPORTANT: Change default passwords!**

---

## Bước 5: Start Database

### 5.1. Start PostgreSQL với Docker
```bash
# Start database
docker-compose up -d

# Verify containers running
docker-compose ps

# Check logs
docker-compose logs -f postgres
```

### 5.2. Setup database schema
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed sample data
npm run db:seed
```

### 5.3. Verify database
```bash
# Open Prisma Studio
npm run db:studio
# Access at http://YOUR_VPS_IP:5555
```

---

## Bước 6: Build & Deploy App

### 6.1. Build Next.js
```bash
npm run build
```

### 6.2. Start with PM2
```bash
# Start app
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Check status
pm2 status
pm2 logs samcamping-cafe
```

### 6.3. Verify app running
```bash
# Check if app is listening
curl http://localhost:3000

# Check from browser
http://YOUR_VPS_IP:3000
```

---

## Bước 7: Setup Nginx Reverse Proxy (Optional but Recommended)

### 7.1. Cài Nginx
```bash
sudo apt install -y nginx
```

### 7.2. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/samcamping
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 7.3. Enable site
```bash
sudo ln -s /etc/nginx/sites-available/samcamping /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Bước 8: Setup SSL với Let's Encrypt (Optional)

### 8.1. Cài Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 8.2. Get SSL certificate
```bash
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

### 8.3. Auto-renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot tự động setup cronjob
```

---

## Bước 9: Setup Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## Bước 10: Monitoring & Maintenance

### 10.1. PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs samcamping-cafe
pm2 logs samcamping-cafe --lines 100

# Restart app
pm2 restart samcamping-cafe

# Stop app
pm2 stop samcamping-cafe
```

### 10.2. Database Monitoring
```bash
# Check PostgreSQL logs
docker-compose logs -f postgres

# Access pgAdmin
http://YOUR_VPS_IP:5050
```

### 10.3. Backup Database
```bash
# Manual backup
docker exec -t samcamping_postgres pg_dump -U samcamping samcamping_cafe > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
docker exec -i samcamping_postgres psql -U samcamping samcamping_cafe < backup_file.sql
```

### 10.4. Setup Auto Backup (Cronjob)
```bash
# Edit crontab
crontab -e

# Add daily backup at 3 AM
0 3 * * * cd ~/samcamping-cafe && docker exec -t samcamping_postgres pg_dump -U samcamping samcamping_cafe > backup_$(date +\%Y\%m\%d).sql
```

---

## Updating App

### When you have code updates:
```bash
# 1. Pull latest code
git pull origin main

# 2. Install new dependencies (if any)
npm install

# 3. Update database schema (if changed)
npx prisma generate
npx prisma db push

# 4. Rebuild app
npm run build

# 5. Restart PM2
pm2 restart samcamping-cafe

# 6. Check logs
pm2 logs samcamping-cafe
```

---

## Common Issues & Solutions

### Database connection fails:
```bash
# Check PostgreSQL running
docker-compose ps

# Restart database
docker-compose restart postgres

# Check connection
docker exec -it samcamping_postgres psql -U samcamping -d samcamping_cafe
```

### App not starting:
```bash
# Check build errors
npm run build

# Check PM2 logs
pm2 logs samcamping-cafe --err

# Restart app
pm2 restart samcamping-cafe
```

### Port already in use:
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 PROCESS_ID
```

---

## Security Checklist

- [ ] Change default admin password in `.env`
- [ ] Change default database password in `.env` and `docker-compose.yml`
- [ ] Setup firewall (UFW)
- [ ] Enable SSL/HTTPS
- [ ] Regular database backups
- [ ] Update system packages regularly
- [ ] Monitor logs for suspicious activity
- [ ] Use strong passwords (12+ characters, mixed case, numbers, symbols)

---

## Support

**Database Issues:**
- Check Docker logs: `docker-compose logs -f postgres`
- Access pgAdmin: http://YOUR_IP:5050

**App Issues:**
- Check PM2 logs: `pm2 logs samcamping-cafe`
- Check build: `npm run build`

**Need Help?**
- Docker docs: https://docs.docker.com/
- PM2 docs: https://pm2.keymetrics.io/
- Nginx docs: https://nginx.org/en/docs/

---

## Quick Reference

```bash
# Start everything
docker-compose up -d
pm2 start ecosystem.config.js

# Stop everything
pm2 stop samcamping-cafe
docker-compose down

# Restart app only
pm2 restart samcamping-cafe

# View logs
pm2 logs samcamping-cafe
docker-compose logs -f postgres

# Backup database
docker exec -t samcamping_postgres pg_dump -U samcamping samcamping_cafe > backup.sql

# Database admin
npm run db:studio  # Prisma Studio at :5555
# pgAdmin at :5050 (admin@samcamping.com / admin123)
```

---

**🎉 App deployed successfully!**
Access your app at: `http://YOUR_DOMAIN_OR_IP`
Admin panel: `http://YOUR_DOMAIN_OR_IP/admin/login`