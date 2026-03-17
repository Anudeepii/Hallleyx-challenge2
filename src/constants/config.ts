export const COUNTRIES = [
  'United States',
  'Canada',
  'Australia',
  'Singapore',
  'Hong Kong',
] as const;

export const PRODUCTS = [
  'Fiber Internet 300 Mbps',
  '5G Unlimited Mobile Plan',
  'Fiber Internet 1 Gbps',
  'Business Internet 500 Mbps',
  'VoIP Corporate Package',
] as const;

export const STATUSES = ['Pending', 'In progress', 'Completed'] as const;

export const CREATED_BY_OPTIONS = [
  'Mr. Michael Harris',
  'Mr. Ryan Cooper',
  'Ms. Olivia Carter',
  'Mr. Lucas Martin',
] as const;

export const DATE_FILTER_OPTIONS = [
  { label: 'All time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' },
  { label: 'Last 90 Days', value: '90days' },
] as const;

export const WIDGET_CATEGORIES = [
  {
    label: 'Charts',
    widgets: [
      { type: 'bar-chart' as const, label: 'Bar Chart' },
      { type: 'line-chart' as const, label: 'Line Chart' },
      { type: 'pie-chart' as const, label: 'Pie Chart' },
      { type: 'area-chart' as const, label: 'Area Chart' },
      { type: 'scatter-plot' as const, label: 'Scatter Plot' },
    ],
  },
  {
    label: 'Tables',
    widgets: [{ type: 'table' as const, label: 'Table' }],
  },
  {
    label: 'KPIs',
    widgets: [{ type: 'kpi' as const, label: 'KPI Value' }],
  },
] as const;

export const WIDGET_TYPE_LABELS: Record<string, string> = {
  'bar-chart': 'Bar Chart',
  'line-chart': 'Line Chart',
  'pie-chart': 'Pie Chart',
  'area-chart': 'Area Chart',
  'scatter-plot': 'Scatter Plot',
  table: 'Table',
  kpi: 'KPI',
};

export const KPI_METRICS = [
  'Customer ID',
  'Customer name',
  'Email id',
  'Address',
  'Order date',
  'Product',
  'Created by',
  'Status',
  'Total amount',
  'Unit price',
  'Quantity',
] as const;

export const CHART_AXIS_OPTIONS = [
  'Product',
  'Quantity',
  'Unit price',
  'Total amount',
  'Status',
  'Created by',
  'Duration',
] as const;

export const PIE_CHART_DATA_OPTIONS = [
  'Product',
  'Quantity',
  'Unit price',
  'Total amount',
  'Status',
  'Created by',
] as const;

export const TABLE_COLUMN_OPTIONS = [
  'Customer ID',
  'Customer name',
  'Email id',
  'Phone number',
  'Address',
  'Order ID',
  'Order date',
  'Product',
  'Quantity',
  'Unit price',
  'Total amount',
  'Status',
  'Created by',
] as const;

export const NUMERIC_FIELDS = ['Total amount', 'Unit price', 'Quantity'];

export const DEFAULT_WIDGET_SIZES: Record<string, { w: number; h: number }> = {
  kpi: { w: 2, h: 2 },
  'bar-chart': { w: 5, h: 5 },
  'line-chart': { w: 5, h: 5 },
  'area-chart': { w: 5, h: 5 },
  'scatter-plot': { w: 5, h: 5 },
  'pie-chart': { w: 4, h: 4 },
  table: { w: 4, h: 4 },
};

export const PIE_COLORS = [
  '#54BD95',
  '#3B82F6',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#06B6D4',
  '#84CC16',
];

export const FILTER_OPERATORS = [
  'Contains',
  'Equals',
  'Greater than',
  'Less than',
] as const;
