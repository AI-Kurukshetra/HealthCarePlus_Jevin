import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { doctors, generateSlots } from '../data/doctors';
import {
  Star,
  Clock,
  MapPin,
  Video,
  Shield,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Sun,
  Sunset,
  Moon,
  ThumbsUp,
  MessageSquare,
  GraduationCap,
  Building2,
  Globe,
} from 'lucide-react';

export function DoctorProfilePage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setDoctor, setSlot } = useBooking();

  const doctor = doctors.find((d) => d.id === Number(doctorId));
  const slots = useMemo(() => generateSlots(), []);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#030213] mb-4">Doctor Not Found</h1>
          <p className="text-[#64748B] mb-8">The doctor you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/consultations')}
            className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
          >
            Browse Doctors
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedDay = slots[selectedDayIndex];
  const morningSlots = selectedDay.slots.filter((s) => s.time.includes('AM'));
  const afternoonSlots = selectedDay.slots.filter((s) => {
    const hour = parseInt(s.time);
    return s.time.includes('PM') && hour >= 2 && hour < 6;
  });
  const eveningSlots = selectedDay.slots.filter((s) => {
    const hour = parseInt(s.time);
    return s.time.includes('PM') && (hour >= 6 || hour === 12);
  });

  const handleBookSlot = () => {
    if (!selectedTime) return;

    setDoctor(doctor);
    setSlot(selectedDay.date, selectedTime, selectedDay.dayLabel);

    if (!isAuthenticated) {
      navigate(`/login?returnTo=/booking/${doctor.id}`);
    } else {
      navigate(`/booking/${doctor.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/consultations')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#030213] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Doctors</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Card */}
            <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-[#F8FAFC]"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-[#030213] mb-1">{doctor.name}</h1>
                      <p className="text-[#007EFC] font-medium mb-1">{doctor.specialty}</p>
                      <p className="text-sm text-[#64748B]">{doctor.qualification}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FFF7ED] px-3 py-1.5 rounded-xl">
                      <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-semibold text-[#030213]">{doctor.rating}</span>
                      <span className="text-sm text-[#64748B]">({doctor.reviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#64748B]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#007EFC]" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#007EFC]" />
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#007EFC]" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {doctor.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#F8FAFC] text-xs font-medium text-[#64748B] rounded-lg"
                      >
                        <Globe className="w-3 h-3" />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-semibold text-[#030213] mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#007EFC]" />
                About the Doctor
              </h2>
              <p className="text-[#64748B] leading-relaxed">{doctor.about}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Experience', value: doctor.experience, icon: Clock },
                { label: 'Patients', value: `${(doctor.reviews * 8).toLocaleString()}+`, icon: ThumbsUp },
                { label: 'Reviews', value: doctor.reviews.toString(), icon: MessageSquare },
                { label: 'Rating', value: `${doctor.rating}/5`, icon: Star },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.06)] text-center"
                >
                  <stat.icon className="w-6 h-6 text-[#007EFC] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#030213]">{stat.value}</div>
                  <div className="text-xs text-[#64748B] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Consultation Type */}
            <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-semibold text-[#030213] mb-4">Why consult online?</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Video, title: 'HD Video Call', desc: 'Crystal clear video consultation' },
                  { icon: Shield, title: 'Private & Secure', desc: 'End-to-end encrypted' },
                  { icon: CheckCircle, title: 'Digital Prescription', desc: 'Get prescription instantly' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-[#F0F9FF] rounded-xl">
                    <item.icon className="w-5 h-5 text-[#007EFC] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-[#030213] text-sm">{item.title}</div>
                      <div className="text-xs text-[#64748B] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] sticky top-24">
              {/* Fee */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[rgba(0,0,0,0.06)]">
                <div>
                  <div className="text-sm text-[#64748B]">Consultation Fee</div>
                  <div className="text-3xl font-bold text-[#030213]">
                    ₹{doctor.consultationFee}
                  </div>
                </div>
                <div className="bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  Video
                </div>
              </div>

              {/* Date Selection */}
              <h3 className="font-semibold text-[#030213] mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#007EFC]" />
                Select Date
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
                {slots.map((day, index) => (
                  <button
                    key={day.date}
                    onClick={() => {
                      setSelectedDayIndex(index);
                      setSelectedTime(null);
                    }}
                    className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all min-w-[72px] ${
                      selectedDayIndex === index
                        ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    <div className="text-xs">{day.dayOfWeek}</div>
                    <div className="font-semibold text-sm mt-0.5">{day.dayLabel}</div>
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <h3 className="font-semibold text-[#030213] mb-3">Select Time</h3>

              {/* Morning */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2">
                  <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Morning
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                        !slot.available
                          ? 'bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-[#007EFC] text-white shadow-md'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2">
                  <Sunset className="w-3.5 h-3.5 text-[#F97316]" />
                  Afternoon
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                        !slot.available
                          ? 'bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-[#007EFC] text-white shadow-md'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening */}
              <div className="mb-6">
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2">
                  <Moon className="w-3.5 h-3.5 text-[#6366F1]" />
                  Evening
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {eveningSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                        !slot.available
                          ? 'bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-[#007EFC] text-white shadow-md'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookSlot}
                disabled={!selectedTime}
                className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                  selectedTime
                    ? 'bg-[#007EFC] text-white hover:bg-[#0066DD] shadow-lg shadow-[#007EFC]/25 hover:shadow-xl'
                    : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                }`}
              >
                {!selectedTime
                  ? 'Select a time slot'
                  : !isAuthenticated
                  ? 'Sign in & Book Appointment'
                  : `Book for ${selectedDay.dayLabel}, ${selectedTime}`}
              </button>

              {!isAuthenticated && selectedTime && (
                <p className="text-xs text-[#64748B] text-center mt-3">
                  You'll be asked to sign in before completing the booking
                </p>
              )}

              {/* Security Note */}
              <div className="flex items-center gap-2 mt-4 p-3 bg-[#F0FDF4] rounded-xl">
                <Shield className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className="text-xs text-[#64748B]">
                  100% secure & private consultation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
