import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { FlaskConical, Home, Clock, Shield, CheckCircle, Truck, ArrowRight, Star, Search, Filter, Sparkles, Lock, ChevronDown, Award, Users, Calendar, X, MapPin, CreditCard, ArrowLeft, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { AIChatModal } from '../components/AIChatModal';

interface LabTest {
  id: number;
  name: string;
  description: string;
  parameters: string;
  price: number;
  originalPrice: number;
  discount: number;
  reportTime: string;
  fasting: string;
  rating: number;
  bookings: string;
  category: string;
}

const popularTests: LabTest[] = [
  { id: 1, name: 'Complete Blood Count (CBC)', description: 'CBC with 28 parameters', parameters: '28 tests included', price: 299, originalPrice: 599, discount: 50, reportTime: '6 hours', fasting: 'Not Required', rating: 4.8, bookings: '15K+ bookings', category: 'Popular Tests' },
  { id: 2, name: 'Thyroid Profile Total', description: 'T3, T4, TSH tests', parameters: '3 tests included', price: 449, originalPrice: 799, discount: 44, reportTime: '8 hours', fasting: 'Not Required', rating: 4.9, bookings: '12K+ bookings', category: 'Thyroid' },
  { id: 3, name: 'Diabetes Screening (HbA1c)', description: 'HbA1c, Fasting Sugar', parameters: '2 tests included', price: 349, originalPrice: 699, discount: 50, reportTime: '12 hours', fasting: 'Required', rating: 4.7, bookings: '18K+ bookings', category: 'Diabetes' },
  { id: 4, name: 'Lipid Profile Complete', description: 'Cholesterol, HDL, LDL, Triglycerides', parameters: '8 tests included', price: 399, originalPrice: 749, discount: 47, reportTime: '6 hours', fasting: 'Required (12 hours)', rating: 4.8, bookings: '20K+ bookings', category: 'Heart Health' },
  { id: 5, name: 'Liver Function Test (LFT)', description: 'Complete liver health assessment', parameters: '11 tests included', price: 449, originalPrice: 899, discount: 50, reportTime: '8 hours', fasting: 'Preferred', rating: 4.7, bookings: '10K+ bookings', category: 'Liver' },
  { id: 6, name: 'Kidney Function Test (KFT)', description: 'Complete kidney health check', parameters: '9 tests included', price: 399, originalPrice: 799, discount: 50, reportTime: '8 hours', fasting: 'Not Required', rating: 4.9, bookings: '11K+ bookings', category: 'Kidney' },
  { id: 7, name: 'Vitamin D Test', description: '25-Hydroxy Vitamin D', parameters: '1 test included', price: 599, originalPrice: 999, discount: 40, reportTime: '24 hours', fasting: 'Not Required', rating: 4.8, bookings: '9K+ bookings', category: 'Vitamin Tests' },
  { id: 8, name: 'Full Body Checkup', description: 'Complete health assessment', parameters: '70 tests included', price: 1499, originalPrice: 3999, discount: 62, reportTime: '24 hours', fasting: 'Required (12 hours)', rating: 4.9, bookings: '25K+ bookings', category: 'Full Body Checkup' },
  { id: 9, name: 'Women Health Package', description: 'Hormones, CBC, Thyroid, Iron', parameters: '40 tests included', price: 1299, originalPrice: 2999, discount: 57, reportTime: '24 hours', fasting: 'Required', rating: 4.8, bookings: '8K+ bookings', category: 'Women Health' },
];

const categories = [
  'All Tests', 'Popular Tests', 'Full Body Checkup', 'Diabetes', 'Thyroid', 'Liver', 'Kidney', 'Vitamin Tests', 'Women Health', 'Heart Health',
];

const faqs = [
  { question: 'How does home sample collection work?', answer: 'After booking your test, you can schedule a convenient time slot. Our trained phlebotomist will visit your home with proper safety equipment and collect the sample. The process is quick, safe, and completely hassle-free.' },
  { question: 'How long does it take to get reports?', answer: 'Most test reports are available within 6-24 hours. Some specialized tests may take 24-48 hours. You will receive your reports via email and they will also be available in your account dashboard.' },
  { question: 'Are your labs certified?', answer: 'Yes, all our partner labs are NABL certified and follow the highest quality standards. We ensure accurate and reliable test results that you can trust.' },
  { question: 'Do I need to fast before all tests?', answer: 'Not all tests require fasting. Each test listing clearly mentions whether fasting is required. For tests that require fasting, you typically need to fast for 8-12 hours before sample collection.' },
  { question: 'Can I cancel or reschedule my test?', answer: 'Yes, you can cancel or reschedule your home visit up to 4 hours before the scheduled time without any charges. Simply go to your bookings and make the changes.' },
];

const timeSlots = ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'];

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }
  return days;
}

export function LabsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Tests');

  // Booking modal state
  const [bookingTest, setBookingTest] = useState<LabTest | null>(null);
  const [bookStep, setBookStep] = useState<'details' | 'payment' | 'success'>('details');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [patientName, setPatientName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [processing, setProcessing] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const days = useMemo(() => getNext7Days(), []);

  // Filter tests
  const filteredTests = useMemo(() => {
    let tests = popularTests;
    if (activeCategory !== 'All Tests') {
      tests = tests.filter((t) => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tests = tests.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return tests;
  }, [activeCategory, searchQuery]);

  const handleBookTest = (test: LabTest) => {
    if (!isAuthenticated) {
      navigate('/login?returnTo=/labs');
      return;
    }
    setBookingTest(test);
    setBookStep('details');
    setSelectedDate('');
    setSelectedTime('');
    setAddress('');
    setPhone('');
    setPatientName('');
    setErrors({});
  };

  const validateDetails = (): boolean => {
    const e: Record<string, string> = {};
    if (!patientName.trim()) e.patientName = 'Patient name is required';
    if (!phone.trim()) e.phone = 'Phone number is required';
    else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, '')))
      e.phone = 'Enter a valid 10-digit phone number';
    if (!selectedDate) e.date = 'Please select a date';
    if (!selectedTime) e.time = 'Please select a time slot';
    if (!address.trim()) e.address = 'Address is required for home collection';
    else if (address.trim().length < 10) e.address = 'Please enter a complete address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDetailsSubmit = () => {
    if (validateDetails()) {
      setBookStep('payment');
      setErrors({});
    }
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setBookStep('success');
    }, 2000);
  };

  const closeBooking = () => {
    setBookingTest(null);
    setBookStep('details');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
              <Award className="w-5 h-5" />
              <span className="font-medium">NABL Certified &bull; ISO Compliant</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">Lab Tests at Your Doorstep</h1>
            <p className="text-2xl text-white/90 mb-10 leading-relaxed">Book lab tests online with free home sample collection.<br />Fast reports. Accurate results. Best prices.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={() => setShowAIChat(true)} className="group bg-white text-[#10B981] px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />Find Right Test with AI
              </button>
              {!isAuthenticated && (
                <button onClick={() => navigate('/register')} className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3">
                  View All Tests<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Users, value: '1M+', label: 'Tests Completed' },
                { icon: FlaskConical, value: '200+', label: 'Test Options' },
                { icon: Award, value: '100%', label: 'Accuracy' },
                { icon: Star, value: '4.9\u2605', label: 'User Rating' },
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

      {/* AI Banner */}
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
            <button onClick={() => setShowAIChat(true)} className="px-6 py-3 bg-[#10B981] text-white rounded-xl font-medium hover:bg-[#059669] transition-colors">Get Test Recommendation</button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Home, title: 'Free Home Visit', desc: 'Trained phlebotomist at doorstep', color: 'from-blue-500 to-blue-600' },
              { icon: Clock, title: 'Quick Reports', desc: 'Results in 6-24 hours', color: 'from-purple-500 to-purple-600' },
              { icon: Shield, title: 'NABL Certified', desc: '100% accurate results', color: 'from-green-500 to-green-600' },
              { icon: Truck, title: 'Safe Collection', desc: 'Contactless & hygienic', color: 'from-orange-500 to-orange-600' },
            ].map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center group hover:shadow-xl transition-all border border-[rgba(0,0,0,0.06)]">
                <div className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#030213] mb-2">{f.title}</h3>
                <p className="text-sm text-[#64748B]">{f.desc}</p>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tests, packages, or health concerns..."
                className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#10B981] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 bg-white sticky top-16 z-30 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === category
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

      {/* Tests Grid */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#030213] mb-2">
              {activeCategory === 'All Tests' ? 'Popular Lab Tests' : activeCategory}
            </h2>
            <p className="text-lg text-[#64748B]">
              {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''} available
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {filteredTests.length === 0 ? (
            <div className="bg-white rounded-[24px] p-12 border border-[rgba(0,0,0,0.06)] text-center">
              <FlaskConical className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#030213] mb-2">No Tests Found</h3>
              <p className="text-[#64748B] mb-6">Try a different search or category.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All Tests'); }} className="px-6 py-3 bg-[#10B981] text-white rounded-xl font-medium">
                View All Tests
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  onClick={() => handleBookTest(test)}
                  className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-[#10B981]/5 transition-all group cursor-pointer"
                >
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
                      <span className={`font-semibold ${test.fasting.includes('Required') ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>{test.fasting}</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-3 mb-2">
                    <div>
                      <div className="text-xs text-[#64748B] mb-1">Starting from</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-[#030213]">₹{test.price}</span>
                        <span className="text-lg text-[#64748B] line-through">₹{test.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] mb-5 flex items-center gap-1"><CheckCircle className="w-3 h-3" />{test.bookings}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBookTest(test); }}
                    className="w-full py-3.5 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#10B981]/30 transition-all"
                  >
                    {isAuthenticated ? 'Book Now' : 'Sign in to Book'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#030213] mb-4">How It Works</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">Getting your lab tests done is simple and convenient</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#10B981] via-[#10B981] to-[#10B981] opacity-20" style={{ width: 'calc(100% - 200px)', left: '100px' }}></div>
            {[
              { step: '1', title: 'Select Your Test', description: 'Browse our wide range of tests and health packages', icon: Search, color: 'from-blue-500 to-blue-600' },
              { step: '2', title: 'Book Time Slot', description: 'Choose a convenient date and time for home collection', icon: Calendar, color: 'from-purple-500 to-purple-600' },
              { step: '3', title: 'Sample Collection', description: 'Our expert visits your home for safe sample collection', icon: Home, color: 'from-green-500 to-green-600' },
              { step: '4', title: 'Get Your Report', description: 'Receive digital report via email within hours', icon: CheckCircle, color: 'from-orange-500 to-orange-600' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-2xl p-8 border-2 border-[#10B981]/10 relative z-10 hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-xl`}>{item.step}</div>
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
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" alt="Lab Quality" className="rounded-2xl shadow-2xl" />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 bg-[#10B981]/10 px-4 py-2 rounded-full mb-4">
                  <Shield className="w-4 h-4 text-[#10B981]" /><span className="text-sm font-medium text-[#10B981]">NABL Certified Labs</span>
                </div>
                <h2 className="text-3xl font-bold text-[#030213] mb-4">Accuracy You Can Trust</h2>
                <p className="text-[#64748B] mb-6 leading-relaxed">All our partner labs are NABL and ISO certified, ensuring the highest standards of quality and accuracy.</p>
                <div className="space-y-3">
                  {['NABL & ISO certified laboratories', 'State-of-the-art testing equipment', 'Quality control on every sample', 'Secure data storage & privacy'].map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3"><div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-4 h-4 text-white" /></div><span className="text-[#030213] font-medium">{f}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#030213] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#64748B]">Everything you need to know about lab tests</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] hover:shadow-lg transition-all">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                  <span className="font-semibold text-[#030213] pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#64748B] transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (<div className="px-6 pb-5"><p className="text-[#64748B] leading-relaxed">{faq.answer}</p></div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] relative overflow-hidden">
          <div className="absolute inset-0"><div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div><div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Book Your Lab Test Today</h2>
            <p className="text-xl text-white/90 mb-10">Get accurate results with free home collection and best prices</p>
            <button onClick={() => navigate('/register')} className="bg-white text-[#10B981] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3">Get Started Now<ArrowRight className="w-6 h-6" /></button>
          </div>
        </section>
      )}

      {/* Booking Modal */}
      {bookingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3">
                {bookStep !== 'details' && bookStep !== 'success' && (
                  <button onClick={() => setBookStep('details')} className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center hover:bg-[#E2E8F0]">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h2 className="font-bold text-[#030213] text-lg">
                  {bookStep === 'details' ? 'Book Lab Test' : bookStep === 'payment' ? 'Payment' : 'Booking Confirmed!'}
                </h2>
              </div>
              <button onClick={closeBooking} className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center hover:bg-[#E2E8F0]"><X className="w-4 h-4" /></button>
            </div>

            {/* Test Summary */}
            <div className="p-6 bg-[#F8FAFC] border-b border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#030213] text-sm">{bookingTest.name}</h3>
                  <p className="text-xs text-[#64748B]">{bookingTest.parameters} &bull; Report in {bookingTest.reportTime}</p>
                </div>
                <span className="font-bold text-[#030213]">₹{bookingTest.price}</span>
              </div>
            </div>

            {/* Step: Details */}
            {bookStep === 'details' && (
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-1.5">Patient Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Full name" className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm ${errors.patientName ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#10B981] bg-[#F8FAFC]'}`} />
                  </div>
                  {errors.patientName && <p className="text-xs text-[#EF4444] mt-1">{errors.patientName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm ${errors.phone ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#10B981] bg-[#F8FAFC]'}`} />
                  </div>
                  {errors.phone && <p className="text-xs text-[#EF4444] mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-1.5">Select Date *</label>
                  <div className="grid grid-cols-4 gap-2">
                    {days.map((d) => (
                      <button key={d.date} onClick={() => setSelectedDate(d.date)} className={`p-2 rounded-xl text-center text-xs transition-all border-2 ${selectedDate === d.date ? 'border-[#10B981] bg-[#10B981] text-white' : 'border-[#E2E8F0] hover:border-[#10B981]/30'}`}>
                        <div className={selectedDate === d.date ? 'text-white/80' : 'text-[#94A3B8]'}>{d.day}</div>
                        <div className="font-semibold">{d.label}</div>
                      </button>
                    ))}
                  </div>
                  {errors.date && <p className="text-xs text-[#EF4444] mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-1.5">Select Time Slot *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button key={t} onClick={() => setSelectedTime(t)} className={`py-2.5 rounded-xl text-sm font-medium transition-all ${selectedTime === t ? 'bg-[#10B981] text-white shadow-md' : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'}`}>{t}</button>
                    ))}
                  </div>
                  {errors.time && <p className="text-xs text-[#EF4444] mt-1">{errors.time}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-1.5">Home Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8]" />
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder="Enter complete address for home sample collection" className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm resize-none ${errors.address ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#10B981] bg-[#F8FAFC]'}`} />
                  </div>
                  {errors.address && <p className="text-xs text-[#EF4444] mt-1">{errors.address}</p>}
                </div>
                {bookingTest.fasting.includes('Required') && (
                  <div className="bg-[#FEF3C7] rounded-xl p-3 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#92400E]">This test requires fasting. Please do not eat or drink anything (except water) for {bookingTest.fasting.includes('12') ? '12' : '8-12'} hours before sample collection.</p>
                  </div>
                )}
                <button onClick={handleDetailsSubmit} className="w-full py-3.5 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-colors">Continue to Payment</button>
              </div>
            )}

            {/* Step: Payment */}
            {bookStep === 'payment' && (
              <div className="p-6 space-y-5">
                <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#64748B]">Test Price</span><span className="line-through text-[#94A3B8]">₹{bookingTest.originalPrice}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Discount ({bookingTest.discount}%)</span><span className="text-[#10B981]">-₹{bookingTest.originalPrice - bookingTest.price}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Home Collection</span><span className="text-[#10B981]">FREE</span></div>
                  <div className="border-t border-[rgba(0,0,0,0.06)] pt-2 flex justify-between"><span className="font-semibold text-[#030213]">Total</span><span className="font-bold text-[#030213]">₹{bookingTest.price}</span></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-3">Payment Method</label>
                  <div className="space-y-2">
                    {([['card', 'Credit / Debit Card', CreditCard], ['upi', 'UPI Payment', Phone], ['wallet', 'Wallet', Shield]] as const).map(([id, label, Icon]) => (
                      <button key={id} onClick={() => setPaymentMethod(id as 'card' | 'upi' | 'wallet')} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === id ? 'border-[#10B981] bg-[#F0FDF4]' : 'border-[#E2E8F0] hover:border-[#10B981]/30'}`}>
                        <Icon className={`w-5 h-5 ${paymentMethod === id ? 'text-[#10B981]' : 'text-[#64748B]'}`} />
                        <span className={`font-medium text-sm ${paymentMethod === id ? 'text-[#030213]' : 'text-[#64748B]'}`}>{label}</span>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === id ? 'border-[#10B981] bg-[#10B981]' : 'border-[#CBD5E1]'}`}>
                          {paymentMethod === id && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#F0FDF4] rounded-xl p-3">
                  <Lock className="w-4 h-4 text-[#10B981]" />
                  <p className="text-xs text-[#64748B]">Payment is 100% secure & encrypted</p>
                </div>
                <button onClick={handlePayment} disabled={processing} className="w-full py-3.5 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {processing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</> : <>Pay ₹{bookingTest.price}</>}
                </button>
              </div>
            )}

            {/* Step: Success */}
            {bookStep === 'success' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#10B981]/30">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#030213] mb-2">Booking Confirmed!</h3>
                <p className="text-[#64748B] mb-6">Your home sample collection has been scheduled.</p>
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-left space-y-2 text-sm mb-6">
                  <div className="flex justify-between"><span className="text-[#64748B]">Test</span><span className="font-medium text-[#030213]">{bookingTest.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Patient</span><span className="text-[#030213]">{patientName}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Date</span><span className="text-[#030213]">{days.find(d => d.date === selectedDate)?.label} ({days.find(d => d.date === selectedDate)?.day})</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Time</span><span className="text-[#030213]">{selectedTime}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Amount Paid</span><span className="font-bold text-[#10B981]">₹{bookingTest.price}</span></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={closeBooking} className="flex-1 py-3 bg-[#10B981] text-white rounded-xl font-semibold">Done</button>
                  <button onClick={() => { closeBooking(); navigate('/dashboard'); }} className="flex-1 py-3 bg-[#F8FAFC] text-[#030213] rounded-xl font-semibold border border-[rgba(0,0,0,0.06)]">Dashboard</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <AIChatModal isOpen={showAIChat} onClose={() => setShowAIChat(false)} initialMode="test" />
      <Footer />
    </div>
  );
}
