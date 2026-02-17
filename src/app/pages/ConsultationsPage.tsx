import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Video, Clock, Star, Shield, CheckCircle, Calendar, ArrowRight, Search, Filter, Sparkles, MessageSquare, Lock, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { AIChatModal } from '../components/AIChatModal';
import { doctors } from '../data/doctors';

const specialties = [
  'All Specialties',
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Gynecologist',
  'Psychiatrist',
  'Orthopedic',
  'ENT Specialist',
];

const faqs = [
  {
    question: 'How do online consultations work?',
    answer: 'Simply select a doctor, book a time slot, and connect via video call at the scheduled time. You can discuss your symptoms and get prescriptions digitally.',
  },
  {
    question: 'Are the doctors verified and licensed?',
    answer: 'Yes, all doctors on our platform are verified, licensed medical professionals with valid registrations. We thoroughly verify their credentials before onboarding.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer: 'You can cancel or reschedule your appointment up to 2 hours before the scheduled time for a full refund. After that, cancellation charges may apply.',
  },
  {
    question: 'Can I get prescriptions from online consultations?',
    answer: 'Yes, doctors can provide digital prescriptions which you can use to order medicines from our pharmacy or any local pharmacy.',
  },
  {
    question: 'Is my health data secure?',
    answer: 'Absolutely. We use end-to-end encryption and comply with healthcare data protection standards. Your data is never shared with third parties without your consent.',
  },
];

export function ConsultationsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleBookConsultation = (doctorId: number) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Compact like Practo */}
      <section className="relative bg-gradient-to-r from-[#007EFC] via-[#0066DD] to-[#0052BB] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Health Assistant</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Consult Top Doctors Online
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Connect with certified doctors in minutes. Get expert medical advice from the comfort of your home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowAIChat(true)}
                  className="group bg-white text-[#007EFC] px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Talk to AI Assistant
                </button>
                {!isAuthenticated && (
                  <button
                    onClick={() => navigate('/register')}
                    className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"
                  >
                    Book Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-white/80 text-sm">Expert Doctors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-white/80 text-sm">Consultations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">4.9★</div>
                  <div className="text-white/80 text-sm">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Side - Features Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: Video, title: 'Video Consult', desc: 'Face-to-face consultation' },
                { icon: MessageSquare, title: 'Chat Support', desc: 'Text-based consultation' },
                { icon: Clock, title: 'Quick Response', desc: 'Within 15 minutes' },
                { icon: Shield, title: '100% Private', desc: 'Encrypted & secure' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <item.icon className="w-10 h-10 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="py-6 bg-gradient-to-r from-[#F0F9FF] to-[#E0F2FE] border-y border-[#007EFC]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007EFC] to-[#0066DD] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#030213]">Not sure which doctor to consult?</h3>
                <p className="text-sm text-[#64748B]">Our AI assistant can help you find the right specialist</p>
              </div>
            </div>
            <button
              onClick={() => setShowAIChat(true)}
              className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
            >
              Get AI Recommendation
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-[#F8FAFC] border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors"
              />
            </div>
            <button className="px-6 py-4 bg-white border border-[#E2E8F0] rounded-xl font-medium hover:bg-[#F8FAFC] transition-colors inline-flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Specialties Filter */}
      <section className="py-6 bg-white sticky top-16 z-30 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {specialties.map((specialty, index) => (
              <button
                key={index}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  index === 0
                    ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#030213] mb-1">Available Doctors</h2>
              <p className="text-[#64748B]">{doctors.length} verified doctors ready to consult</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-[#007EFC]/5 transition-all group"
              >
                <div className="flex gap-5 mb-5">
                  {/* Doctor Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-lg px-2 py-0.5 shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#FFA500] text-[#FFA500]" />
                      <span className="text-xs font-semibold">{doctor.rating}</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[#030213] mb-1">{doctor.name}</h3>
                    <p className="text-[#007EFC] font-medium mb-1">{doctor.specialty}</p>
                    <p className="text-sm text-[#64748B] mb-2">{doctor.qualification}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-[#64748B]">
                      <span>{doctor.experience} exp.</span>
                      <span>•</span>
                      <span>{doctor.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="text-right">
                    <div className="text-sm text-[#64748B] mb-1">Consultation</div>
                    <div className="text-xl font-bold text-[#030213]">₹{doctor.consultationFee}</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#F8FAFC] text-xs font-medium text-[#64748B] rounded-lg"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Availability & Action */}
                <div className="flex items-center gap-4 pt-4 border-t border-[rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 text-sm flex-1">
                    <Calendar className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981] font-medium">{doctor.nextAvailable}</span>
                  </div>
                  <button
                    onClick={() => handleBookConsultation(doctor.id)}
                    className="px-6 py-2.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors group-hover:shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#030213] mb-4">How It Works</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Get expert medical consultation in just 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#007EFC] via-[#007EFC] to-[#007EFC] opacity-20" style={{ width: 'calc(100% - 200px)', left: '100px' }}></div>
            
            {[
              { 
                step: '1', 
                title: 'Choose Your Doctor', 
                description: 'Browse verified doctors by specialty and select the one that fits your needs',
                icon: Search,
              },
              { 
                step: '2', 
                title: 'Book Appointment', 
                description: 'Pick a convenient time slot and complete your booking in seconds',
                icon: Calendar,
              },
              { 
                step: '3', 
                title: 'Video Consultation', 
                description: 'Connect with your doctor via secure video call at scheduled time',
                icon: Video,
              },
              { 
                step: '4', 
                title: 'Get Prescription', 
                description: 'Receive digital prescription and medical advice instantly',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-2xl p-8 border border-[#007EFC]/10 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#007EFC] to-[#0066DD] text-white rounded-xl flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <item.icon className="w-6 h-6 text-[#007EFC]" />
                  </div>
                  <h3 className="font-semibold text-[#030213] mb-2 text-center">{item.title}</h3>
                  <p className="text-sm text-[#64748B] text-center leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-12 bg-gradient-to-r from-[#F8FAFC] to-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[rgba(0,0,0,0.06)] shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#10B981]/10 px-4 py-2 rounded-full mb-4">
                  <Lock className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">Your Privacy Matters</span>
                </div>
                <h2 className="text-3xl font-bold text-[#030213] mb-4">
                  Your Health Data is 100% Secure
                </h2>
                <p className="text-[#64748B] mb-6 leading-relaxed">
                  We use end-to-end encryption to protect your medical records and personal information. Your data is never shared with anyone without your explicit consent. We comply with all healthcare data protection standards.
                </p>
                <div className="space-y-3">
                  {[
                    'End-to-end encrypted consultations',
                    'HIPAA compliant data storage',
                    'No third-party data sharing',
                    'Secure payment processing',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                      <span className="text-[#030213]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
                  alt="Security"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#030213] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#64748B]">Everything you need to know about online consultations</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] hover:shadow-lg transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-[#030213] pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-[#64748B] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-br from-[#007EFC] to-[#0066DD] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Consult a Doctor?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of patients who trust us for their healthcare needs
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-[#007EFC] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      )}

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        initialMode="doctor"
      />

      <Footer />
    </div>
  );
}