import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  DashboardWidget,
  DashboardLayouts,
  WidgetType,
  WidgetConfig,
  KPIConfig,
  ChartConfig,
  PieChartConfig,
  TableWidgetConfig,
} from '@/types/dashboard';
import { DEFAULT_WIDGET_SIZES } from '@/constants/config';

function getDefaultConfig(type: WidgetType): WidgetConfig {
  switch (type) {
    case 'kpi':
      return {
        metric: 'Total amount',
        aggregation: 'Sum',
        dataFormat: 'Number',
        decimalPrecision: 0,
      } as KPIConfig;
    case 'pie-chart':
      return {
        chartData: 'Product',
        showLegend: false,
      } as PieChartConfig;
    case 'table':
      return {
        columns: ['Customer ID', 'Customer name', 'Product', 'Total amount', 'Status'],
        sortBy: '',
        pagination: 10,
        applyFilter: false,
        filters: [],
        fontSize: 14,
        headerBackground: '#54bd95',
      } as TableWidgetConfig;
    default:
      return {
        xAxis: 'Product',
        yAxis: 'Total amount',
        chartColor: '#54BD95',
        showDataLabel: false,
      } as ChartConfig;
  }
}

interface DashboardState {
  widgets: DashboardWidget[];
  layouts: DashboardLayouts;
  draftWidgets: DashboardWidget[];
  draftLayouts: DashboardLayouts;
  dateFilter: string;

  initDraft: () => void;
  addDraftWidget: (type: WidgetType, x: number, y: number) => void;
  removeDraftWidget: (id: string) => void;
  updateDraftWidget: (id: string, updates: Partial<DashboardWidget>) => void;
  updateDraftWidgetConfig: (id: string, configUpdates: Partial<WidgetConfig>) => void;
  updateDraftLayouts: (layouts: DashboardLayouts) => void;
  resizeDraftWidget: (id: string, w: number, h: number) => void;
  saveConfiguration: () => void;
  setDateFilter: (filter: string) => void;
  clearConfiguration: () => void;
}

const emptyLayouts: DashboardLayouts = { lg: [], md: [], sm: [] };

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: [],
      layouts: { ...emptyLayouts },
      draftWidgets: [],
      draftLayouts: { ...emptyLayouts },
      dateFilter: 'all',

      initDraft: () => {
        const { widgets, layouts } = get();
        set({
          draftWidgets: JSON.parse(JSON.stringify(widgets)),
          draftLayouts: JSON.parse(JSON.stringify(layouts)),
        });
      },

      addDraftWidget: (type, x, y) => {
        const id = crypto.randomUUID();
        const size = DEFAULT_WIDGET_SIZES[type] || { w: 4, h: 4 };
        const widget: DashboardWidget = {
          id,
          type,
          title: 'Untitled',
          description: '',
          config: getDefaultConfig(type),
        };

        const state = get();
        const lgItem = { i: id, x, y, w: size.w, h: size.h };
        const mdMaxY = (state.draftLayouts.md || []).reduce(
          (m, i) => Math.max(m, i.y + i.h),
          0
        );
        const smMaxY = (state.draftLayouts.sm || []).reduce(
          (m, i) => Math.max(m, i.y + i.h),
          0
        );

        set({
          draftWidgets: [...state.draftWidgets, widget],
          draftLayouts: {
            lg: [...(state.draftLayouts.lg || []), lgItem],
            md: [
              ...(state.draftLayouts.md || []),
              { i: id, x: 0, y: mdMaxY, w: Math.min(size.w, 8), h: size.h },
            ],
            sm: [
              ...(state.draftLayouts.sm || []),
              { i: id, x: 0, y: smMaxY, w: Math.min(size.w, 4), h: size.h },
            ],
          },
        });
      },

      removeDraftWidget: (id) => {
        const state = get();
        set({
          draftWidgets: state.draftWidgets.filter((w) => w.id !== id),
          draftLayouts: {
            lg: (state.draftLayouts.lg || []).filter((l) => l.i !== id),
            md: (state.draftLayouts.md || []).filter((l) => l.i !== id),
            sm: (state.draftLayouts.sm || []).filter((l) => l.i !== id),
          },
        });
      },

      updateDraftWidget: (id, updates) => {
        set({
          draftWidgets: get().draftWidgets.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
        });
      },

      updateDraftWidgetConfig: (id, configUpdates) => {
        set({
          draftWidgets: get().draftWidgets.map((w) =>
            w.id === id ? { ...w, config: { ...w.config, ...configUpdates } } : w
          ),
        });
      },

      updateDraftLayouts: (layouts) => {
        set({
          draftLayouts: {
            lg: layouts.lg || get().draftLayouts.lg,
            md: layouts.md || get().draftLayouts.md,
            sm: layouts.sm || get().draftLayouts.sm,
          },
        });
      },

      resizeDraftWidget: (id, w, h) => {
        const state = get();
        set({
          draftLayouts: {
            lg: (state.draftLayouts.lg || []).map((l) =>
              l.i === id ? { ...l, w, h } : l
            ),
            md: (state.draftLayouts.md || []).map((l) =>
              l.i === id ? { ...l, w: Math.min(w, 8), h } : l
            ),
            sm: (state.draftLayouts.sm || []).map((l) =>
              l.i === id ? { ...l, w: Math.min(w, 4), h } : l
            ),
          },
        });
      },

      saveConfiguration: () => {
        const { draftWidgets, draftLayouts } = get();
        set({
          widgets: JSON.parse(JSON.stringify(draftWidgets)),
          layouts: JSON.parse(JSON.stringify(draftLayouts)),
        });
      },

      clearConfiguration: () => {
        set({
          widgets: [],
          layouts: { ...emptyLayouts },
          draftWidgets: [],
          draftLayouts: { ...emptyLayouts },
          dateFilter: 'all',
        });
      },

      setDateFilter: (filter) => set({ dateFilter: filter }),
    }),
    { name: 'dashboard-config-store' }
  )
);
