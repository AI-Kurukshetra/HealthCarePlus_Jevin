import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { doctors } from '../data/doctors';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Star,
  ArrowRight,
  Stethoscope,
  FlaskConical,
  Pill,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Thermometer,
  Activity,
  Video,
  ChevronRight,
} from 'lucide-react';

type SearchCategory = 'all' | 'doctors' | 'specialties' | 'conditions' | 'labs' | 'pharmacy';

interface SearchResult {
  id: string;
  type: 'doctor' | 'specialty' | 'condition' | 'lab' | 'pharmacy';
  title: string;
  subtitle: string;
  image?: string;
  meta?: string;
  link: string;
  rating?: number;
  fee?: number;
}

const specialties = [
  { name: 'General Physician', icon: Stethoscope, color: '#007EFC', count: 42 },
  { name: 'Cardiologist', icon: Heart, color: '#EF4444', count: 18 },
  { name: 'Dermatologist', icon: Activity, color: '#F59E0B', count: 24 },
  { name: 'Pediatrician', icon: Baby, color: '#10B981', count: 31 },
  { name: 'Psychiatrist', icon: Brain, color: '#8B5CF6', count: 15 },
  { name: 'Orthopedic', icon: Bone, color: '#F97316', count: 20 },
  { name: 'Ophthalmologist', icon: Eye, color: '#06B6D4', count: 12 },
  { name: 'Gynecologist', icon: Heart, color: '#EC4899', count: 22 },
];

const conditions = [
  { name: 'Fever & Cold', specialty: 'General Physician' },
  { name: 'Acne & Skin Rash', specialty: 'Dermatologist' },
  { name: 'Anxiety & Depression', specialty: 'Psychiatrist' },
  { name: 'Back Pain & Joint Pain', specialty: 'Orthopedic' },
  { name: 'Heart Palpitations', specialty: 'Cardiologist' },
  { name: 'Child Vaccination', specialty: 'Pediatrician' },
  { name: 'PCOD / PCOS', specialty: 'Gynecologist' },
  { name: 'Eye Infection', specialty: 'Ophthalmologist' },
  { name: 'Migraine & Headache', specialty: 'General Physician' },
  { name: 'Diabetes Management', specialty: 'General Physician' },
  { name: 'Thyroid Issues', specialty: 'General Physician' },
  { name: 'Hair Loss', specialty: 'Dermatologist' },
];

const labTests = [
  { name: 'Complete Blood Count (CBC)', price: 299, turnaround: '6 hours' },
  { name: 'Thyroid Profile (T3, T4, TSH)', price: 499, turnaround: '12 hours' },
  { name: 'Lipid Profile', price: 399, turnaround: '8 hours' },
  { name: 'HbA1c (Diabetes)', price: 349, turnaround: '6 hours' },
  { name: 'Vitamin D Test', price: 599, turnaround: '24 hours' },
  { name: 'Liver Function Test', price: 449, turnaround: '12 hours' },
];

const pharmacyItems = [
  { name: 'Paracetamol 500mg', category: 'Pain Relief', price: 35 },
  { name: 'Cetirizine 10mg', category: 'Allergy', price: 45 },
  { name: 'Omeprazole 20mg', category: 'Digestive', price: 65 },
  { name: 'Vitamin C 1000mg', category: 'Supplements', price: 180 },
  { name: 'Amoxicillin 500mg', category: 'Antibiotic', price: 95 },
  { name: 'Multivitamin Tablets', category: 'Supplements', price: 250 },
];

const recentSearches = [
  'Dr. Emily Chen',
  'Dermatologist',
  'Fever',
  'Blood Test',
  'Vitamin D',
];

const trendingSearches = [
  'Thyroid test',
  'Skin specialist',
  'Pediatrician near me',
  'Anxiety counselling',
  'Full body checkup',
  'Hair fall treatment',
];

export function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getResults = (): SearchResult[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results: SearchResult[] = [];

    // Doctor results
    if (activeCategory === 'all' || activeCategory === 'doctors') {
      doctors
        .filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.specialty.toLowerCase().includes(q) ||
            d.qualification.toLowerCase().includes(q)
        )
        .forEach((d) => {
          results.push({
            id: `doc-${d.id}`,
            type: 'doctor',
            title: d.name,
            subtitle: `${d.specialty} · ${d.qualification}`,
            image: d.imageUrl,
            meta: d.experience,
            link: `/doctor/${d.id}`,
            rating: d.rating,
            fee: d.consultationFee,
          });
        });
    }

    // Specialty results
    if (activeCategory === 'all' || activeCategory === 'specialties') {
      specialties
        .filter((s) => s.name.toLowerCase().includes(q))
        .forEach((s) => {
          results.push({
            id: `spec-${s.name}`,
            type: 'specialty',
            title: s.name,
            subtitle: `${s.count} doctors available`,
            link: '/consultations',
          });
        });
    }

    // Condition results
    if (activeCategory === 'all' || activeCategory === 'conditions') {
      conditions
        .filter((c) => c.name.toLowerCase().includes(q))
        .forEach((c) => {
          results.push({
            id: `cond-${c.name}`,
            type: 'condition',
            title: c.name,
            subtitle: `Consult a ${c.specialty}`,
            link: '/consultations',
          });
        });
    }

    // Lab results
    if (activeCategory === 'all' || activeCategory === 'labs') {
      labTests
        .filter((l) => l.name.toLowerCase().includes(q))
        .forEach((l) => {
          results.push({
            id: `lab-${l.name}`,
            type: 'lab',
            title: l.name,
            subtitle: `Results in ${l.turnaround}`,
            link: '/labs',
            fee: l.price,
          });
        });
    }

    // Pharmacy results
    if (activeCategory === 'all' || activeCategory === 'pharmacy') {
      pharmacyItems
        .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
        .forEach((p) => {
          results.push({
            id: `pharma-${p.name}`,
            type: 'pharmacy',
            title: p.name,
            subtitle: p.category,
            link: '/pharmacy',
            fee: p.price,
          });
        });
    }

    return results;
  };

  const results = getResults();

  const handleSearch = (term: string) => {
    setQuery(term);
    setHasSearched(true);
  };

  const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
    doctor: { label: 'Doctor', color: '#007EFC', bg: '#F0F9FF' },
    specialty: { label: 'Specialty', color: '#8B5CF6', bg: '#F5F3FF' },
    condition: { label: 'Condition', color: '#F59E0B', bg: '#FFFBEB' },
    lab: { label: 'Lab Test', color: '#10B981', bg: '#F0FDF4' },
    pharmacy: { label: 'Pharmacy', color: '#EC4899', bg: '#FDF2F8' },
  };

  const categories: { id: SearchCategory; label: string; icon: typeof Search }[] = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'specialties', label: 'Specialties', icon: Activity },
    { id: 'conditions', label: 'Conditions', icon: Thermometer },
    { id: 'labs', label: 'Lab Tests', icon: FlaskConical },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Search Hero */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#030213] mb-6 text-center">
            What are you looking for?
          </h1>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#94A3B8]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length > 0) setHasSearched(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(query);
              }}
              placeholder="Search doctors, specialties, conditions, labs, medicines..."
              className="w-full pl-14 pr-12 py-5 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#007EFC] focus:bg-white transition-all text-[#030213] text-lg"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setHasSearched(false);
                  inputRef.current?.focus();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#E2E8F0] rounded-lg flex items-center justify-center hover:bg-[#CBD5E1] transition-colors"
              >
                <X className="w-4 h-4 text-[#64748B]" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm ${
                  activeCategory === cat.id
                    ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] border border-[rgba(0,0,0,0.06)]'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* No query — Show suggestions */}
        {!hasSearched || !query.trim() ? (
          <div className="space-y-10">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#64748B]" />
                <h2 className="font-semibold text-[#030213]">Recent Searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl text-sm text-[#64748B] hover:bg-[#F0F9FF] hover:border-[#007EFC]/20 hover:text-[#007EFC] transition-all"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#007EFC]" />
                <h2 className="font-semibold text-[#030213]">Trending Searches</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trendingSearches.map((term, i) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="flex items-center gap-4 px-5 py-4 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl text-left hover:bg-[#F0F9FF] hover:border-[#007EFC]/20 transition-all group"
                  >
                    <span className="w-8 h-8 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-sm font-bold text-[#007EFC] group-hover:bg-[#007EFC] group-hover:text-white transition-colors">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-medium text-[#030213] text-sm">{term}</span>
                    <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#007EFC] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Browse Specialties */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[#030213]">Browse by Specialty</h2>
                <button
                  onClick={() => navigate('/consultations')}
                  className="text-sm text-[#007EFC] hover:underline font-medium flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specialties.map((spec) => (
                  <button
                    key={spec.name}
                    onClick={() => handleSearch(spec.name)}
                    className="flex flex-col items-center gap-3 p-5 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl hover:shadow-lg hover:border-[#007EFC]/20 transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${spec.color}15` }}
                    >
                      <spec.icon className="w-6 h-6" style={{ color: spec.color }} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-[#030213] text-sm">{spec.name}</p>
                      <p className="text-xs text-[#94A3B8] mt-0.5">{spec.count} doctors</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="font-semibold text-[#030213] mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Book a Consultation', desc: 'Talk to a doctor now', icon: Video, link: '/consultations', color: '#007EFC' },
                  { label: 'Book Lab Test', desc: 'Home sample collection', icon: FlaskConical, link: '/labs', color: '#10B981' },
                  { label: 'Order Medicines', desc: 'Delivered to your door', icon: Pill, link: '/pharmacy', color: '#8B5CF6' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.link)}
                    className="flex items-center gap-4 p-5 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl hover:shadow-lg transition-all text-left group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#030213] text-sm">{item.label}</p>
                      <p className="text-xs text-[#94A3B8]">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#007EFC] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#64748B]">
                {results.length > 0 ? (
                  <>
                    <span className="font-semibold text-[#030213]">{results.length}</span> results
                    for "<span className="font-medium text-[#030213]">{query}</span>"
                  </>
                ) : (
                  <>
                    No results for "<span className="font-medium text-[#030213]">{query}</span>"
                  </>
                )}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-[24px] p-12 border border-[rgba(0,0,0,0.06)] text-center">
                <Search className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#030213] mb-2">No Results Found</h3>
                <p className="text-[#64748B] mb-6 max-w-md mx-auto">
                  We couldn't find anything matching "{query}". Try a different search term or browse by category.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['General Physician', 'Blood Test', 'Fever'].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-4 py-2 bg-[#F8FAFC] border border-[rgba(0,0,0,0.06)] rounded-lg text-sm text-[#007EFC] hover:bg-[#F0F9FF] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((result) => {
                  const config = typeConfig[result.type];
                  return (
                    <button
                      key={result.id}
                      onClick={() => navigate(result.link)}
                      className="w-full flex items-center gap-4 p-5 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl hover:shadow-lg hover:border-[#007EFC]/10 transition-all text-left group"
                    >
                      {/* Image or Icon */}
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: config.bg }}
                        >
                          {result.type === 'specialty' && <Stethoscope className="w-6 h-6" style={{ color: config.color }} />}
                          {result.type === 'condition' && <Thermometer className="w-6 h-6" style={{ color: config.color }} />}
                          {result.type === 'lab' && <FlaskConical className="w-6 h-6" style={{ color: config.color }} />}
                          {result.type === 'pharmacy' && <Pill className="w-6 h-6" style={{ color: config.color }} />}
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-[#030213] truncate">{result.title}</h3>
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#64748B] truncate">{result.subtitle}</p>
                        {result.meta && (
                          <p className="text-xs text-[#94A3B8] mt-1">{result.meta}</p>
                        )}
                      </div>

                      {/* Right side */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        {result.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                            <span className="text-sm font-medium text-[#030213]">{result.rating}</span>
                          </div>
                        )}
                        {result.fee && (
                          <span className="font-semibold text-[#030213]">₹{result.fee}</span>
                        )}
                        <ArrowRight className="w-5 h-5 text-[#CBD5E1] group-hover:text-[#007EFC] transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}