# 🚀 Custom Dashboard Builder

A fully interactive dashboard builder that allows users to create personalized dashboards using charts, tables, and KPI widgets with real-time data integration.

---

## 🌐 Live Demo

🚀 https://hallleyx-challenge2-anudeepiis-projects.vercel.app

🎥 Demo Video: https://drive.google.com/file/d/1Odn-FBf8bddd9ghkIRMjblkP_pki7ask/view?usp=drivesdk

---

## 💻 Tech Stack

* **Frontend:** React (TypeScript), Vite, Tailwind CSS, shadcn/ui
* **UI Libraries:** Radix UI, Lucide React, Framer Motion
* **State Management:** Zustand, Redux Toolkit
* **Data Handling:** Axios, React Query
* **Forms & Validation:** React Hook Form, Zod
* **Charts & Visualization:** Recharts, Chart.js
* **Routing:** React Router DOM
* **Backend Services:** Supabase
* **Deployment:** Vercel

---

## 📌 Overview

The Custom Dashboard Builder enables users to design dynamic dashboards by combining widgets such as Charts, Tables, and KPI cards.

It integrates with the Customer Orders module, allowing real-time visualization of data through an intuitive and responsive interface.

---

## ✨ Key Features

* Drag-and-drop dashboard layout
* Multiple widget types (Charts, Tables, KPIs)
* Real-time data integration with customer orders
* Widget resizing and deletion
* Save and load dashboard configurations
* Fully responsive (Desktop, Tablet, Mobile)

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

## 🔄 Data Integration

* Dashboard widgets use real-time order data
* KPI cards display aggregated metrics (e.g., total revenue)
* Charts visualize trends and performance insights

---

## 📅 Additional Features

### Date Filtering

* All Time
* Today
* Last 7 Days
* Last 30 Days
* Last 90 Days

### Responsive Layout

* Desktop (12 columns)
* Tablet (8 columns)
* Mobile (4 columns)

---

## ⚙️ How to Run Locally

```bash
npm install
npm run dev
```

Open in browser:

http://localhost:5173

---

## 📁 Project Structure

# 🚀 Custom Dashboard Builder

A fully interactive dashboard builder that allows users to create personalized dashboards using charts, tables, and KPI widgets with real-time data integration.

---

## 🌐 Live Demo

🚀 https://hallleyx-challenge2-anudeepiis-projects.vercel.app

🎥 Demo Video: https://drive.google.com/file/d/1Odn-FBf8bddd9ghkIRMjblkP_pki7ask/view?usp=drivesdk

---

## 💻 Tech Stack

* **Frontend:** React (TypeScript), Vite, Tailwind CSS, shadcn/ui
* **UI Libraries:** Radix UI, Lucide React, Framer Motion
* **State Management:** Zustand, Redux Toolkit
* **Data Handling:** Axios, React Query
* **Forms & Validation:** React Hook Form, Zod
* **Charts & Visualization:** Recharts, Chart.js
* **Routing:** React Router DOM
* **Backend Services:** Supabase
* **Deployment:** Vercel

---

## 📌 Overview

The Custom Dashboard Builder enables users to design dynamic dashboards by combining widgets such as Charts, Tables, and KPI cards.

It integrates with the Customer Orders module, allowing real-time visualization of data through an intuitive and responsive interface.

---

## ✨ Key Features

* Drag-and-drop dashboard layout
* Multiple widget types (Charts, Tables, KPIs)
* Real-time data integration with customer orders
* Widget resizing and deletion
* Save and load dashboard configurations
* Fully responsive (Desktop, Tablet, Mobile)

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

## 🔄 Data Integration

* Dashboard widgets use real-time order data
* KPI cards display aggregated metrics (e.g., total revenue)
* Charts visualize trends and performance insights

---

## 📅 Additional Features

### Date Filtering

* All Time
* Today
* Last 7 Days
* Last 30 Days
* Last 90 Days

### Responsive Layout

* Desktop (12 columns)
* Tablet (8 columns)
* Mobile (4 columns)

---

## ⚙️ How to Run Locally

```bash
npm install
npm run dev
```

Open in browser:

http://localhost:5173

---

## 📁 Project Structure

DashboardBuilder-main/
│
├── public/          # Static assets

├── src/             # Application source code

├── index.html       # Entry HTML file

├── package.json     # Project dependencies

├── vite.config.ts   # Vite configuration

├── tailwind.config.ts

└── tsconfig.json

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

## 🎯 Summary

This project delivers a complete Custom Dashboard Builder with:

* Interactive widget-based layout
* Real-time analytics from order data
* Persistent dashboard configurations
* Fully responsive modern UI

Designed as a scalable and user-friendly analytics platform.


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

## 🎯 Summary

This project delivers a complete Custom Dashboard Builder with:

* Interactive widget-based layout
* Real-time analytics from order data
* Persistent dashboard configurations
* Fully responsive modern UI

Designed as a scalable and user-friendly analytics platform.
