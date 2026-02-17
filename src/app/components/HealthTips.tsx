import { Lightbulb, Droplets, Moon, Apple } from 'lucide-react';

const tips = [
  {
    id: 1,
    icon: Droplets,
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily',
    color: '#007EFC',
  },
  {
    id: 2,
    icon: Moon,
    title: 'Quality Sleep',
    description: 'Get 7-8 hours of sleep each night',
    color: '#8B5CF6',
  },
  {
    id: 3,
    icon: Apple,
    title: 'Balanced Diet',
    description: 'Include fruits and vegetables in every meal',
    color: '#10B981',
  },
];

export function HealthTips() {
  return (
    <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)] h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#030213]">Health Tips</h2>
          <p className="text-sm text-[#64748B]">Daily wellness advice</p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div
              key={tip.id}
              className="group bg-[#F8FAFC] rounded-[20px] p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${tip.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: tip.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#030213] mb-1">{tip.title}</h3>
                  <p className="text-sm text-[#64748B]">{tip.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Quote */}
      <div className="mt-6 bg-gradient-to-br from-[#007EFC]/5 to-[#0066CC]/5 rounded-[20px] p-5 border border-[#007EFC]/10">
        <div className="flex items-start gap-3">
          <div className="text-[#007EFC] text-3xl font-serif leading-none">&ldquo;</div>
          <div>
            <p className="text-sm text-[#030213] italic mb-2">
              Health is not just about what you're eating. It's also about what you're thinking and saying.
            </p>
            <p className="text-xs text-[#64748B] font-medium">— Unknown</p>
          </div>
        </div>
      </div>

      {/* View All Tips Button */}
      <button className="w-full mt-4 py-3 bg-[#F8FAFC] hover:bg-[#007EFC] text-[#030213] hover:text-white rounded-xl font-medium transition-all">
        View All Tips
      </button>
    </div>
  );
}
