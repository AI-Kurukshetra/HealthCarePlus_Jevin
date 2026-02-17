import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { mockAppointments, generateSlots } from '../data/doctors';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Sun,
  Sunset,
  Moon,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Shield,
} from 'lucide-react';

export function ReschedulePage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const appointment = mockAppointments.find((a) => a.id === appointmentId);
  const slots = useMemo(() => generateSlots(), []);

  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRescheduled, setIsRescheduled] = useState(false);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#030213] mb-3">Appointment Not Found</h1>
          <p className="text-[#64748B] mb-8">
            We couldn't find the appointment you're trying to reschedule.
          </p>
          <button
            onClick={() => navigate('/my-appointments')}
            className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
          >
            Back to Appointments
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const doctor = appointment.doctor;

  const selectedDay = selectedDayIndex !== null ? slots[selectedDayIndex] : null;
  const morningSlots = selectedDay
    ? selectedDay.slots.filter((s) => s.time.includes('AM'))
    : [];
  const afternoonSlots = selectedDay
    ? selectedDay.slots.filter((s) => {
        const hour = parseInt(s.time);
        return s.time.includes('PM') && hour >= 2 && hour < 6;
      })
    : [];
  const eveningSlots = selectedDay
    ? selectedDay.slots.filter((s) => {
        const hour = parseInt(s.time);
        return s.time.includes('PM') && (hour >= 6 || hour === 12);
      })
    : [];

  const currentFormattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleConfirmReschedule = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setIsRescheduled(true);
    }, 1500);
  };

  // Success Screen
  if (isRescheduled && selectedDay) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#10B981]/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#030213] mb-3">
            Appointment Rescheduled!
          </h1>
          <p className="text-[#64748B] mb-8">
            Your consultation has been successfully moved to the new time.
          </p>

          <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] text-left mb-8">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[rgba(0,0,0,0.06)]">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-[#030213]">{doctor.name}</h3>
                <p className="text-sm text-[#007EFC]">{doctor.specialty}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-[#64748B] block mb-1">Previous Schedule</span>
                <div className="flex items-center gap-2 text-sm text-[#94A3B8] line-through">
                  <Calendar className="w-4 h-4" />
                  <span>{currentFormattedDate} at {appointment.time}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-[#10B981] font-medium block mb-1">
                  New Schedule
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-[#030213] font-medium">
                    <Calendar className="w-4 h-4 text-[#10B981]" />
                    <span>{selectedDay.dayLabel} ({selectedDay.dayOfWeek})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#030213] font-medium">
                    <Clock className="w-4 h-4 text-[#10B981]" />
                    <span>{selectedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F0F9FF] rounded-xl p-4 mb-8 text-left">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#007EFC] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#64748B]">
                A confirmation has been sent to your email and phone. You can join the video call from your appointments page at the new scheduled time.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/my-appointments')}
              className="flex-1 px-6 py-3.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
            >
              View Appointments
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3.5 bg-white text-[#030213] rounded-xl font-medium hover:bg-[#F8FAFC] transition-colors border-2 border-[#E2E8F0]"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Back Nav */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/my-appointments')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#030213] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Appointments</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#030213] mb-2">Reschedule Appointment</h1>
          <p className="text-[#64748B]">
            Choose a new date and time for your consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Date & Time Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Appointment */}
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
              <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
                Current Appointment
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#030213]">{doctor.name}</h4>
                  <p className="text-sm text-[#007EFC]">{doctor.specialty}</p>
                </div>
                <div className="text-right text-sm">
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Calendar className="w-4 h-4" />
                    <span>{currentFormattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B] mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* New Date Selection */}
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
              <h3 className="font-semibold text-[#030213] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#007EFC]" />
                Select New Date
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {slots.map((day, index) => {
                  const availableCount = day.slots.filter((s) => s.available).length;
                  return (
                    <button
                      key={day.date}
                      onClick={() => {
                        setSelectedDayIndex(index);
                        setSelectedTime(null);
                      }}
                      className={`p-3 rounded-xl text-center transition-all border-2 ${
                        selectedDayIndex === index
                          ? 'border-[#007EFC] bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                          : 'border-[#E2E8F0] bg-white hover:border-[#007EFC]/30 hover:bg-[#F0F9FF]'
                      }`}
                    >
                      <div className={`text-xs ${selectedDayIndex === index ? 'text-white/80' : 'text-[#94A3B8]'}`}>
                        {day.dayOfWeek}
                      </div>
                      <div className="font-semibold text-sm mt-0.5">{day.dayLabel}</div>
                      <div className={`text-[10px] mt-1 ${selectedDayIndex === index ? 'text-white/70' : 'text-[#10B981]'}`}>
                        {availableCount} slots
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDay && (
              <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
                <h3 className="font-semibold text-[#030213] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#007EFC]" />
                  Select New Time — {selectedDay.dayLabel} ({selectedDay.dayOfWeek})
                </h3>

                {/* Morning */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-sm text-[#64748B] mb-3">
                    <Sun className="w-4 h-4 text-[#F59E0B]" />
                    <span className="font-medium">Morning</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          !slot.available
                            ? 'bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through'
                            : selectedTime === slot.time
                            ? 'bg-[#007EFC] text-white shadow-md shadow-[#007EFC]/25'
                            : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#030213]'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-sm text-[#64748B] mb-3">
                    <Sunset className="w-4 h-4 text-[#F97316]" />
                    <span className="font-medium">Afternoon</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          !slot.available
                            ? 'bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through'
                            : selectedTime === slot.time
                            ? 'bg-[#007EFC] text-white shadow-md shadow-[#007EFC]/25'
                            : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#030213]'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#64748B] mb-3">
                    <Moon className="w-4 h-4 text-[#6366F1]" />
                    <span className="font-medium">Evening</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {eveningSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          !slot.available
                            ? 'bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through'
                            : selectedTime === slot.time
                            ? 'bg-[#007EFC] text-white shadow-md shadow-[#007EFC]/25'
                            : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#030213]'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reason */}
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
              <h3 className="font-semibold text-[#030213] mb-3">
                Reason for rescheduling{' '}
                <span className="text-[#94A3B8] font-normal text-sm">(optional)</span>
              </h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Let us know why you're rescheduling (e.g., schedule conflict, personal reason...)"
                rows={3}
                className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] resize-none"
              />
            </div>
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] sticky top-24">
              <h3 className="font-semibold text-[#030213] mb-5">Reschedule Summary</h3>

              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[rgba(0,0,0,0.06)]">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-medium text-[#030213] text-sm">{doctor.name}</h4>
                  <p className="text-xs text-[#007EFC]">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-xs text-[#64748B]">{doctor.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-xs text-[#94A3B8] uppercase tracking-wide">
                    Original
                  </span>
                  <div className="flex items-center gap-2 text-sm text-[#64748B] mt-1 line-through">
                    <span>{currentFormattedDate.split(',').slice(0, 2).join(',')}</span>
                    <span>·</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {selectedDay && selectedTime ? (
                  <div>
                    <span className="text-xs text-[#10B981] uppercase tracking-wide font-medium">
                      New Schedule
                    </span>
                    <div className="flex items-center gap-2 text-sm text-[#030213] font-medium mt-1">
                      <Calendar className="w-4 h-4 text-[#10B981]" />
                      <span>{selectedDay.dayLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#030213] font-medium mt-1">
                      <Clock className="w-4 h-4 text-[#10B981]" />
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#030213] mt-1">
                      <Video className="w-4 h-4 text-[#10B981]" />
                      <span>Video Call</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#F8FAFC] rounded-xl">
                    <p className="text-sm text-[#94A3B8] text-center">
                      Select a new date and time
                    </p>
                  </div>
                )}
              </div>

              {/* Policy Note */}
              <div className="bg-[#F0F9FF] rounded-xl p-3 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#007EFC] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#64748B]">
                    Free reschedule up to 2 hours before the appointment. No additional charges apply.
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirmReschedule}
                disabled={!selectedDay || !selectedTime || isConfirming}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  selectedDay && selectedTime && !isConfirming
                    ? 'bg-[#007EFC] text-white hover:bg-[#0066DD] shadow-lg shadow-[#007EFC]/25'
                    : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                }`}
              >
                {isConfirming ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Rescheduling...
                  </>
                ) : (
                  <>
                    Confirm Reschedule
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 justify-center mt-4">
                <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-xs text-[#64748B]">No extra charges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
