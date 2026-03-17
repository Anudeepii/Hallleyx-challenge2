export type WidgetType =
  | 'bar-chart'
  | 'line-chart'
  | 'pie-chart'
  | 'area-chart'
  | 'scatter-plot'
  | 'table'
  | 'kpi';

export interface KPIConfig {
  metric: string;
  aggregation: 'Sum' | 'Average' | 'Count';
  dataFormat: 'Number' | 'Currency';
  decimalPrecision: number;
}

export interface ChartConfig {
  xAxis: string;
  yAxis: string;
  chartColor: string;
  showDataLabel: boolean;
}

export interface PieChartConfig {
  chartData: string;
  showLegend: boolean;
}

export interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface TableWidgetConfig {
  columns: string[];
  sortBy: string;
  pagination: number;
  applyFilter: boolean;
  filters: FilterRule[];
  fontSize: number;
  headerBackground: string;
}

export type WidgetConfig = KPIConfig | ChartConfig | PieChartConfig | TableWidgetConfig;

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  config: WidgetConfig;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardLayouts {
  lg: LayoutItem[];
  md: LayoutItem[];
  sm: LayoutItem[];
  [key: string]: LayoutItem[];
}
