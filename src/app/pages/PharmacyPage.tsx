import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Pill, Truck, Clock, Shield, CheckCircle, Upload, ArrowRight, Star, Search, Sparkles, Lock, ChevronDown, Award, Package, X, Minus, Plus, ShoppingCart, CreditCard, Phone, MapPin, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { AIChatModal } from '../components/AIChatModal';

interface Medicine {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
  price: number;
  originalPrice: number;
  discount: number;
  prescription: string;
  rating: number;
  inStock: boolean;
  packSize: string;
  category: string;
}

const popularMedicines: Medicine[] = [
  { id: 1, name: 'Dolo 650mg Tablet', type: 'Pain Relief', manufacturer: 'Micro Labs', price: 15, originalPrice: 20, discount: 25, prescription: 'Not Required', rating: 4.8, inStock: true, packSize: 'Strip of 15 tablets', category: 'Pain Relief' },
  { id: 2, name: 'Azithromycin 500mg', type: 'Antibiotic', manufacturer: 'Cipla', price: 89, originalPrice: 120, discount: 26, prescription: 'Required', rating: 4.7, inStock: true, packSize: 'Strip of 6 tablets', category: 'Antibiotics' },
  { id: 3, name: 'Vitamin D3 60K', type: 'Supplement', manufacturer: 'Sun Pharma', price: 45, originalPrice: 60, discount: 25, prescription: 'Not Required', rating: 4.9, inStock: true, packSize: 'Strip of 4 capsules', category: 'Vitamins' },
  { id: 4, name: 'Cetrizine 10mg', type: 'Allergy', manufacturer: "Dr. Reddy's", price: 12, originalPrice: 18, discount: 33, prescription: 'Not Required', rating: 4.6, inStock: true, packSize: 'Strip of 10 tablets', category: 'Cold & Flu' },
  { id: 5, name: 'Omeprazole 20mg', type: 'Acidity', manufacturer: 'Zydus Cadila', price: 32, originalPrice: 45, discount: 29, prescription: 'Not Required', rating: 4.7, inStock: true, packSize: 'Strip of 15 capsules', category: 'Popular' },
  { id: 6, name: 'Metformin 500mg', type: 'Diabetes', manufacturer: 'USV Ltd', price: 25, originalPrice: 35, discount: 29, prescription: 'Required', rating: 4.8, inStock: true, packSize: 'Strip of 20 tablets', category: 'Diabetes' },
  { id: 7, name: 'Amoxicillin 500mg', type: 'Antibiotic', manufacturer: 'Cipla', price: 65, originalPrice: 90, discount: 28, prescription: 'Required', rating: 4.7, inStock: true, packSize: 'Strip of 10 capsules', category: 'Antibiotics' },
  { id: 8, name: 'Multivitamin Tablets', type: 'Supplement', manufacturer: 'Abbott', price: 180, originalPrice: 250, discount: 28, prescription: 'Not Required', rating: 4.9, inStock: true, packSize: 'Bottle of 30 tablets', category: 'Vitamins' },
  { id: 9, name: 'Amlodipine 5mg', type: 'Heart', manufacturer: 'Pfizer', price: 35, originalPrice: 50, discount: 30, prescription: 'Required', rating: 4.8, inStock: true, packSize: 'Strip of 14 tablets', category: 'Heart Health' },
];

const categories = ['All Medicines', 'Popular', 'Diabetes', 'Pain Relief', 'Vitamins', 'Cold & Flu', 'Antibiotics', 'Heart Health', 'Skin Care', 'Baby Care'];

const faqs = [
  { question: 'How do I order medicines online?', answer: 'Simply search for your medicine, add it to cart, upload prescription if required, and proceed to checkout. Our pharmacist will verify your prescription and deliver medicines to your doorstep within 30 minutes.' },
  { question: 'Is prescription mandatory for all medicines?', answer: "No, over-the-counter medicines don't require prescriptions. However, for prescription-only medicines, you must upload a valid prescription from a registered doctor." },
  { question: 'How fast can I get my medicines delivered?', answer: 'We offer express delivery within 30 minutes in select areas. Standard delivery takes 2-4 hours.' },
  { question: 'Are the medicines genuine?', answer: 'Yes, 100%. We source all medicines directly from authorized distributors and manufacturers.' },
  { question: 'Can I return medicines if I change my mind?', answer: 'Due to safety regulations, medicines cannot be returned once delivered. However, if you receive wrong or damaged medicines, we will replace them immediately.' },
];

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export function PharmacyPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Medicines');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    let meds = popularMedicines;
    if (activeCategory !== 'All Medicines') {
      meds = meds.filter((m) => m.category === activeCategory || m.type === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      meds = meds.filter(
        (m) => m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.manufacturer.toLowerCase().includes(q)
      );
    }
    return meds;
  }, [activeCategory, searchQuery]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.medicine.price * i.quantity, 0);
  const cartSavings = cart.reduce((sum, i) => sum + (i.medicine.originalPrice - i.medicine.price) * i.quantity, 0);
  const needsPrescription = cart.some((i) => i.medicine.prescription === 'Required');

  const addToCart = (medicine: Medicine) => {
    if (!isAuthenticated) { navigate('/login?returnTo=/pharmacy'); return; }
    setCart((prev) => {
      const existing = prev.find((i) => i.medicine.id === medicine.id);
      if (existing) return prev.map((i) => i.medicine.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { medicine, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => i.medicine.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter((i) => i.quantity > 0));
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.medicine.id !== id));

  const getCartQty = (id: number) => cart.find((i) => i.medicine.id === id)?.quantity || 0;

  const handleUploadPrescription = () => {
    if (!isAuthenticated) { navigate('/login?returnTo=/pharmacy'); return; }
    // In prototype, just show a message
  };

  const validateAddress = () => {
    const e: Record<string, string> = {};
    if (!deliveryAddress.trim()) e.address = 'Delivery address is required';
    else if (deliveryAddress.trim().length < 10) e.address = 'Please enter a complete address';
    if (!deliveryPhone.trim()) e.phone = 'Phone number is required';
    else if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(deliveryPhone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAddressContinue = () => {
    if (validateAddress()) { setCheckoutStep('payment'); setErrors({}); }
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setCheckoutStep('success'); }, 2000);
  };

  const openCartPanel = () => { setShowCart(true); setCheckoutStep('cart'); setErrors({}); };

  const closeCart = () => { setShowCart(false); setCheckoutStep('cart'); };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div><div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"><Truck className="w-4 h-4" /><span className="text-sm font-medium">Express Delivery in 30 Minutes</span></div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-5 leading-tight">Order Medicines Online</h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">Get 100% genuine medicines delivered fast. Upload prescription and order in seconds.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={handleUploadPrescription} className="group bg-white text-[#F59E0B] px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3"><Upload className="w-5 h-5" />Upload Prescription</button>
                <button onClick={() => setShowAIChat(true)} className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"><Sparkles className="w-5 h-5" />AI Medicine Finder</button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[{ icon: Package, value: '5000+', label: 'Medicines' }, { icon: Truck, value: '30 min', label: 'Delivery' }, { icon: Star, value: '4.9\u2605', label: 'Rating' }].map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"><stat.icon className="w-6 h-6 mb-2" /><div className="text-2xl font-bold mb-1">{stat.value}</div><div className="text-white/80 text-xs">{stat.label}</div></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 border-dashed">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6"><Upload className="w-10 h-10 text-[#F59E0B]" /></div>
                <h3 className="text-2xl font-bold text-center mb-3">Quick Order</h3>
                <p className="text-white/80 text-center mb-6">Upload your prescription and we'll prepare your order</p>
                <button onClick={handleUploadPrescription} className="w-full bg-white text-[#F59E0B] py-4 rounded-xl font-bold hover:bg-white/90 transition-colors">Upload Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Banner */}
      <section className="py-6 bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] border-y border-[#F59E0B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-xl flex items-center justify-center"><Sparkles className="w-6 h-6 text-white" /></div>
              <div><h3 className="font-semibold text-[#030213]">Looking for a specific medicine?</h3><p className="text-sm text-[#64748B]">Our AI can help you find alternatives and generic options</p></div>
            </div>
            <button onClick={() => setShowAIChat(true)} className="px-6 py-3 bg-[#F59E0B] text-white rounded-xl font-medium hover:bg-[#EA580C] transition-colors">Ask AI Assistant</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[{ icon: Truck, title: 'Express Delivery', desc: 'Get medicines in 30 mins', color: 'from-orange-500 to-orange-600' }, { icon: Shield, title: '100% Genuine', desc: 'Authentic medicines only', color: 'from-green-500 to-green-600' }, { icon: Clock, title: '24/7 Available', desc: 'Order anytime, anywhere', color: 'from-blue-500 to-blue-600' }, { icon: Award, title: 'Best Prices', desc: 'Up to 50% discount', color: 'from-purple-500 to-purple-600' }].map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center group hover:shadow-xl transition-all border border-[rgba(0,0,0,0.06)]">
                <div className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}><f.icon className="w-8 h-8 text-white" /></div>
                <h3 className="font-bold text-[#030213] mb-2">{f.title}</h3><p className="text-sm text-[#64748B]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for medicines, health products..." className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#F59E0B] transition-colors" />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 bg-white sticky top-16 z-30 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === category ? 'bg-[#F59E0B] text-white shadow-lg shadow-[#F59E0B]/25' : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'}`}>{category}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Medicines Grid */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#030213] mb-2">{activeCategory === 'All Medicines' ? 'Popular Medicines' : activeCategory}</h2>
            <p className="text-lg text-[#64748B]">{filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''} available{searchQuery && ` for "${searchQuery}"`}</p>
          </div>

          {filteredMedicines.length === 0 ? (
            <div className="bg-white rounded-[24px] p-12 border border-[rgba(0,0,0,0.06)] text-center">
              <Pill className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#030213] mb-2">No Medicines Found</h3>
              <p className="text-[#64748B] mb-6">Try a different search or category.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All Medicines'); }} className="px-6 py-3 bg-[#F59E0B] text-white rounded-xl font-medium">View All Medicines</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedicines.map((medicine) => {
                const qty = getCartQty(medicine.id);
                return (
                  <div key={medicine.id} className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-[#F59E0B]/5 transition-all group cursor-pointer" onClick={() => addToCart(medicine)}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"><Pill className="w-7 h-7 text-white" /></div>
                      <div className="flex flex-col items-end gap-2">
                        {medicine.inStock && <span className="text-xs bg-[#D1FAE5] text-[#065F46] px-3 py-1 rounded-full font-bold">In Stock</span>}
                        {medicine.discount > 0 && <span className="text-xs font-bold text-white bg-gradient-to-r from-[#EF4444] to-[#DC2626] px-3 py-1 rounded-lg shadow-lg">{medicine.discount}% OFF</span>}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] mb-1 leading-tight">{medicine.name}</h3>
                    <p className="text-sm text-[#64748B] mb-1">{medicine.type}</p>
                    <p className="text-xs text-[#64748B] mb-4">{medicine.manufacturer}</p>
                    <div className="bg-[#F8FAFC] rounded-xl p-4 mb-5 space-y-3 text-sm">
                      <div className="flex justify-between items-center"><span className="text-[#64748B]">Pack Size:</span><span className="font-semibold text-[#030213]">{medicine.packSize}</span></div>
                      <div className="w-full h-px bg-[#E2E8F0]"></div>
                      <div className="flex justify-between items-center"><span className="text-[#64748B]">Prescription:</span><span className={`font-semibold ${medicine.prescription === 'Required' ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>{medicine.prescription}</span></div>
                      <div className="w-full h-px bg-[#E2E8F0]"></div>
                      <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" /><span className="font-semibold text-[#030213]">{medicine.rating}</span><span className="text-[#64748B] text-xs ml-1">rating</span></div>
                    </div>
                    <div className="flex items-end gap-3 mb-5">
                      <div><div className="text-xs text-[#64748B] mb-1">MRP</div><div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-[#030213]">₹{medicine.price}</span><span className="text-lg text-[#64748B] line-through">₹{medicine.originalPrice}</span></div></div>
                    </div>
                    {qty > 0 ? (
                      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => updateQty(medicine.id, -1)} className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center hover:bg-[#FDE68A] transition-colors"><Minus className="w-4 h-4 text-[#F59E0B]" /></button>
                        <span className="flex-1 text-center text-lg font-bold text-[#030213]">{qty}</span>
                        <button onClick={() => updateQty(medicine.id, 1)} className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center hover:bg-[#FDE68A] transition-colors"><Plus className="w-4 h-4 text-[#F59E0B]" /></button>
                      </div>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); addToCart(medicine); }} className="w-full py-3.5 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all">
                        {isAuthenticated ? 'Add to Cart' : 'Sign in to Order'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-[#030213] mb-4">How It Works</h2><p className="text-lg text-[#64748B] max-w-2xl mx-auto">Order medicines in 4 simple steps</p></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] via-[#F59E0B] to-[#F59E0B] opacity-20" style={{ width: 'calc(100% - 200px)', left: '100px' }}></div>
            {[{ step: '1', title: 'Upload Prescription', description: 'Take a photo and upload your prescription instantly', icon: Upload, color: 'from-blue-500 to-blue-600' }, { step: '2', title: 'Select Medicines', description: 'Browse and add medicines to your cart', icon: Search, color: 'from-purple-500 to-purple-600' }, { step: '3', title: 'Place Order', description: 'Complete checkout with secure payment', icon: CheckCircle, color: 'from-green-500 to-green-600' }, { step: '4', title: 'Fast Delivery', description: 'Get medicines delivered in 30 minutes', icon: Truck, color: 'from-orange-500 to-orange-600' }].map((item, index) => (
              <div key={index} className="relative"><div className="bg-gradient-to-br from-[#FEF3C7] to-[#FED7AA] rounded-2xl p-8 border-2 border-[#F59E0B]/10 relative z-10 hover:shadow-xl transition-all"><div className={`w-14 h-14 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-xl`}>{item.step}</div><div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md"><item.icon className="w-6 h-6 text-[#F59E0B]" /></div><h3 className="font-bold text-[#030213] mb-2 text-center">{item.title}</h3><p className="text-sm text-[#64748B] text-center leading-relaxed">{item.description}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-4xl font-bold text-[#030213] mb-4">Frequently Asked Questions</h2><p className="text-lg text-[#64748B]">Everything you need to know about ordering medicines</p></div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] hover:shadow-lg transition-all">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left"><span className="font-semibold text-[#030213] pr-4">{faq.question}</span><ChevronDown className={`w-5 h-5 text-[#64748B] transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} /></button>
                {openFaq === index && <div className="px-6 pb-5"><p className="text-[#64748B] leading-relaxed">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Order Medicines?</h2>
            <p className="text-xl text-white/90 mb-10">Get medicines delivered to your doorstep in 30 minutes</p>
            <button onClick={() => navigate('/register')} className="bg-white text-[#F59E0B] px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3">Get Started Now<ArrowRight className="w-6 h-6" /></button>
          </div>
        </section>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCart && (
        <button onClick={openCartPanel} className="fixed bottom-6 right-6 z-40 bg-[#F59E0B] text-white px-6 py-4 rounded-2xl shadow-2xl shadow-[#F59E0B]/40 flex items-center gap-3 hover:bg-[#EA580C] transition-colors">
          <ShoppingCart className="w-6 h-6" />
          <div className="text-left"><div className="font-bold">{cartCount} item{cartCount !== 1 ? 's' : ''}</div><div className="text-xs text-white/80">₹{cartTotal}</div></div>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={closeCart}></div>
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2">
                {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
                  <button onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'address' : 'cart')} className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center"><X className="w-4 h-4 rotate-180" /></button>
                )}
                <ShoppingCart className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="font-bold text-[#030213]">
                  {checkoutStep === 'cart' ? `Cart (${cartCount})` : checkoutStep === 'address' ? 'Delivery Details' : checkoutStep === 'payment' ? 'Payment' : 'Order Placed!'}
                </h2>
              </div>
              <button onClick={closeCart} className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center hover:bg-[#E2E8F0]"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Cart Items */}
              {checkoutStep === 'cart' && (
                <div className="p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12"><ShoppingCart className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" /><p className="text-[#64748B]">Your cart is empty</p></div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.medicine.id} className="flex gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-lg flex items-center justify-center flex-shrink-0"><Pill className="w-5 h-5 text-white" /></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-[#030213] text-sm truncate">{item.medicine.name}</h4>
                            <p className="text-xs text-[#64748B]">{item.medicine.packSize}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQty(item.medicine.id, -1)} className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                              <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQty(item.medicine.id, 1)} className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                            </div>
                          </div>
                          <div className="text-right flex flex-col justify-between items-end">
                            <button onClick={() => removeFromCart(item.medicine.id)} className="text-[#94A3B8] hover:text-[#EF4444]"><Trash2 className="w-4 h-4" /></button>
                            <span className="font-bold text-[#030213] text-sm">₹{item.medicine.price * item.quantity}</span>
                          </div>
                        </div>
                      ))}
                      {needsPrescription && (
                        <div className="bg-[#FEF3C7] rounded-xl p-3 flex items-start gap-2"><Shield className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" /><p className="text-xs text-[#92400E]">Some items require a prescription. You'll need to upload one during delivery.</p></div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Address */}
              {checkoutStep === 'address' && (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#030213] mb-1.5">Delivery Address *</label>
                    <div className="relative"><MapPin className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8]" /><textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} rows={3} placeholder="Enter full address with landmark" className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm resize-none ${errors.address ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#F59E0B] bg-[#F8FAFC]'}`} /></div>
                    {errors.address && <p className="text-xs text-[#EF4444] mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#030213] mb-1.5">Phone Number *</label>
                    <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" /><input type="tel" value={deliveryPhone} onChange={(e) => setDeliveryPhone(e.target.value)} placeholder="+91 98765 43210" className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm ${errors.phone ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#F59E0B] bg-[#F8FAFC]'}`} /></div>
                    {errors.phone && <p className="text-xs text-[#EF4444] mt-1">{errors.phone}</p>}
                  </div>
                  <div className="bg-[#F0F9FF] rounded-xl p-3 flex items-start gap-2"><Truck className="w-4 h-4 text-[#007EFC] mt-0.5 flex-shrink-0" /><p className="text-xs text-[#64748B]">Estimated delivery in 30-45 minutes after order confirmation.</p></div>
                </div>
              )}

              {/* Payment */}
              {checkoutStep === 'payment' && (
                <div className="p-5 space-y-4">
                  <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#64748B]">Subtotal ({cartCount} items)</span><span className="text-[#030213]">₹{cartTotal + cartSavings}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Discount</span><span className="text-[#10B981]">-₹{cartSavings}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Delivery</span><span className="text-[#10B981]">FREE</span></div>
                    <div className="border-t border-[rgba(0,0,0,0.06)] pt-2 flex justify-between"><span className="font-semibold">Total</span><span className="font-bold text-lg">₹{cartTotal}</span></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#030213] mb-3">Payment Method</label>
                    <div className="space-y-2">
                      {([['card', 'Credit / Debit Card', CreditCard], ['upi', 'UPI Payment', Phone], ['cod', 'Cash on Delivery', Package]] as const).map(([id, label, Icon]) => (
                        <button key={id} onClick={() => setPaymentMethod(id as any)} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === id ? 'border-[#F59E0B] bg-[#FEF3C7]' : 'border-[#E2E8F0] hover:border-[#F59E0B]/30'}`}>
                          <Icon className={`w-5 h-5 ${paymentMethod === id ? 'text-[#F59E0B]' : 'text-[#64748B]'}`} />
                          <span className={`font-medium text-sm ${paymentMethod === id ? 'text-[#030213]' : 'text-[#64748B]'}`}>{label}</span>
                          <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === id ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-[#CBD5E1]'}`}>
                            {paymentMethod === id && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F0FDF4] rounded-xl p-3"><Lock className="w-4 h-4 text-[#10B981]" /><p className="text-xs text-[#64748B]">Payment is 100% secure & encrypted</p></div>
                </div>
              )}

              {/* Success */}
              {checkoutStep === 'success' && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#10B981]/30"><CheckCircle className="w-8 h-8 text-white" /></div>
                  <h3 className="text-2xl font-bold text-[#030213] mb-2">Order Placed!</h3>
                  <p className="text-[#64748B] mb-6">Your medicines will be delivered in 30-45 minutes.</p>
                  <div className="bg-[#F8FAFC] rounded-xl p-4 text-left space-y-2 text-sm mb-6">
                    <div className="flex justify-between"><span className="text-[#64748B]">Items</span><span className="font-medium text-[#030213]">{cartCount}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Total</span><span className="font-bold text-[#10B981]">₹{cartTotal}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Payment</span><span className="text-[#030213]">{paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Delivery</span><span className="text-[#030213]">30-45 min</span></div>
                  </div>
                  <button onClick={() => { setCart([]); closeCart(); }} className="w-full py-3 bg-[#F59E0B] text-white rounded-xl font-semibold">Continue Shopping</button>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {checkoutStep === 'cart' && cart.length > 0 && (
              <div className="border-t border-[rgba(0,0,0,0.06)] p-5">
                <div className="flex justify-between mb-3 text-sm"><span className="text-[#64748B]">Total ({cartCount} items)</span><div><span className="font-bold text-[#030213] text-lg">₹{cartTotal}</span>{cartSavings > 0 && <span className="text-xs text-[#10B981] ml-2">Save ₹{cartSavings}</span>}</div></div>
                <button onClick={() => setCheckoutStep('address')} className="w-full py-3.5 bg-[#F59E0B] text-white rounded-xl font-semibold hover:bg-[#EA580C] transition-colors">Proceed to Checkout</button>
              </div>
            )}
            {checkoutStep === 'address' && (
              <div className="border-t border-[rgba(0,0,0,0.06)] p-5">
                <button onClick={handleAddressContinue} className="w-full py-3.5 bg-[#F59E0B] text-white rounded-xl font-semibold hover:bg-[#EA580C] transition-colors">Continue to Payment</button>
              </div>
            )}
            {checkoutStep === 'payment' && (
              <div className="border-t border-[rgba(0,0,0,0.06)] p-5">
                <button onClick={handlePayment} disabled={processing} className="w-full py-3.5 bg-[#F59E0B] text-white rounded-xl font-semibold hover:bg-[#EA580C] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {processing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</> : <>Place Order &bull; ₹{cartTotal}</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <AIChatModal isOpen={showAIChat} onClose={() => setShowAIChat(false)} initialMode="medicine" />
      <Footer />
    </div>
  );
}
