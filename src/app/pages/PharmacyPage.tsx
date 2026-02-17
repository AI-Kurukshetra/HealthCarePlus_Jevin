import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Pill, Truck, Clock, Shield, CheckCircle, Upload, ArrowRight, Star, Search, Filter, Sparkles, Lock, ChevronDown, Award, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { AIChatModal } from '../components/AIChatModal';

const popularMedicines = [
  {
    id: 1,
    name: 'Dolo 650mg Tablet',
    type: 'Pain Relief',
    manufacturer: 'Micro Labs',
    price: 15,
    originalPrice: 20,
    discount: 25,
    prescription: 'Not Required',
    rating: 4.8,
    inStock: true,
    packSize: 'Strip of 15 tablets',
  },
  {
    id: 2,
    name: 'Azithromycin 500mg',
    type: 'Antibiotic',
    manufacturer: 'Cipla',
    price: 89,
    originalPrice: 120,
    discount: 26,
    prescription: 'Required',
    rating: 4.7,
    inStock: true,
    packSize: 'Strip of 6 tablets',
  },
  {
    id: 3,
    name: 'Vitamin D3 60K',
    type: 'Supplement',
    manufacturer: 'Sun Pharma',
    price: 45,
    originalPrice: 60,
    discount: 25,
    prescription: 'Not Required',
    rating: 4.9,
    inStock: true,
    packSize: 'Strip of 4 capsules',
  },
  {
    id: 4,
    name: 'Cetrizine 10mg',
    type: 'Allergy',
    manufacturer: 'Dr. Reddy\'s',
    price: 12,
    originalPrice: 18,
    discount: 33,
    prescription: 'Not Required',
    rating: 4.6,
    inStock: true,
    packSize: 'Strip of 10 tablets',
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    type: 'Acidity',
    manufacturer: 'Zydus Cadila',
    price: 32,
    originalPrice: 45,
    discount: 29,
    prescription: 'Not Required',
    rating: 4.7,
    inStock: true,
    packSize: 'Strip of 15 capsules',
  },
  {
    id: 6,
    name: 'Metformin 500mg',
    type: 'Diabetes',
    manufacturer: 'USV Ltd',
    price: 25,
    originalPrice: 35,
    discount: 29,
    prescription: 'Required',
    rating: 4.8,
    inStock: true,
    packSize: 'Strip of 20 tablets',
  },
];

const categories = [
  'All Medicines',
  'Popular',
  'Diabetes',
  'Pain Relief',
  'Vitamins',
  'Cold & Flu',
  'Antibiotics',
  'Heart Health',
  'Skin Care',
  'Baby Care',
];

const faqs = [
  {
    question: 'How do I order medicines online?',
    answer: 'Simply search for your medicine, add it to cart, upload prescription if required, and proceed to checkout. Our pharmacist will verify your prescription and deliver medicines to your doorstep within 30 minutes.',
  },
  {
    question: 'Is prescription mandatory for all medicines?',
    answer: 'No, over-the-counter medicines don\'t require prescriptions. However, for prescription-only medicines, you must upload a valid prescription from a registered doctor. Our pharmacist will verify it before processing your order.',
  },
  {
    question: 'How fast can I get my medicines delivered?',
    answer: 'We offer express delivery within 30 minutes in select areas. Standard delivery takes 2-4 hours. You can choose your preferred delivery slot during checkout.',
  },
  {
    question: 'Are the medicines genuine?',
    answer: 'Yes, 100%. We source all medicines directly from authorized distributors and manufacturers. Every medicine is quality-checked and comes with proper packaging and batch information.',
  },
  {
    question: 'Can I return medicines if I change my mind?',
    answer: 'Due to safety regulations, medicines cannot be returned once delivered. However, if you receive wrong or damaged medicines, we will replace them immediately at no extra cost.',
  },
];

export function PharmacyPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleOrderMedicine = (medicineName: string) => {
    if (!isAuthenticated) {
      navigate('/register');
    } else {
      console.log(`Ordering medicine: ${medicineName}`);
      alert(`Adding ${medicineName} to cart. This would show quantity selection and prescription upload if required.`);
    }
  };

  const handleUploadPrescription = () => {
    if (!isAuthenticated) {
      navigate('/register');
    } else {
      console.log('Opening prescription upload');
      alert('This would open a prescription upload interface where you can upload your prescription image.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Different size/design */}
      <section className="relative bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] text-white py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10 bg-[#00000000]">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">Express Delivery in 30 Minutes</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-5 leading-tight">
                Order Medicines Online
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Get 100% genuine medicines delivered fast. Upload prescription and order in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={handleUploadPrescription}
                  className="group bg-white text-[#F59E0B] px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3"
                >
                  <Upload className="w-5 h-5" />
                  Upload Prescription
                </button>
                <button
                  onClick={() => setShowAIChat(true)}
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  AI Medicine Finder
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Package, value: '5000+', label: 'Medicines' },
                  { icon: Truck, value: '30 min', label: 'Delivery' },
                  { icon: Star, value: '4.9★', label: 'Rating' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <stat.icon className="w-6 h-6 mb-2" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-white/80 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Box */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 border-dashed">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-10 h-10 text-[#F59E0B]" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-3">Quick Order</h3>
                <p className="text-white/80 text-center mb-6">
                  Upload your prescription and we'll prepare your order
                </p>
                <button
                  onClick={handleUploadPrescription}
                  className="w-full bg-white text-[#F59E0B] py-4 rounded-xl font-bold hover:bg-white/90 transition-colors"
                >
                  Upload Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="py-6 bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] border-y border-[#F59E0B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#030213]">Looking for a specific medicine?</h3>
                <p className="text-sm text-[#64748B]">Our AI can help you find alternatives and generic options</p>
              </div>
            </div>
            <button
              onClick={() => setShowAIChat(true)}
              className="px-6 py-3 bg-[#F59E0B] text-white rounded-xl font-medium hover:bg-[#EA580C] transition-colors"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Express Delivery', desc: 'Get medicines in 30 mins', color: 'from-orange-500 to-orange-600' },
              { icon: Shield, title: '100% Genuine', desc: 'Authentic medicines only', color: 'from-green-500 to-green-600' },
              { icon: Clock, title: '24/7 Available', desc: 'Order anytime, anywhere', color: 'from-blue-500 to-blue-600' },
              { icon: Award, title: 'Best Prices', desc: 'Up to 50% discount', color: 'from-purple-500 to-purple-600' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center group hover:shadow-xl transition-all border border-[rgba(0,0,0,0.06)]">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
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
                placeholder="Search for medicines, health products..."
                className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#F59E0B] transition-colors"
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
                    ? 'bg-[#F59E0B] text-white shadow-lg shadow-[#F59E0B]/25'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Medicines */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#030213] mb-2">Popular Medicines</h2>
            <p className="text-lg text-[#64748B]">Frequently ordered medicines with exclusive discounts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-[#F59E0B]/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-5">
                  {/* Medicine Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Pill className="w-7 h-7 text-white" />
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-col items-end gap-2">
                    {medicine.inStock && (
                      <span className="text-xs bg-[#D1FAE5] text-[#065F46] px-3 py-1 rounded-full font-bold">
                        In Stock
                      </span>
                    )}
                    {medicine.discount > 0 && (
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-[#EF4444] to-[#DC2626] px-3 py-1 rounded-lg shadow-lg">
                        {medicine.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Medicine Info */}
                <h3 className="font-bold text-lg text-[#030213] mb-1 leading-tight">{medicine.name}</h3>
                <p className="text-sm text-[#64748B] mb-1">{medicine.type}</p>
                <p className="text-xs text-[#64748B] mb-4">{medicine.manufacturer}</p>

                {/* Details */}
                <div className="bg-[#F8FAFC] rounded-xl p-4 mb-5 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Pack Size:</span>
                    <span className="font-semibold text-[#030213]">{medicine.packSize}</span>
                  </div>
                  <div className="w-full h-px bg-[#E2E8F0]"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Prescription:</span>
                    <span className={`font-semibold ${medicine.prescription === 'Required' ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
                      {medicine.prescription}
                    </span>
                  </div>
                  <div className="w-full h-px bg-[#E2E8F0]"></div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                    <span className="font-semibold text-[#030213]">{medicine.rating}</span>
                    <span className="text-[#64748B] text-xs ml-1">rating</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-end gap-3 mb-5">
                  <div>
                    <div className="text-xs text-[#64748B] mb-1">MRP</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#030213]">₹{medicine.price}</span>
                      <span className="text-lg text-[#64748B] line-through">₹{medicine.originalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => handleOrderMedicine(medicine.name)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all"
                >
                  {isAuthenticated ? 'Add to Cart' : 'Sign in to Order'}
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
              Order medicines in 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] via-[#F59E0B] to-[#F59E0B] opacity-20" style={{ width: 'calc(100% - 200px)', left: '100px' }}></div>
            
            {[
              { 
                step: '1', 
                title: 'Upload Prescription', 
                description: 'Take a photo and upload your prescription instantly',
                icon: Upload,
                color: 'from-blue-500 to-blue-600'
              },
              { 
                step: '2', 
                title: 'Select Medicines', 
                description: 'Browse and add medicines to your cart',
                icon: Search,
                color: 'from-purple-500 to-purple-600'
              },
              { 
                step: '3', 
                title: 'Place Order', 
                description: 'Complete checkout with secure payment',
                icon: CheckCircle,
                color: 'from-green-500 to-green-600'
              },
              { 
                step: '4', 
                title: 'Fast Delivery', 
                description: 'Get medicines delivered in 30 minutes',
                icon: Truck,
                color: 'from-orange-500 to-orange-600'
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FED7AA] rounded-2xl p-8 border-2 border-[#F59E0B]/10 relative z-10 hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-xl`}>
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <item.icon className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <h3 className="font-bold text-[#030213] mb-2 text-center">{item.title}</h3>
                  <p className="text-sm text-[#64748B] text-center leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Prescription CTA */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-[#FEF3C7] rounded-3xl p-12 border-2 border-[#F59E0B]/20 text-center shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#030213] mb-4">
              Have a Prescription?
            </h2>
            <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
              Upload your prescription and we'll prepare all your medicines. Our pharmacists verify each order for safety.
            </p>
            <button
              onClick={handleUploadPrescription}
              className="bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              <Upload className="w-6 h-6" />
              Upload Prescription Now
            </button>
            <p className="text-sm text-[#64748B] mt-6">
              <Lock className="w-4 h-4 inline mr-1" />
              Your prescription is stored securely and never shared
            </p>
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl p-8 md:p-12 border border-[rgba(0,0,0,0.06)] shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 px-4 py-2 rounded-full mb-4">
                  <Shield className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-sm font-medium text-[#F59E0B]">100% Genuine Medicines</span>
                </div>
                <h2 className="text-3xl font-bold text-[#030213] mb-4">
                  Quality & Authenticity Guaranteed
                </h2>
                <p className="text-[#64748B] mb-6 leading-relaxed">
                  We source all medicines directly from licensed manufacturers and distributors. Every product is quality-checked and comes with proper packaging, expiry dates, and batch information.
                </p>
                <div className="space-y-3">
                  {[
                    'Sourced from licensed distributors',
                    'Quality checked before dispatch',
                    'Verified by registered pharmacists',
                    'Secure prescription storage',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#030213] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop"
                  alt="Pharmacy Quality"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#030213] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#64748B]">Everything you need to know about ordering medicines</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] hover:shadow-lg transition-all"
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
        <section className="py-20 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Order Medicines?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Get medicines delivered to your doorstep in 30 minutes
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-[#F59E0B] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3"
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
        initialMode="medicine"
      />

      <Footer />
    </div>
  );
}