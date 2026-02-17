import { FlaskConical, Home, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';

const popularTests = [
  {
    id: 1,
    name: 'Complete Blood Count',
    description: 'CBC with 28 parameters',
    price: 299,
    originalPrice: 599,
    discount: 50,
    reportTime: '6 hours',
  },
  {
    id: 2,
    name: 'Thyroid Profile',
    description: 'T3, T4, TSH tests',
    price: 449,
    originalPrice: 799,
    discount: 44,
    reportTime: '8 hours',
  },
  {
    id: 3,
    name: 'Diabetes Screening',
    description: 'HbA1c, Fasting Sugar',
    price: 349,
    originalPrice: 699,
    discount: 50,
    reportTime: '12 hours',
  },
  {
    id: 4,
    name: 'Lipid Profile',
    description: 'Cholesterol, HDL, LDL',
    price: 399,
    originalPrice: 749,
    discount: 47,
    reportTime: '6 hours',
  },
];

const features = [
  { icon: Home, text: 'Home Sample Collection' },
  { icon: Clock, text: 'Fast Reports' },
  { icon: Shield, text: 'NABL Certified' },
];

export function LabTests() {
  const navigate = useNavigate();

  const handleTestClick = (testName: string) => {
    console.log(`Selected test: ${testName}`);
    navigate('/register');
  };

  const handleViewAllTests = () => {
    navigate('/register');
  };

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-4">
            <FlaskConical className="w-5 h-5 text-[#007EFC]" />
            <span className="text-sm font-medium text-[#007EFC]">Lab Tests at Home</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#030213] mb-4">
            Book Lab Tests from Home
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Get accurate results with certified labs. Sample collection at your doorstep.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-2 bg-white rounded-2xl px-5 py-3 shadow-sm">
                <Icon className="w-5 h-5 text-[#007EFC]" />
                <span className="font-medium text-[#030213]">{feature.text}</span>
              </div>
            );
          })}
        </div>
        
        {/* Popular Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTests.map((test) => (
            <button
              key={test.id}
              onClick={() => handleTestClick(test.name)}
              className="group bg-white rounded-[24px] p-6 text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-[rgba(0,0,0,0.06)]"
            >
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#10B981] transition-colors">
                <FlaskConical className="w-6 h-6 text-[#10B981] group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="font-semibold text-[#030213] mb-2">{test.name}</h3>
              <p className="text-sm text-[#64748B] mb-4">{test.description}</p>
              
              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-[#030213]">₹{test.price}</span>
                <span className="text-sm text-[#64748B] line-through">₹{test.originalPrice}</span>
                <span className="text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-lg">
                  {test.discount}% OFF
                </span>
              </div>
              
              {/* Report Time */}
              <div className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
                <Clock className="w-4 h-4 text-[#007EFC]" />
                <span>Report in {test.reportTime}</span>
              </div>
              
              {/* Book Button */}
              <span className="block w-full bg-[#007EFC] text-white py-2.5 rounded-xl font-medium group-hover:bg-[#0066CC] transition-colors group-hover:shadow-lg text-center">
                Book Now
              </span>
            </button>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <button
            onClick={handleViewAllTests}
            className="px-8 py-4 bg-white text-[#030213] rounded-2xl font-semibold hover:bg-[#007EFC] hover:text-white transition-all border-2 border-[rgba(0,0,0,0.06)] hover:border-[#007EFC] inline-flex items-center gap-2"
          >
            View All Lab Tests
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}