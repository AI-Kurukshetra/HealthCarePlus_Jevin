import { Video, FlaskConical, Pill, Ambulance, Home, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const categories = [
  {
    id: 1,
    name: 'Video Consultation',
    description: 'Connect instantly with doctors',
    icon: Video,
    color: '#007EFC',
    bgGradient: 'from-[#007EFC] to-[#0066CC]',
  },
  {
    id: 2,
    name: 'Lab Tests',
    description: 'Book tests at home',
    icon: FlaskConical,
    color: '#10B981',
    bgGradient: 'from-[#10B981] to-[#059669]',
  },
  {
    id: 3,
    name: 'Pharmacy',
    description: 'Order medicines online',
    icon: Pill,
    color: '#F59E0B',
    bgGradient: 'from-[#F59E0B] to-[#D97706]',
  },
  {
    id: 4,
    name: 'Emergency Care',
    description: '24/7 emergency services',
    icon: Ambulance,
    color: '#EF4444',
    bgGradient: 'from-[#EF4444] to-[#DC2626]',
  },
  {
    id: 5,
    name: 'Home Care',
    description: 'Nursing & physiotherapy',
    icon: Home,
    color: '#8B5CF6',
    bgGradient: 'from-[#8B5CF6] to-[#7C3AED]',
  },
  {
    id: 6,
    name: 'Hospital Visit',
    description: 'Book in-person appointments',
    icon: Building2,
    color: '#06B6D4',
    bgGradient: 'from-[#06B6D4] to-[#0891B2]',
  },
];

export function HealthcareCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
    navigate('/register');
  };

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#030213] mb-4">
            Healthcare Services
          </h2>
          <p className="text-lg text-[#64748B]">
            Comprehensive care for all your health needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative bg-white rounded-[24px] p-8 text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-[rgba(0,0,0,0.06)] overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className="relative">
                  <div
                    className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.bgGradient} group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#030213] mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#64748B] mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-[#007EFC] font-medium group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
