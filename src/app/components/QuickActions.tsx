import { Video, FlaskConical, Pill } from 'lucide-react';
import { useNavigate } from 'react-router';

export function QuickActions() {
  const navigate = useNavigate();

  const handleStartConsultation = () => {
    console.log('Starting video consultation...');
    // In real app, this would navigate to video consultation page
    alert('Starting video consultation! This would connect you to an available doctor.');
  };

  const handleBookLabTest = () => {
    console.log('Navigating to lab tests...');
    navigate('/labs');
  };

  const handleRefillMeds = () => {
    console.log('Navigating to pharmacy...');
    navigate('/pharmacy');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#030213] mb-2">
          Welcome back, Sarah
        </h1>
        <p className="text-[#64748B]">How can we help you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Talk to Doctor Now - With Pulse Animation */}
        <button 
          onClick={handleStartConsultation}
          className="group relative bg-white rounded-[24px] p-8 text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-[rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#007EFC] to-[#0066CC] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-7 h-7 text-white" />
            </div>
            
            {/* Pulse Indicator */}
            <div className="relative">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-[#10B981] rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-[#030213]">Talk to Doctor Now</h3>
          <p className="text-sm text-[#64748B]">Connect with a doctor in under 60 seconds</p>
          
          <div className="mt-6 flex items-center text-[#007EFC] font-medium">
            <span>Start Consultation</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>

        {/* Book Lab Test */}
        <button 
          onClick={handleBookLabTest}
          className="group relative bg-white rounded-[24px] p-8 text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-[rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#007EFC] group-hover:to-[#0066CC] transition-all">
              <FlaskConical className="w-7 h-7 text-[#007EFC] group-hover:text-white transition-colors" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-[#030213]">Book Lab Test</h3>
          <p className="text-sm text-[#64748B]">Schedule tests at home or nearest lab</p>
          
          <div className="mt-6 flex items-center text-[#007EFC] font-medium">
            <span>Browse Tests</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>

        {/* Refill Meds */}
        <button 
          onClick={handleRefillMeds}
          className="group relative bg-white rounded-[24px] p-8 text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-[rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#007EFC] group-hover:to-[#0066CC] transition-all">
              <Pill className="w-7 h-7 text-[#007EFC] group-hover:text-white transition-colors" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-[#030213]">Refill Meds</h3>
          <p className="text-sm text-[#64748B]">Reorder your prescriptions with ease</p>
          
          <div className="mt-6 flex items-center text-[#007EFC] font-medium">
            <span>View Prescriptions</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}