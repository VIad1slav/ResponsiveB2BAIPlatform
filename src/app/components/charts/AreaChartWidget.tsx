import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from '../../context/theme-context';

interface AreaChartWidgetProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  xAxisKey: string;
  gradientId: string;
  tooltipFormatter?: (value: number, name: string) => [string, string];
  yAxisFormatter?: (value: number) => string;
  height?: string | number;
}

/**
 * Reusable Area Chart component with consistent styling
 * Uses green gradient (#10B981 / #00875A) across all dashboards
 */
export const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({
  data,
  dataKey,
  xAxisKey,
  gradientId,
  tooltipFormatter,
  yAxisFormatter,
  height = 256,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Generate a truly unique ID for this chart instance using React.useId()
  const uniqueId = React.useId();
  const uniqueGradientId = `${gradientId}-${uniqueId}`;

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={uniqueGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? '#10B981' : '#00875A'} stopOpacity={0.8} />
              <stop offset="95%" stopColor={isDark ? '#10B981' : '#00875A'} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            key={`grid-${uniqueId}`}
            strokeDasharray="3 3"
            stroke={isDark ? '#334155' : '#e5e7eb'}
            vertical={false}
          />
          <XAxis
            key={`xaxis-${uniqueId}`}
            dataKey={xAxisKey}
            stroke={isDark ? '#94A3B8' : '#6b7280'}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            key={`yaxis-${uniqueId}`}
            stroke={isDark ? '#94A3B8' : '#6b7280'}
            tick={{ fontSize: 12 }}
            tickFormatter={yAxisFormatter}
          />
          <Tooltip
            key={`tooltip-${uniqueId}`}
            contentStyle={{
              backgroundColor: isDark ? '#1E293B' : '#fff',
              border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: isDark ? '#F9FAFB' : '#1F2937',
            }}
            formatter={tooltipFormatter}
          />
          <Area
            key={`area-${uniqueId}`}
            type="monotone"
            dataKey={dataKey}
            stroke={isDark ? '#10B981' : '#00875A'}
            strokeWidth={2}
            fill={`url(#${uniqueGradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};