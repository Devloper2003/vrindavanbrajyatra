# 🙏 Vrindavan Braj Yatra — Divine Pilgrimage Tour Website

A professional, cinematic website for Vrindavan Braj Yatra pilgrimage tour agency built with Next.js 16, TypeScript, Tailwind CSS, and Prisma.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database (local or cloud)
- npm

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/vrindavan-braj-yatra.git
cd vrindavan-braj-yatra

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 4. Setup database
npm run db:push
npm run db:seed

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Panel
- URL: `/admin`
- Username: `admin`
- Password: `brajyatra2024` (change via ADMIN_PASSWORD env var)

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel Dashboard
4. Deploy!

### VPS (Vultr/DigitalOcean)
```bash
sudo bash vultr-setup.sh --domain=yourdomain.com
```

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `ADMIN_PASSWORD` | ❌ | Admin password (default: brajyatra2024) |
| `RESEND_API_KEY` | ❌ | For email notifications |

## 📁 Project Structure

```
src/
├── app/
│   ├── (site)/          # Public pages
│   ├── admin/           # Admin panel
│   └── api/             # API routes
├── components/          # React components
├── lib/                 # Utilities & DB
prisma/
├── schema.prisma        # Database schema
├── seed.ts              # Seed data
└── migrations/          # DB migrations
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Animations:** Framer Motion
- **Deployment:** Vercel / VPS
