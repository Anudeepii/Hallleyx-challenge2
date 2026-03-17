import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  Grip,
  Table2,
  Activity,
} from 'lucide-react';
import { WIDGET_CATEGORIES } from '@/constants/config';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  'bar-chart': BarChart3,
  'line-chart': LineChart,
  'pie-chart': PieChart,
  'area-chart': AreaChart,
  'scatter-plot': Grip,
  table: Table2,
  kpi: Activity,
};

export default function WidgetPalette() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Charts: true,
    Tables: true,
    KPIs: true,
  });

  const toggle = (cat: string) =>
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('widgetType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-56 xl:w-64 border-r border-border bg-card overflow-y-auto shrink-0">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Widgets
        </h3>
      </div>
      <div className="p-3 space-y-1">
        {WIDGET_CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <button
              onClick={() => toggle(cat.label)}
              className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              {expanded[cat.label] ? (
                <ChevronDown className="size-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-4 text-muted-foreground" />
              )}
              {cat.label}
            </button>
            {expanded[cat.label] && (
              <div className="ml-4 space-y-0.5 mt-0.5 mb-2">
                {cat.widgets.map((widget) => {
                  const Icon = iconMap[widget.type] || Activity;
                  return (
                    <div
                      key={widget.type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, widget.type)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm cursor-grab active:cursor-grabbing hover:bg-accent transition-colors select-none"
                    >
                      <Icon className="size-4 text-primary shrink-0" />
                      <span className="text-foreground/80">{widget.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
