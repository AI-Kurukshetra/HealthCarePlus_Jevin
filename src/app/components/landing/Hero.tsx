import { Video, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();

  const handleStartConsultation = () => {
    navigate('/register');
  };

  const handleBookAppointment = () => {
    navigate('/register');
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF6FF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-[#007EFC]/10 text-[#007EFC] px-4 py-2 rounded-full text-sm font-medium mb-6">
              🏥 Your Health, Our Priority
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#030213] mb-6 leading-tight">
              Healthcare Made
              <span className="text-[#007EFC]"> Simple & Accessible</span>
            </h1>
            
            <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
              Connect with top doctors instantly, book lab tests at home, and manage your health all in one place. Quality healthcare is just a click away.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartConsultation}
                className="group bg-[#007EFC] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#0066CC] transition-all hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Video className="w-5 h-5" />
                Start Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleBookAppointment}
                className="group bg-white text-[#030213] px-8 py-4 rounded-2xl font-semibold hover:bg-[#F8FAFC] transition-all border-2 border-[rgba(0,0,0,0.06)] hover:border-[#007EFC] flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5 text-[#007EFC]" />
                Book Appointment
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-[rgba(0,0,0,0.06)]">
              <div>
                <p className="text-2xl font-bold text-[#030213]">500+</p>
                <p className="text-sm text-[#64748B]">Expert Doctors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#030213]">50K+</p>
                <p className="text-sm text-[#64748B]">Happy Patients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#030213]">4.9★</p>
                <p className="text-sm text-[#64748B]">Average Rating</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#007EFC] to-[#0066CC] rounded-[32px] p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
                alt="Doctor consultation"
                className="rounded-3xl w-full h-auto object-cover"
              />
              
              {/* Floating Card 1 */}
              <div className="absolute -left-6 top-1/4 bg-white rounded-2xl p-4 shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Appointment</p>
                    <p className="font-semibold text-sm">Confirmed</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Card 2 */}
              <div className="absolute -right-6 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007EFC]/10 rounded-xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#007EFC]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Available Now</p>
                    <p className="font-semibold text-sm">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
