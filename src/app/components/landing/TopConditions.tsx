import { Thermometer, Heart, Brain, Activity, Stethoscope, Wind, Eye, Bone } from 'lucide-react';
import { useNavigate } from 'react-router';

const conditions = [
  { id: 1, name: 'Cold & Flu', icon: Thermometer, color: '#007EFC', consultations: '2.5K+' },
  { id: 2, name: 'Heart Care', icon: Heart, color: '#EF4444', consultations: '1.8K+' },
  { id: 3, name: 'Mental Health', icon: Brain, color: '#8B5CF6', consultations: '3.2K+' },
  { id: 4, name: 'Diabetes', icon: Activity, color: '#F59E0B', consultations: '2.1K+' },
  { id: 5, name: 'General Check', icon: Stethoscope, color: '#10B981', consultations: '4.5K+' },
  { id: 6, name: 'Respiratory', icon: Wind, color: '#06B6D4', consultations: '1.6K+' },
  { id: 7, name: 'Eye Care', icon: Eye, color: '#EC4899', consultations: '1.2K+' },
  { id: 8, name: 'Bone & Joint', icon: Bone, color: '#F97316', consultations: '1.9K+' },
];

export function TopConditions() {
  const navigate = useNavigate();

  const handleConditionClick = (conditionName: string) => {
    console.log(`Selected condition: ${conditionName}`);
    navigate('/register');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030213] mb-4">
            Most Consulted Conditions
          </h2>
          <p className="text-lg text-[#64748B]">
            Quick access to specialists for your health concerns
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {conditions.map((condition) => {
            const Icon = condition.icon;
            return (
              <button
                key={condition.id}
                onClick={() => handleConditionClick(condition.name)}
                className="group bg-[#F8FAFC] hover:bg-white rounded-[24px] p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-[rgba(0,0,0,0.06)]"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${condition.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: condition.color }} />
                </div>
                <h3 className="font-semibold text-[#030213] mb-2">{condition.name}</h3>
                <p className="text-xs text-[#64748B]">{condition.consultations} consultations</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
