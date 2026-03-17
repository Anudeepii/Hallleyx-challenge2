# Custom Dashboard Builder

## Overview

The **Custom Dashboard Builder** enables users to create personalized dashboards using widgets such as **Charts, Tables, and KPI cards**.

It integrates with the **Customer Orders module**, allowing real-time visualization of data through an interactive and responsive interface.

---

## Key Features

* Drag-and-drop dashboard layout
* Multiple widget types (Charts, Tables, KPIs)
* Real-time data integration with customer orders
* Widget resizing and deletion
* Save and load dashboard configurations
* Responsive design for Desktop, Tablet, and Mobile

---

## Dashboard

* The dashboard initially loads with **no widgets configured**
* Users can click **“Configure Dashboard”** to build their layout
* Saved dashboards are automatically loaded on revisit

---

## Dashboard Configuration

Users can add widgets from the panel:

### Charts

* Bar Chart
* Line Chart
* Pie Chart
* Area Chart
* Scatter Plot

### Tables

* Table

### KPIs

* KPI Value

### Capabilities

* Drag and drop widgets onto the canvas
* Resize widgets dynamically
* Remove widgets
* Save dashboard configuration

---

## Customer Orders Module

* Create new customer orders with validation
* Automatic total amount calculation
* View orders in a structured table
* Delete orders
* Data is used for dashboard analytics

---

## Data Integration

* Dashboard widgets dynamically use **Customer Orders data**
* KPI cards display aggregated metrics (e.g., total revenue)
* Charts provide insights into order trends and performance

---

## Additional Features

* Date-based filtering:

  * All Time
  * Today
  * Last 7 Days
  * Last 30 Days
  * Last 90 Days

* Responsive grid layout:

  * Desktop (12 columns)
  * Tablet (8 columns)
  * Mobile (4 columns)

---

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open in browser:

   ```
   http://localhost:5173
   ```

---

## Project Structure

```
DashboardBuilder-main/
│
├── public/          # Static assets
├── src/             # Application source code
├── index.html       # Entry HTML file
├── package.json     # Project dependencies
├── vite.config.ts   # Vite configuration
├── tailwind.config.ts
└── tsconfig.json
```

---
## Sample Workflows

### Workflow 1: Sales Performance Dashboard

**Widgets Used:**

* KPI: Total Revenue
* Bar Chart: Product-wise sales
* Table: Customer orders

**Logic:**

* Fetch data from customer orders
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
* Categorize by status (Pending, Completed)
* Display recent transactions

---

## Execution Example

### Sample Input

```json
{
  "product": "Fiber Internet 300 Mbps",
  "quantity": 2,
  "unit_price": 50
}
```

### Execution Flow

1. Order is created via form
2. Total amount is calculated
3. Data stored in system
4. Dashboard widgets fetch updated data
5. KPI updates total revenue
6. Charts reflect new values

### Sample Output

```text
Order Created Successfully
Total Amount: $100
Dashboard Updated
```

---

## Demo

* Create customer orders
* Configure dashboard
* Add widgets
* Save layout
* View analytics

---

## Live Demo

🌐 hallleyx-challenge2-anudeepiis-projects.vercel.app


## Summary

This project delivers a **fully functional custom dashboard builder** with:

* Interactive widget-based layout
* Real-time analytics from customer data
* Persistent dashboard configurations
* Responsive and modern UI

Designed to provide a **scalable and user-friendly analytics experience**.
