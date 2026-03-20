# Quick Start Guide - Full-Stack Dashboard Builder

This guide will help you get the full-stack dashboard builder up and running quickly.

---

## Prerequisites

- Node.js 18+ installed
- npm or bun package manager
- Supabase project (already configured)

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

The `.env` file is already configured with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xmxwjglbflsezzqtuzes.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database Setup

The database has been automatically configured with:
- `customer_orders` table
- `dashboard_configurations` table
- Row Level Security (RLS) enabled
- Public access policies

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:8080`

### Production Build

```bash
npm run build
npm run preview
```

---

## First Steps

### 1. Create Your First Order

1. Navigate to **Customer Orders** page
2. Click **Create Order** button
3. Fill in all required fields:
   - Customer Information (name, email, phone, address)
   - Order Information (product, quantity, unit price, status)
4. Click **Submit**
5. Order appears in the table with auto-generated Customer ID and Order ID

### 2. Build Your Dashboard

1. Navigate to **Dashboard** page
2. Click **Configure Dashboard** button
3. Drag widgets from the palette on the left:
   - **Charts**: Bar, Line, Pie, Area, Scatter Plot
   - **Tables**: Filterable data tables
   - **KPIs**: Aggregated metrics
4. Configure each widget:
   - Click the **Settings** icon on hover
   - Set title, description, data source, styling
5. Click **Save Configuration**
6. Your dashboard is now live!

### 3. Use Date Filters

1. On the Dashboard page, use the **Show data for** dropdown
2. Select a date range:
   - All time
   - Today
   - Last 7 Days
   - Last 30 Days
   - Last 90 Days
3. All widgets update automatically

---

## Features Overview

### Customer Orders Module

**Create Order:**
- All fields mandatory except description
- Auto-generates Customer ID (CUS-001, CUS-002, ...)
- Auto-generates Order ID (ORD-001, ORD-002, ...)
- Auto-calculates total amount (quantity × unit price)

**Edit Order:**
- Click three-dot menu → Edit
- Modify any field
- Total amount recalculated automatically

**Delete Order:**
- Click three-dot menu → Delete
- Confirmation dialog appears
- Order permanently removed

**Clear All Orders:**
- Click **Clear Orders** button
- Removes all orders from database

### Dashboard Module

**Widget Types:**

1. **KPI Cards**
   - Display single aggregated value
   - Metrics: Total amount, Quantity, Customer count, etc.
   - Aggregation: Sum, Average, Count
   - Format: Number or Currency

2. **Bar Chart**
   - Compare values across categories
   - X-axis: Product, Status, Created by, etc.
   - Y-axis: Total amount, Quantity, etc.
   - Customizable colors

3. **Line Chart**
   - Show trends over time or categories
   - Configurable axes
   - Data labels optional

4. **Pie Chart**
   - Distribution visualization
   - Data source: Product, Status, Created by
   - Optional legend

5. **Area Chart**
   - Similar to line chart with filled area
   - Good for volume/cumulative data

6. **Scatter Plot**
   - Compare two numeric dimensions
   - Identify patterns and correlations

7. **Table**
   - Tabular data display
   - Column selection
   - Sorting (Ascending, Descending, Date)
   - Pagination (5, 10, 15 rows)
   - Filtering with multiple rules

**Widget Configuration:**
- **Size**: Adjust width (columns) and height (rows)
- **Data**: Choose metrics and axes
- **Styling**: Colors, fonts, backgrounds
- **Filters**: Apply data filters (table widget)

**Responsive Behavior:**
- **Desktop** (≥1024px): 12-column grid
- **Tablet** (768-1023px): 8-column grid (auto-wrap)
- **Mobile** (<768px): 4-column grid (stack vertically)

---

## Sample Workflow

### Example 1: Sales Performance Dashboard

1. Create sample orders:
   - Various products
   - Different quantities
   - Multiple statuses

2. Add widgets:
   - **KPI**: Total Revenue (Sum of Total amount)
   - **Bar Chart**: Sales by Product (Product vs Total amount)
   - **Pie Chart**: Order Status Distribution (Status)
   - **Table**: Recent Orders (all columns, sort by Order date)

3. Apply date filter: Last 30 Days

4. Result: Complete sales overview with metrics, trends, and details

### Example 2: Order Monitoring Dashboard

1. Create orders with different statuses

2. Add widgets:
   - **KPI**: Total Orders (Count)
   - **KPI**: Pending Orders (Count, filtered)
   - **Pie Chart**: Status Distribution
   - **Table**: Active Orders (filtered by status)

3. Monitor order pipeline at a glance

---

## Data Persistence

### What Gets Saved

**Customer Orders:**
- All order data stored in `customer_orders` table
- Persists across sessions and devices
- Auto-increment IDs maintained

**Dashboard Configuration:**
- Widget layouts stored in `dashboard_configurations` table
- Widget settings and preferences
- Date filter selection
- Persists across sessions

### Data Access

- All data accessible from any device with the app URL
- No login required (public access mode)
- Changes immediately visible after refresh

---

## Troubleshooting

### Orders Not Appearing

**Check:**
1. Browser console for errors
2. Network tab for failed API calls
3. Supabase connection status

**Solution:**
- Refresh the page
- Verify environment variables
- Check Supabase project status

### Dashboard Not Loading

**Check:**
1. Configuration saved successfully
2. Orders exist in database
3. Widget settings valid

**Solution:**
- Reconfigure dashboard
- Create sample orders
- Check widget data source settings

### Widgets Showing No Data

**Check:**
1. Orders exist for selected date range
2. Widget data source configured correctly
3. Date filter not too restrictive

**Solution:**
- Change date filter to "All time"
- Create more sample orders
- Verify widget metric selection

---

## Tips and Best Practices

### Creating Effective Dashboards

1. **Start Simple**: Add 3-4 key widgets first
2. **Use KPIs**: Display important metrics at the top
3. **Mix Widget Types**: Combine charts, tables, and KPIs
4. **Logical Layout**: Group related widgets together
5. **Consistent Sizing**: Keep similar widgets same height

### Optimal Widget Sizes

- **KPI Cards**: 2×2 or 3×2
- **Charts**: 5×5 or 6×5
- **Pie Charts**: 4×4
- **Tables**: 6×4 or 12×4 (full width)

### Performance Tips

1. **Limit Widgets**: 6-10 widgets per dashboard
2. **Use Filters**: Filter table data when possible
3. **Pagination**: Enable for tables with many rows
4. **Date Ranges**: Use specific date filters when appropriate

---

## Next Steps

### Enhance Your Dashboard

1. **Add More Orders**: Create diverse sample data
2. **Experiment with Widgets**: Try different chart types
3. **Configure Filters**: Use table filters for insights
4. **Adjust Layouts**: Optimize for your screen size

### Advanced Features

1. **Complex Filters**: Combine multiple filter rules in tables
2. **Custom Colors**: Match your brand colors
3. **Multi-Dashboard**: Clear and create different dashboard views
4. **Data Export**: (Coming soon) Export data to CSV/PDF

---

## Support Resources

- **Documentation**: See `FULLSTACK_IMPLEMENTATION.md` for architecture details
- **Migration Guide**: See `MIGRATION_GUIDE.md` for technical changes
- **README**: See `README.md` for project overview

---

## Quick Reference

### Keyboard Shortcuts
- None currently implemented (future enhancement)

### Important URLs
- Dashboard: `/dashboard`
- Dashboard Config: `/dashboard/configure`
- Customer Orders: `/orders`

### Default Values
- Order Status: Pending
- Quantity: 1
- Date Filter: All time
- Table Pagination: 10 rows
- Widget Title: Untitled

---

## Deployment

The application is deployed at:
https://hallleyx-challenge2-anudeepiis-projects.vercel.app

Any changes pushed to the repository will automatically deploy to Vercel.

---

Congratulations! You're ready to build powerful dashboards with real-time data. Start by creating some orders and configuring your first dashboard.
