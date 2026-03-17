import { useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import {
  WIDGET_TYPE_LABELS,
  KPI_METRICS,
  CHART_AXIS_OPTIONS,
  PIE_CHART_DATA_OPTIONS,
  TABLE_COLUMN_OPTIONS,
  NUMERIC_FIELDS,
  FILTER_OPERATORS,
} from '@/constants/config';
import type {
  KPIConfig,
  ChartConfig,
  PieChartConfig,
  TableWidgetConfig,
  FilterRule,
} from '@/types/dashboard';

interface WidgetSettingsPanelProps {
  widgetId: string | null;
  onClose: () => void;
}

export default function WidgetSettingsPanel({ widgetId, onClose }: WidgetSettingsPanelProps) {
  const { draftWidgets, draftLayouts, updateDraftWidget, updateDraftWidgetConfig, resizeDraftWidget } =
    useDashboardStore();

  const widget = useMemo(
    () => draftWidgets.find((w) => w.id === widgetId),
    [draftWidgets, widgetId]
  );

  const layoutItem = useMemo(
    () => (draftLayouts.lg || []).find((l) => l.i === widgetId),
    [draftLayouts.lg, widgetId]
  );

  if (!widget || !layoutItem) {
    return (
      <Sheet open={false} onOpenChange={onClose}>
        <SheetContent />
      </Sheet>
    );
  }

  const updateConfig = (updates: Record<string, any>) => {
    updateDraftWidgetConfig(widget.id, updates);
  };

  return (
    <Sheet open={!!widgetId} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Widget Settings</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Common fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="widget-title">Widget title *</Label>
              <Input
                id="widget-title"
                value={widget.title}
                onChange={(e) => updateDraftWidget(widget.id, { title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Widget type</Label>
              <Badge variant="secondary" className="text-sm">
                {WIDGET_TYPE_LABELS[widget.type] || widget.type}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="widget-desc">Description</Label>
              <Textarea
                id="widget-desc"
                value={widget.description}
                onChange={(e) => updateDraftWidget(widget.id, { description: e.target.value })}
                rows={2}
                placeholder="Optional description..."
              />
            </div>
          </div>

          <Separator />

          {/* Widget Size */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Widget Size</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="widget-w">Width (Columns)</Label>
                <Input
                  id="widget-w"
                  type="number"
                  min={1}
                  max={12}
                  value={layoutItem.w}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    resizeDraftWidget(widget.id, val, layoutItem.h);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="widget-h">Height (Rows)</Label>
                <Input
                  id="widget-h"
                  type="number"
                  min={1}
                  value={layoutItem.h}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    resizeDraftWidget(widget.id, layoutItem.w, val);
                  }}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Data Settings */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Data Settings</h4>

            {widget.type === 'kpi' && (
              <KPISettings config={widget.config as KPIConfig} onChange={updateConfig} />
            )}

            {['bar-chart', 'line-chart', 'area-chart', 'scatter-plot'].includes(widget.type) && (
              <ChartSettings config={widget.config as ChartConfig} onChange={updateConfig} />
            )}

            {widget.type === 'pie-chart' && (
              <PieSettings config={widget.config as PieChartConfig} onChange={updateConfig} />
            )}

            {widget.type === 'table' && (
              <TableSettings config={widget.config as TableWidgetConfig} onChange={updateConfig} />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function KPISettings({ config, onChange }: { config: KPIConfig; onChange: (u: Record<string, any>) => void }) {
  const isNumeric = NUMERIC_FIELDS.includes(config.metric);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select metric *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.metric}
          onChange={(e) => {
            const metric = e.target.value;
            const isNum = NUMERIC_FIELDS.includes(metric);
            onChange({
              metric,
              aggregation: isNum ? config.aggregation : 'Count',
            });
          }}
        >
          {KPI_METRICS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Aggregation *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.aggregation}
          onChange={(e) => onChange({ aggregation: e.target.value })}
        >
          <option value="Count">Count</option>
          <option value="Sum" disabled={!isNumeric}>Sum</option>
          <option value="Average" disabled={!isNumeric}>Average</option>
        </select>
        {!isNumeric && (
          <p className="text-xs text-muted-foreground">Sum and Average are only available for numeric fields</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Data format *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.dataFormat}
          onChange={(e) => onChange({ dataFormat: e.target.value })}
        >
          <option value="Number">Number</option>
          <option value="Currency">Currency</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Decimal Precision *</Label>
        <Input
          type="number"
          min={0}
          value={config.decimalPrecision}
          onChange={(e) => onChange({ decimalPrecision: Math.max(0, parseInt(e.target.value) || 0) })}
        />
      </div>
    </div>
  );
}

function ChartSettings({ config, onChange }: { config: ChartConfig; onChange: (u: Record<string, any>) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Choose X-Axis data *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.xAxis}
          onChange={(e) => onChange({ xAxis: e.target.value })}
        >
          {CHART_AXIS_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Choose Y-Axis data *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.yAxis}
          onChange={(e) => onChange({ yAxis: e.target.value })}
        >
          {CHART_AXIS_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <Separator />
      <h4 className="text-sm font-semibold">Styling</h4>

      <div className="space-y-2">
        <Label>Chart color</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.chartColor}
            onChange={(e) => onChange({ chartColor: e.target.value })}
            className="size-10 rounded-md border border-input cursor-pointer"
          />
          <Input
            value={config.chartColor}
            onChange={(e) => onChange({ chartColor: e.target.value })}
            placeholder="#54BD95"
            className="flex-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="show-data-label"
          checked={config.showDataLabel}
          onCheckedChange={(checked) => onChange({ showDataLabel: !!checked })}
        />
        <Label htmlFor="show-data-label" className="cursor-pointer">Show data label</Label>
      </div>
    </div>
  );
}

function PieSettings({ config, onChange }: { config: PieChartConfig; onChange: (u: Record<string, any>) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Choose chart data *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.chartData}
          onChange={(e) => onChange({ chartData: e.target.value })}
        >
          {PIE_CHART_DATA_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="show-legend"
          checked={config.showLegend}
          onCheckedChange={(checked) => onChange({ showLegend: !!checked })}
        />
        <Label htmlFor="show-legend" className="cursor-pointer">Show legend</Label>
      </div>
    </div>
  );
}

function TableSettings({ config, onChange }: { config: TableWidgetConfig; onChange: (u: Record<string, any>) => void }) {
  const addFilter = () => {
    const newFilter: FilterRule = {
      id: crypto.randomUUID(),
      field: TABLE_COLUMN_OPTIONS[0],
      operator: 'Contains',
      value: '',
    };
    onChange({ filters: [...(config.filters || []), newFilter] });
  };

  const updateFilter = (id: string, updates: Partial<FilterRule>) => {
    onChange({
      filters: (config.filters || []).map((f) => (f.id === id ? { ...f, ...updates } : f)),
    });
  };

  const removeFilter = (id: string) => {
    onChange({ filters: (config.filters || []).filter((f) => f.id !== id) });
  };

  const toggleColumn = (col: string) => {
    const current = config.columns || [];
    if (current.includes(col)) {
      onChange({ columns: current.filter((c) => c !== col) });
    } else {
      onChange({ columns: [...current, col] });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Choose columns *</Label>
        <div className="border border-input rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
          {TABLE_COLUMN_OPTIONS.map((col) => (
            <div key={col} className="flex items-center gap-2">
              <Checkbox
                id={`col-${col}`}
                checked={(config.columns || []).includes(col)}
                onCheckedChange={() => toggleColumn(col)}
              />
              <Label htmlFor={`col-${col}`} className="text-sm cursor-pointer font-normal">{col}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sort by</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.sortBy || ''}
          onChange={(e) => onChange({ sortBy: e.target.value })}
        >
          <option value="">None</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
          <option value="Order date">Order date</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Pagination</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={config.pagination || 10}
          onChange={(e) => onChange({ pagination: parseInt(e.target.value) })}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="apply-filter"
          checked={config.applyFilter || false}
          onCheckedChange={(checked) => onChange({ applyFilter: !!checked })}
        />
        <Label htmlFor="apply-filter" className="cursor-pointer">Apply filter</Label>
      </div>

      {config.applyFilter && (
        <div className="space-y-3 pl-2 border-l-2 border-primary/20">
          {(config.filters || []).map((filter) => (
            <div key={filter.id} className="space-y-2 relative bg-muted/50 rounded-md p-3">
              <button
                onClick={() => removeFilter(filter.id)}
                className="absolute top-2 right-2 p-0.5 rounded hover:bg-destructive/10"
                aria-label="Remove filter"
              >
                <X className="size-3.5 text-destructive" />
              </button>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={filter.field}
                onChange={(e) => updateFilter(filter.id, { field: e.target.value })}
              >
                {TABLE_COLUMN_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={filter.operator}
                onChange={(e) => updateFilter(filter.id, { operator: e.target.value })}
              >
                {FILTER_OPERATORS.map((op) => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
              <Input
                placeholder="Filter value"
                value={filter.value}
                onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                className="h-9"
              />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addFilter} className="gap-1.5">
            <Plus className="size-3.5" />
            Add filter
          </Button>
        </div>
      )}

      <Separator />
      <h4 className="text-sm font-semibold">Styling</h4>

      <div className="space-y-2">
        <Label>Font size</Label>
        <Input
          type="number"
          min={12}
          max={18}
          value={config.fontSize || 14}
          onChange={(e) => {
            const v = parseInt(e.target.value) || 14;
            onChange({ fontSize: Math.max(12, Math.min(18, v)) });
          }}
        />
        <p className="text-xs text-muted-foreground">Allowed range: 12 – 18</p>
      </div>

      <div className="space-y-2">
        <Label>Header background</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.headerBackground || '#54bd95'}
            onChange={(e) => onChange({ headerBackground: e.target.value })}
            className="size-10 rounded-md border border-input cursor-pointer"
          />
          <Input
            value={config.headerBackground || '#54bd95'}
            onChange={(e) => onChange({ headerBackground: e.target.value })}
            placeholder="#54bd95"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
