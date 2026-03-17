import { useDashboardStore } from '@/stores/dashboardStore';
import { DATE_FILTER_OPTIONS } from '@/constants/config';
import { Calendar } from 'lucide-react';

export default function DateFilter() {
  const { dateFilter, setDateFilter } = useDashboardStore();

  return (
    <div className="flex items-center gap-2">
      <Calendar className="size-4 text-muted-foreground shrink-0" />
      <label htmlFor="date-filter" className="text-sm text-muted-foreground whitespace-nowrap">
        Show data for
      </label>
      <select
        id="date-filter"
        className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      >
        {DATE_FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
