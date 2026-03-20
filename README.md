# 🚀 Custom Dashboard Builder - Full-Stack Edition

A fully interactive, full-stack dashboard builder that allows users to create personalized dashboards using charts, tables, and KPI widgets with persistent data storage and real-time visualization.

---

## 🌐 Live Demo

🚀 **Production:** https://hallleyx-challenge2-anudeepiis-projects.vercel.app

🎥 **Demo Video:** https://drive.google.com/file/d/1Odn-FBf8bddd9ghkIRMjblkP_pki7ask/view?usp=drivesdk

📚 **Documentation:**
- [Quick Start Guide](QUICKSTART.md)
- [Full-Stack Implementation](FULLSTACK_IMPLEMENTATION.md)
- [Migration Guide](MIGRATION_GUIDE.md)

---

## 💻 Tech Stack

### Frontend
* **Framework:** React 18 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS, shadcn/ui
* **UI Components:** Radix UI, Lucide React, Framer Motion
* **State Management:** Zustand
* **Charts:** Recharts
* **Grid Layout:** react-grid-layout
* **Routing:** React Router DOM

### Backend
* **Database:** Supabase (PostgreSQL)
* **API:** Supabase Client SDK
* **Real-time:** Supabase Realtime (ready for implementation)
* **Authentication:** Public access (ready for Supabase Auth)

### DevOps
* **Hosting:** Vercel
* **CI/CD:** Automatic deployments via Vercel
* **Environment:** Production-ready with Supabase integration

---

## 📌 Overview

The Custom Dashboard Builder is a full-stack application that enables users to design dynamic dashboards by combining various widgets such as Charts, Tables, and KPI cards.

**Key Capabilities:**
- Complete CRUD operations for customer orders stored in PostgreSQL via Supabase
- Persistent dashboard configurations across sessions and devices
- Real-time data visualization with multiple chart types
- Responsive design adapting to Desktop (12-col), Tablet (8-col), and Mobile (4-col) grids
- Date-based filtering with automatic widget updates

---

## ✨ Key Features

### Data Persistence
* All customer orders stored in Supabase PostgreSQL database
* Dashboard configurations persisted across sessions
* Auto-generated Customer IDs (CUS-001, CUS-002, ...)
* Auto-generated Order IDs (ORD-001, ORD-002, ...)

### Dashboard Builder
* Drag-and-drop widget placement on canvas grid
* 7 widget types: Bar Chart, Line Chart, Pie Chart, Area Chart, Scatter Plot, Table, KPI
* Real-time configuration with instant preview
* Widget resizing, deletion, and full customization
* Save and load dashboard layouts from database

### Data Visualization
* Live data integration from customer orders
* Date filtering (All time, Today, Last 7/30/90 Days)
* Aggregation options (Sum, Average, Count)
* Customizable colors, fonts, and styling
* Responsive layouts for all screen sizes

### Customer Orders Management
* Complete CRUD operations (Create, Read, Update, Delete)
* Form validation for all required fields
* Automatic total amount calculation
* Order status tracking (Pending, In progress, Completed)
* Bulk operations (Clear all orders)

---

## 📊 Dashboard

* Initially loads with no widgets configured
* Users can click **“Configure Dashboard”** to build layouts
* Saved dashboards are automatically restored

---

## ⚙️ Dashboard Configuration

### 📈 Charts

* Bar Chart
* Line Chart
* Pie Chart
* Area Chart
* Scatter Plot

### 📋 Tables

* Table

### 📌 KPIs

* KPI Value

---

## 🧩 Capabilities

* Drag and drop widgets onto canvas
* Resize widgets dynamically
* Remove widgets
* Save dashboard configuration

---

## 🧾 Customer Orders Module

* Create orders with validation (mandatory fields)
* Automatic total amount calculation
* View orders in a structured table
* Delete orders
* Data feeds dashboard analytics

---

## 🔄 Data Flow Architecture

### Backend (Supabase PostgreSQL)
1. **customer_orders** table stores all order data
2. **dashboard_configurations** table stores widget layouts and settings
3. Row Level Security (RLS) enabled for data protection
4. Automatic ID generation and timestamp tracking

### Frontend (React + Zustand)
1. Supabase Client SDK for API communication
2. Zustand stores manage async operations and state
3. Real-time UI updates on data changes
4. TypeScript ensures type safety across the stack

### Data Sync Flow
```
User Action → Zustand Store → Supabase API → PostgreSQL
                                  ↓
                            Response Data
                                  ↓
                         State Update → UI Render
```

---

## 📅 Additional Features

### Date Filtering (Persistent)
* All Time
* Today
* Last 7 Days
* Last 30 Days
* Last 90 Days
* Filter selection saved to database

### Responsive Grid System
* **Desktop** (≥1024px): 12-column grid
* **Tablet** (768-1023px): 8-column grid with auto-wrap
* **Mobile** (<768px): 4-column grid with vertical stacking

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js 18+
- Supabase account (already configured)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Access the app:**
- Local: http://localhost:8080
- Network: Check terminal for network URL

### Environment Variables

Already configured in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
DashboardBuilder-main/
│
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── dashboard/      # Dashboard widgets & config
│   │   │   └── orders/         # Order management components
│   │   ├── layout/             # App layout & sidebar
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client setup
│   │   ├── computeWidgetData.ts # Widget data computation
│   │   └── utils.ts            # Utility functions
│   ├── stores/
│   │   ├── orderStore.ts       # Order state + Supabase integration
│   │   └── dashboardStore.ts   # Dashboard state + Supabase integration
│   ├── types/
│   │   ├── order.ts            # Order type definitions
│   │   ├── dashboard.ts        # Dashboard type definitions
│   │   └── supabase.ts         # Database schema types
│   ├── pages/                  # Route pages
│   ├── constants/              # Configuration constants
│   └── hooks/                  # Custom React hooks
├── .env                        # Environment variables (Supabase)
├── QUICKSTART.md               # Quick start guide
├── FULLSTACK_IMPLEMENTATION.md # Architecture documentation
├── MIGRATION_GUIDE.md          # Migration documentation
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🔁 Sample Workflows

### Workflow 1: Sales Performance Dashboard

**Widgets Used:**

* KPI: Total Revenue
* Bar Chart: Product-wise sales
* Table: Customer orders

**Logic:**

* Aggregate total revenue
* Group sales by product

---

### Workflow 2: Order Monitoring Dashboard

**Widgets Used:**

* KPI: Total Orders
* Pie Chart: Order Status Distribution
* Table: Recent Orders

**Logic:**

* Count total orders
* Categorize by status
* Display recent transactions

---

## ▶️ Execution Example

### Sample Input

```json
{
  "product": "Fiber Internet 300 Mbps",
  "quantity": 2,
  "unit_price": 50
}
```

### Execution Flow

1. Order is created
2. Total amount is calculated
3. Data is stored
4. Dashboard updates automatically
5. KPIs and charts refresh

### Sample Output

```
Order Created Successfully
Total Amount: $100
Dashboard Updated
```

---

## 🗄️ Database Schema

### customer_orders Table
Stores all customer order information with auto-generated IDs and constraints.

**Key Fields:**
- `id`, `customer_id`, `order_id`
- Customer info (name, email, phone, address)
- Order details (product, quantity, unit_price, total_amount)
- Metadata (status, created_by, order_date)

### dashboard_configurations Table
Stores dashboard layouts and widget configurations in JSONB format.

**Key Fields:**
- `id`, `user_id`, `name`
- `widgets` (JSONB array of widget configs)
- `layouts` (JSONB responsive layouts)
- `date_filter`, `is_active`

**Security:**
- Row Level Security (RLS) enabled on both tables
- Public access policies (ready for user authentication)
- Automatic timestamp tracking

---

## 🚀 Deployment

### Current Deployment
- **Platform:** Vercel
- **URL:** https://hallleyx-challenge2-anudeepiis-projects.vercel.app
- **Database:** Supabase (PostgreSQL)
- **CI/CD:** Automatic deployment on git push

### Deploy Your Own

1. Fork this repository
2. Create a Supabase project
3. Run migrations (already configured)
4. Deploy to Vercel:
   - Connect your repo
   - Add environment variables (Supabase URL & Key)
   - Deploy

---

## 🎯 Summary

This project delivers a complete **Full-Stack Custom Dashboard Builder** with:

### Frontend Excellence
* Interactive drag-and-drop widget builder
* Real-time data visualization with 7 widget types
* Fully responsive modern UI (12/8/4 column grids)
* Type-safe React + TypeScript implementation

### Backend Infrastructure
* Supabase PostgreSQL database for data persistence
* RESTful API integration via Supabase Client SDK
* Row Level Security for data protection
* Auto-generated IDs and timestamp tracking

### Production Ready
* Deployed on Vercel with automatic CI/CD
* Environment-based configuration
* Error handling and loading states
* Scalable architecture for future enhancements

**Perfect for:** Business analytics, sales dashboards, order tracking, KPI monitoring, and custom reporting solutions.

---

## 📈 Future Enhancements

- User authentication with Supabase Auth
- Real-time collaborative dashboards
- Data export (CSV, PDF, Excel)
- Advanced filtering and search
- Custom widget builder
- Dashboard templates
- API rate limiting
- Mobile app (React Native)

---
