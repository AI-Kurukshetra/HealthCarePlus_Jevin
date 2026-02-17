import { Video, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function CTASection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#007EFC] to-[#0066CC]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-[32px] p-12 md:p-16 border border-white/20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Video className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Health Journey?
            </h2>
            
            <p className="text-lg text-white/90 mb-10">
              Join thousands of happy patients who trust us for their healthcare needs. 
              Get started in just 2 minutes.
            </p>
            
            <button
              onClick={handleGetStarted}
              className="group bg-white text-[#007EFC] px-10 py-5 rounded-2xl font-bold hover:bg-[#F8FAFC] transition-all hover:shadow-2xl inline-flex items-center gap-3 text-lg"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <p className="text-sm text-white/70 mt-6">
              ✓ No credit card required  •  ✓ Free consultation available  •  ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
