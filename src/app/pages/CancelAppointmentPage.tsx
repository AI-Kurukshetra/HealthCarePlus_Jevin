import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { mockAppointments } from '../data/doctors';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  ArrowRight,
  Shield,
  AlertTriangle,
  CreditCard,
} from 'lucide-react';

const cancellationReasons = [
  {
    id: 'feeling-better',
    label: "I'm feeling better now",
    description: "The health issue I booked for has improved",
  },
  {
    id: 'found-another',
    label: 'Found another doctor',
    description: 'I want to consult a different specialist',
  },
  {
    id: 'schedule-conflict',
    label: 'Schedule conflict',
    description: "I have a prior commitment at the scheduled time",
  },
  {
    id: 'cost-concerns',
    label: 'Cost concerns',
    description: 'The consultation fee is higher than expected',
  },
  {
    id: 'technical-issues',
    label: 'Technical issues with the platform',
    description: 'Having trouble with video call or app functionality',
  },
  {
    id: 'personal-emergency',
    label: 'Personal or family emergency',
    description: 'An unexpected emergency came up',
  },
  {
    id: 'other',
    label: 'Other reason',
    description: 'Please specify below',
  },
];

export function CancelAppointmentPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const appointment = mockAppointments.find((a) => a.id === appointmentId);

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');
  const [step, setStep] = useState<'reason' | 'confirm' | 'done'>('reason');
  const [isCancelling, setIsCancelling] = useState(false);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#030213] mb-3">Appointment Not Found</h1>
          <p className="text-[#64748B] mb-8">
            We couldn't find the appointment you're trying to cancel.
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

  const currentFormattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const toggleReason = (id: string) => {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const canProceed =
    selectedReasons.length > 0 &&
    (!selectedReasons.includes('other') || customReason.trim().length > 0);

  const handleConfirmCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setIsCancelling(false);
      setStep('done');
    }, 1500);
  };

  // Success Screen
  if (step === 'done') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-[#EF4444]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-[#EF4444]" />
          </div>
          <h1 className="text-3xl font-bold text-[#030213] mb-3">Appointment Cancelled</h1>
          <p className="text-[#64748B] mb-8">
            Your consultation has been successfully cancelled.
          </p>

          <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] text-left mb-6">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[rgba(0,0,0,0.06)]">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[#030213]">{doctor.name}</h3>
                <p className="text-sm text-[#007EFC]">{doctor.specialty}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FEF2F2] text-[#EF4444] rounded-lg text-xs font-medium">
                <XCircle className="w-3.5 h-3.5" />
                Cancelled
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Original Date</span>
                <span className="text-[#030213]">{currentFormattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Original Time</span>
                <span className="text-[#030213]">{appointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Booking ID</span>
                <span className="text-[#030213] font-mono text-xs">{appointment.id}</span>
              </div>
            </div>
          </div>

          {/* Refund Info */}
          <div className="bg-[#F0FDF4] rounded-2xl p-5 mb-8 text-left">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-[#030213] text-sm mb-1">Refund Initiated</p>
                <p className="text-sm text-[#64748B]">
                  ₹{appointment.paymentAmount} will be refunded to your original payment method within 5-7 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/my-appointments')}
              className="flex-1 px-6 py-3.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
            >
              My Appointments
            </button>
            <button
              onClick={() => navigate('/consultations')}
              className="flex-1 px-6 py-3.5 bg-white text-[#030213] rounded-xl font-medium hover:bg-[#F8FAFC] transition-colors border-2 border-[#E2E8F0]"
            >
              Book Another
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
          <h1 className="text-3xl font-bold text-[#030213] mb-2">Cancel Appointment</h1>
          <p className="text-[#64748B]">
            We're sorry to see you go. Please let us know why you're cancelling.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Reason Selection / Confirmation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Summary */}
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
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

            {step === 'reason' && (
              <>
                {/* Cancellation Reasons */}
                <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
                  <h3 className="font-semibold text-[#030213] mb-1">
                    Why are you cancelling?
                  </h3>
                  <p className="text-sm text-[#64748B] mb-5">
                    Select all that apply to help us improve our service
                  </p>

                  <div className="space-y-3">
                    {cancellationReasons.map((reason) => {
                      const isSelected = selectedReasons.includes(reason.id);
                      return (
                        <button
                          key={reason.id}
                          onClick={() => toggleReason(reason.id)}
                          className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? 'border-[#EF4444] bg-[#FEF2F2]'
                              : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                              isSelected
                                ? 'border-[#EF4444] bg-[#EF4444]'
                                : 'border-[#CBD5E1]'
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span
                              className={`font-medium block ${
                                isSelected ? 'text-[#030213]' : 'text-[#030213]'
                              }`}
                            >
                              {reason.label}
                            </span>
                            <span className="text-xs text-[#94A3B8] mt-0.5 block">
                              {reason.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Reason Input */}
                {selectedReasons.includes('other') && (
                  <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
                    <h3 className="font-semibold text-[#030213] mb-3">
                      Please specify your reason *
                    </h3>
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Tell us more about why you're cancelling this appointment..."
                      rows={4}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#EF4444]/50 transition-colors text-[#030213] resize-none"
                    />
                    <p className="text-xs text-[#94A3B8] mt-2">
                      This feedback helps us serve you better in the future.
                    </p>
                  </div>
                )}

                {/* Additional Feedback */}
                {selectedReasons.length > 0 && !selectedReasons.includes('other') && (
                  <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)]">
                    <h3 className="font-semibold text-[#030213] mb-3">
                      Anything else you'd like to share?{' '}
                      <span className="text-[#94A3B8] font-normal text-sm">(optional)</span>
                    </h3>
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Any additional feedback or concerns..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] resize-none"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className="flex items-center gap-2 px-5 py-3 text-[#64748B] hover:text-[#030213] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Keep Appointment
                  </button>
                  <button
                    onClick={() => {
                      setStep('confirm');
                      window.scrollTo(0, 0);
                    }}
                    disabled={!canProceed}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                      canProceed
                        ? 'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-lg shadow-[#EF4444]/25'
                        : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    Continue to Cancel
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {step === 'confirm' && (
              <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
                {/* Warning Banner */}
                <div className="bg-[#FEF3C7] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#030213] text-sm">
                        Are you sure you want to cancel?
                      </p>
                      <p className="text-sm text-[#64748B] mt-1">
                        This action cannot be undone. You may need to rebook and may get a different time slot.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary of what's being cancelled */}
                <h3 className="font-semibold text-[#030213] mb-4">Cancellation Details</h3>

                <div className="bg-[#F8FAFC] rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Doctor</span>
                    <span className="font-medium text-[#030213]">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Specialty</span>
                    <span className="text-[#030213]">{doctor.specialty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Date</span>
                    <span className="text-[#030213]">{currentFormattedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Time</span>
                    <span className="text-[#030213]">{appointment.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Booking ID</span>
                    <span className="text-[#030213] font-mono text-xs">{appointment.id}</span>
                  </div>
                  <div className="border-t border-[rgba(0,0,0,0.06)] pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">Amount Paid</span>
                      <span className="font-semibold text-[#030213]">₹{appointment.paymentAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Reasons selected */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#030213] mb-2">
                    Reason(s) for cancellation
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReasons.map((id) => {
                      const r = cancellationReasons.find((cr) => cr.id === id);
                      return r ? (
                        <span
                          key={id}
                          className="px-3 py-1.5 bg-[#FEF2F2] text-[#EF4444] text-xs font-medium rounded-lg"
                        >
                          {r.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                  {customReason && (
                    <p className="text-sm text-[#64748B] mt-2 bg-[#F8FAFC] rounded-lg p-3">
                      "{customReason}"
                    </p>
                  )}
                </div>

                {/* Refund Policy */}
                <div className="bg-[#F0FDF4] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#030213] text-sm">Refund Policy</p>
                      <p className="text-sm text-[#64748B] mt-1">
                        Cancellations made more than 2 hours before the scheduled time are eligible for a full refund.
                        The refund of <span className="font-semibold text-[#10B981]">₹{appointment.paymentAmount}</span> will
                        be processed within 5-7 business days to your original payment method.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alternative suggestion */}
                <div className="bg-[#F0F9FF] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#007EFC] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#030213] text-sm">Consider rescheduling instead?</p>
                      <p className="text-sm text-[#64748B] mt-1">
                        If the timing doesn't work, you can reschedule to a different slot at no extra cost.
                      </p>
                      <button
                        onClick={() => navigate(`/reschedule/${appointment.id}`)}
                        className="text-[#007EFC] text-sm font-medium mt-2 hover:underline inline-flex items-center gap-1"
                      >
                        Reschedule instead
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,0,0,0.06)]">
                  <button
                    onClick={() => setStep('reason')}
                    className="flex items-center gap-2 px-5 py-3 text-[#64748B] hover:text-[#030213] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    disabled={isCancelling}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#EF4444] text-white rounded-xl font-semibold hover:bg-[#DC2626] transition-all shadow-lg shadow-[#EF4444]/25 disabled:opacity-50"
                  >
                    {isCancelling ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        Confirm Cancellation
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] sticky top-24">
              <h3 className="font-semibold text-[#030213] mb-4">Appointment Details</h3>

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

              <div className="space-y-3 mb-5 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#007EFC]" />
                  <span className="text-[#030213]">{currentFormattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#007EFC]" />
                  <span className="text-[#030213]">{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#030213]">Video Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#64748B]" />
                  <span className="text-[#030213]">₹{appointment.paymentAmount} paid</span>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-[#FEF3C7] rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-[#030213]">Cancellation Policy</p>
                    <ul className="text-xs text-[#64748B] mt-1 space-y-1">
                      <li>• Free cancellation up to 2 hours before</li>
                      <li>• Refund processed in 5-7 business days</li>
                      <li>• Late cancellations may incur a 10% fee</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="mt-4 p-4 bg-[#F0F9FF] rounded-xl">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#007EFC] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-[#030213]">Need help?</p>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Contact support at{' '}
                      <span className="text-[#007EFC]">1800-123-4567</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
