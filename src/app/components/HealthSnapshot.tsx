import { Activity, Heart, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const vitalData = [
  { day: 'Mon', bpm: 72 },
  { day: 'Tue', bpm: 75 },
  { day: 'Wed', bpm: 68 },
  { day: 'Thu', bpm: 73 },
  { day: 'Fri', bpm: 70 },
  { day: 'Sat', bpm: 69 },
  { day: 'Sun', bpm: 71 },
];

const healthMetrics = [
  {
    label: 'Heart Rate',
    value: '71',
    unit: 'BPM',
    status: 'normal',
    icon: Heart,
    color: '#007EFC',
  },
  {
    label: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    icon: Activity,
    color: '#10B981',
  },
  {
    label: 'Steps Today',
    value: '8,432',
    unit: 'steps',
    status: 'good',
    icon: TrendingUp,
    color: '#F59E0B',
  },
];

export function HealthSnapshot() {
  const handleViewFullReport = () => {
    console.log('Opening full health report...');
    alert('This would open your complete health report with detailed vitals history, trends, and recommendations.');
  };

  const handleMetricClick = (metricLabel: string) => {
    console.log(`Viewing details for: ${metricLabel}`);
    alert(`Opening detailed view for ${metricLabel}. This would show historical data and trends.`);
  };

  return (
    <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)] h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#030213] mb-1">Health Snapshot</h2>
        <p className="text-sm text-[#64748B]">Your vitals at a glance</p>
      </div>

      {/* Heart Rate Chart */}
      <div className="bg-gradient-to-br from-[#007EFC]/5 to-[#0066CC]/5 rounded-[20px] p-5 mb-6 border border-[#007EFC]/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-[#64748B] mb-1">Average Heart Rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#030213]">71</span>
              <span className="text-sm text-[#64748B]">BPM</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-[#007EFC] rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Mini Line Chart */}
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={96}>
            <LineChart data={vitalData}>
              <YAxis hide domain={[60, 80]} />
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="#007EFC"
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#007EFC]/10">
          <span className="text-xs text-[#64748B]">Last 7 days</span>
          <div className="flex items-center gap-1 text-xs font-medium text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
            Normal
          </div>
        </div>
      </div>

      {/* Other Health Metrics */}
      <div className="space-y-3">
        {healthMetrics.slice(1).map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              onClick={() => handleMetricClick(metric.label)}
              className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-[16px] hover:bg-[#EFF6FF] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#030213]">{metric.label}</p>
                  <p className="text-xs text-[#64748B]">{metric.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#030213]">{metric.value}</p>
                <p className="text-xs text-[#64748B]">{metric.unit}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Full Report Button */}
      <button 
        onClick={handleViewFullReport}
        className="w-full mt-6 py-3 bg-[#F8FAFC] hover:bg-[#007EFC] text-[#030213] hover:text-white rounded-xl font-medium transition-all hover:shadow-lg">
        View Full Health Report
      </button>
    </div>
  );
}