import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { FlaskConical, Home, Clock, Shield, CheckCircle, Truck, ArrowRight, Star, Search, Filter, Sparkles, Lock, ChevronDown, Award, Users, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { AIChatModal } from '../components/AIChatModal';

const popularTests = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    description: 'CBC with 28 parameters',
    parameters: '28 tests included',
    price: 299,
    originalPrice: 599,
    discount: 50,
    reportTime: '6 hours',
    fasting: 'Not Required',
    rating: 4.8,
    bookings: '15K+ bookings',
  },
  {
    id: 2,
    name: 'Thyroid Profile Total',
    description: 'T3, T4, TSH tests',
    parameters: '3 tests included',
    price: 449,
    originalPrice: 799,
    discount: 44,
    reportTime: '8 hours',
    fasting: 'Not Required',
    rating: 4.9,
    bookings: '12K+ bookings',
  },
  {
    id: 3,
    name: 'Diabetes Screening (HbA1c)',
    description: 'HbA1c, Fasting Sugar',
    parameters: '2 tests included',
    price: 349,
    originalPrice: 699,
    discount: 50,
    reportTime: '12 hours',
    fasting: 'Required',
    rating: 4.7,
    bookings: '18K+ bookings',
  },
  {
    id: 4,
    name: 'Lipid Profile Complete',
    description: 'Cholesterol, HDL, LDL, Triglycerides',
    parameters: '8 tests included',
    price: 399,
    originalPrice: 749,
    discount: 47,
    reportTime: '6 hours',
    fasting: 'Required (12 hours)',
    rating: 4.8,
    bookings: '20K+ bookings',
  },
  {
    id: 5,
    name: 'Liver Function Test (LFT)',
    description: 'Complete liver health assessment',
    parameters: '11 tests included',
    price: 449,
    originalPrice: 899,
    discount: 50,
    reportTime: '8 hours',
    fasting: 'Preferred',
    rating: 4.7,
    bookings: '10K+ bookings',
  },
  {
    id: 6,
    name: 'Kidney Function Test (KFT)',
    description: 'Complete kidney health check',
    parameters: '9 tests included',
    price: 399,
    originalPrice: 799,
    discount: 50,
    reportTime: '8 hours',
    fasting: 'Not Required',
    rating: 4.9,
    bookings: '11K+ bookings',
  },
];

const categories = [
  'All Tests',
  'Popular Tests',
  'Full Body Checkup',
  'Diabetes',
  'Thyroid',
  'Liver',
  'Kidney',
  'Vitamin Tests',
  'Women Health',
  'Heart Health',
];

const faqs = [
  {
    question: 'How does home sample collection work?',
    answer: 'After booking your test, you can schedule a convenient time slot. Our trained phlebotomist will visit your home with proper safety equipment and collect the sample. The process is quick, safe, and completely hassle-free.',
  },
  {
    question: 'How long does it take to get reports?',
    answer: 'Most test reports are available within 6-24 hours. Some specialized tests may take 24-48 hours. You will receive your reports via email and they will also be available in your account dashboard.',
  },
  {
    question: 'Are your labs certified?',
    answer: 'Yes, all our partner labs are NABL certified and follow the highest quality standards. We ensure accurate and reliable test results that you can trust.',
  },
  {
    question: 'Do I need to fast before all tests?',
    answer: 'Not all tests require fasting. Each test listing clearly mentions whether fasting is required. For tests that require fasting, you typically need to fast for 8-12 hours before sample collection.',
  },
  {
    question: 'Can I cancel or reschedule my test?',
    answer: 'Yes, you can cancel or reschedule your home visit up to 4 hours before the scheduled time without any charges. Simply go to your bookings and make the changes.',
  },
];

export function LabsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleBookTest = (testName: string) => {
    if (!isAuthenticated) {
      navigate('/register');
    } else {
      console.log(`Booking test: ${testName}`);
      alert(`Booking ${testName}. This would show date/time selection for home sample collection.`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Different size/design from Consultations */}
      <section className="relative bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
              <Award className="w-5 h-5" />
              <span className="font-medium">NABL Certified • ISO Compliant</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Lab Tests at Your Doorstep
            </h1>
            <p className="text-2xl text-white/90 mb-10 leading-relaxed">
              Book lab tests online with free home sample collection.<br />Fast reports. Accurate results. Best prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setShowAIChat(true)}
                className="group bg-white text-[#10B981] px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Find Right Test with AI
              </button>
              {!isAuthenticated && (
                <button
                  onClick={() => navigate('/register')}
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"
                >
                  View All Tests
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Users, value: '1M+', label: 'Tests Completed' },
                { icon: FlaskConical, value: '200+', label: 'Test Options' },
                { icon: Award, value: '100%', label: 'Accuracy' },
                { icon: Star, value: '4.9★', label: 'User Rating' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <stat.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="py-6 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border-y border-[#10B981]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#030213]">Not sure which test you need?</h3>
                <p className="text-sm text-[#64748B]">Let our AI assistant recommend the right tests based on your symptoms</p>
              </div>
            </div>
            <button
              onClick={() => setShowAIChat(true)}
              className="px-6 py-3 bg-[#10B981] text-white rounded-xl font-medium hover:bg-[#059669] transition-colors"
            >
              Get Test Recommendation
            </button>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Home, title: 'Free Home Visit', desc: 'Trained phlebotomist at doorstep', color: 'from-blue-500 to-blue-600' },
              { icon: Clock, title: 'Quick Reports', desc: 'Results in 6-24 hours', color: 'from-purple-500 to-purple-600' },
              { icon: Shield, title: 'NABL Certified', desc: '100% accurate results', color: 'from-green-500 to-green-600' },
              { icon: Truck, title: 'Safe Collection', desc: 'Contactless & hygienic', color: 'from-orange-500 to-orange-600' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center group hover:shadow-xl transition-all border border-[rgba(0,0,0,0.06)]">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#030213] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#64748B]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search for tests, packages, or health concerns..."
                className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#10B981] transition-colors"
              />
            </div>
            <button className="px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-medium hover:bg-white transition-colors inline-flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-white sticky top-16 z-30 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  index === 0
                    ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/25'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Lab Tests */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#030213] mb-2">Popular Lab Tests</h2>
            <p className="text-lg text-[#64748B]">Most booked tests with special discounts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-[#10B981]/5 transition-all group"
              >
                {/* Test Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FlaskConical className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 bg-[#FEF3C7] px-3 py-1.5 rounded-lg">
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-sm font-bold text-[#92400E]">{test.rating}</span>
                    </div>
                    {test.discount > 0 && (
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-[#EF4444] to-[#DC2626] px-3 py-1 rounded-lg shadow-lg">
                        {test.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Test Info */}
                <h3 className="font-bold text-lg text-[#030213] mb-2 leading-tight">{test.name}</h3>
                <p className="text-sm text-[#64748B] mb-4">{test.description}</p>
                
                <div className="bg-[#F8FAFC] rounded-xl p-4 mb-5 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Parameters:</span>
                    <span className="font-semibold text-[#030213]">{test.parameters}</span>
                  </div>
                  <div className="w-full h-px bg-[#E2E8F0]"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Report Time:</span>
                    <span className="font-semibold text-[#10B981]">{test.reportTime}</span>
                  </div>
                  <div className="w-full h-px bg-[#E2E8F0]"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Fasting:</span>
                    <span className={`font-semibold ${test.fasting === 'Required' || test.fasting.includes('Required') ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
                      {test.fasting}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-end gap-3 mb-2">
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">Starting from</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#030213]">₹{test.price}</span>
                      <span className="text-lg text-[#64748B] line-through">₹{test.originalPrice}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {test.bookings}
                </p>

                {/* Book Button */}
                <button
                  onClick={() => handleBookTest(test.name)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#10B981]/30 transition-all"
                >
                  {isAuthenticated ? 'Book Now' : 'Sign in to Book'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#030213] mb-4">How It Works</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Getting your lab tests done is simple and convenient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#10B981] via-[#10B981] to-[#10B981] opacity-20" style={{ width: 'calc(100% - 200px)', left: '100px' }}></div>
            
            {[
              { 
                step: '1', 
                title: 'Select Your Test', 
                description: 'Browse our wide range of tests and health packages',
                icon: Search,
                color: 'from-blue-500 to-blue-600'
              },
              { 
                step: '2', 
                title: 'Book Time Slot', 
                description: 'Choose a convenient date and time for home collection',
                icon: Calendar,
                color: 'from-purple-500 to-purple-600'
              },
              { 
                step: '3', 
                title: 'Sample Collection', 
                description: 'Our expert visits your home for safe sample collection',
                icon: Home,
                color: 'from-green-500 to-green-600'
              },
              { 
                step: '4', 
                title: 'Get Your Report', 
                description: 'Receive digital report via email within hours',
                icon: CheckCircle,
                color: 'from-orange-500 to-orange-600'
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-2xl p-8 border-2 border-[#10B981]/10 relative z-10 hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-xl`}>
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <item.icon className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <h3 className="font-bold text-[#030213] mb-2 text-center">{item.title}</h3>
                  <p className="text-sm text-[#64748B] text-center leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-[#ECFDF5] rounded-3xl p-8 md:p-12 border-2 border-[#10B981]/10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
                  alt="Lab Quality"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 bg-[#10B981]/10 px-4 py-2 rounded-full mb-4">
                  <Shield className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">NABL Certified Labs</span>
                </div>
                <h2 className="text-3xl font-bold text-[#030213] mb-4">
                  Accuracy You Can Trust
                </h2>
                <p className="text-[#64748B] mb-6 leading-relaxed">
                  All our partner labs are NABL and ISO certified, ensuring the highest standards of quality and accuracy. Your health data is protected with military-grade encryption.
                </p>
                <div className="space-y-3">
                  {[
                    'NABL & ISO certified laboratories',
                    'State-of-the-art testing equipment',
                    'Quality control on every sample',
                    'Secure data storage & privacy',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#030213] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
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
            <p className="text-lg text-[#64748B]">Everything you need to know about lab tests</p>
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
        <section className="py-20 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Book Your Lab Test Today
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Get accurate results with free home collection and best prices
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-[#10B981] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
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
        initialMode="test"
      />

      <Footer />
    </div>
  );
}