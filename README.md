# Custom Dashboard Builder

This project is a React + Vite dashboard builder with customer orders and widget configuration.

## 🚀 Run locally

From the repository root:

```powershell
cd "C:\Users\anuud\Downloads\DashboardBuilder-main"
npm install
npm run dev
```

Then open:

- `http://localhost:8080`

## 📦 What is in this project

- Customer Orders (create/edit/delete with validation)
- Dashboard build flow (drag/drop widgets, widget settings, save configuration)
- Persisted state using localStorage (orders + dashboard config)
- Responsive dashboard grid (desktop/tablet/mobile)

## ✅ Feature checklist

1. Customer Orders
   - [x] Starts empty
   - [x] Create order popup with required field validation
   - [x] Quantity min 1 and total amount calculation
   - [x] Edit and delete orders
   - [x] Data persistence across refresh

2. Dashboard
   - [x] Starts empty by default
   - [x] Configure Dashboard page with widget palette
   - [x] Drag & drop widgets to canvas
   - [x] Widget settings + resize + delete
   - [x] Save configuration
   - [x] Persisted state across refresh

3. Additional
   - [x] Date filter for dashboard data
   - [x] Responsive behavior (12/8/4 columns)

## 🧠 Notes for submission

- If the app fails to start, ensure you are in the nested project folder:
  `DashboardBuilder-main/DashboardBuilder-main`.
- Run:
  - `npm install`
  - `npm run dev`
- Open `http://localhost:8080`.

## 📁 Important files

- `src/pages/Dashboard.tsx`
- `src/pages/DashboardConfig.tsx`
- `src/pages/CustomerOrders.tsx`
- `src/components/features/dashboard/CanvasGrid.tsx`
- `src/components/features/dashboard/WidgetSettingsPanel.tsx`
- `src/components/features/orders/OrderFormModal.tsx`
- `src/stores/dashboardStore.ts`
- `src/stores/orderStore.ts`

## Built With

- Vite
- React
- TypeScript
- Zustand
- Tailwind CSS
- shadcn-ui

