import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { useBooking } from '../context/BookingContext';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Video,
  Shield,
  CheckCircle,
  CreditCard,
  FileText,
  Heart,
  AlertCircle,
  Pill,
  Stethoscope,
  Lock,
  Sparkles,
  Home,
  Star,
} from 'lucide-react';

type Step = 'health-details' | 'payment' | 'confirmation';

export function BookingPage() {
  const navigate = useNavigate();
  const { booking, setHealthDetails, completePayment, resetBooking } = useBooking();
  const [currentStep, setCurrentStep] = useState<Step>('health-details');
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    symptoms: '',
    duration: '',
    severity: 'moderate',
    medications: '',
    allergies: '',
    additionalNotes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');

  const doctor = booking.doctor;

  // If no doctor selected, redirect
  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#030213] mb-3">No Booking in Progress</h1>
          <p className="text-[#64748B] mb-8">Please select a doctor and time slot first.</p>
          <button
            onClick={() => navigate('/consultations')}
            className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'health-details' as Step, label: 'Health Details', icon: FileText },
    { id: 'payment' as Step, label: 'Payment', icon: CreditCard },
    { id: 'confirmation' as Step, label: 'Confirmed', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleHealthSubmit = () => {
    if (!formData.symptoms.trim()) return;
    setHealthDetails(formData);
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      completePayment();
      setProcessing(false);
      setCurrentStep('confirmation');
      window.scrollTo(0, 0);
    }, 2000);
  };

  const handleGoToDashboard = () => {
    resetBooking();
    navigate('/my-appointments');
  };

  const handleGoHome = () => {
    resetBooking();
    navigate('/');
  };

  const platformFee = 29;
  const totalAmount = doctor.consultationFee + platformFee;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        {currentStep !== 'confirmation' && (
          <div className="flex items-center justify-center gap-0 mb-10">
            {steps.map((step, index) => {
              const isActive = currentStepIndex === index;
              const isComplete = currentStepIndex > index;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isComplete
                          ? 'bg-[#10B981] text-white'
                          : isActive
                          ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                          : 'bg-[#E2E8F0] text-[#94A3B8]'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block ${
                        isActive ? 'text-[#030213]' : 'text-[#94A3B8]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 ${
                        isComplete ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Doctor Summary Bar */}
        {currentStep !== 'confirmation' && (
          <div className="bg-white rounded-2xl p-4 border border-[rgba(0,0,0,0.06)] mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#030213]">{doctor.name}</h3>
              <p className="text-sm text-[#007EFC]">{doctor.specialty}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#007EFC]" />
                <span>{booking.selectedDayLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#007EFC]" />
                <span>{booking.selectedTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#10B981]" />
                <span>Video</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Health Details Form */}
        {currentStep === 'health-details' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#007EFC]/10 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-[#007EFC]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#030213]">Health Details</h2>
                    <p className="text-sm text-[#64748B]">
                      Help the doctor prepare for your consultation
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Symptoms */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#030213] mb-2">
                      <Heart className="w-4 h-4 text-[#007EFC]" />
                      What symptoms are you experiencing? *
                    </label>
                    <textarea
                      value={formData.symptoms}
                      onChange={(e) =>
                        setFormData({ ...formData, symptoms: e.target.value })
                      }
                      placeholder="Describe your symptoms in detail (e.g., headache, fever, chest pain...)"
                      rows={4}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] resize-none"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#030213] mb-2">
                      <Clock className="w-4 h-4 text-[#007EFC]" />
                      How long have you had these symptoms?
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] appearance-none"
                    >
                      <option value="">Select duration</option>
                      <option value="today">Started today</option>
                      <option value="2-3 days">2-3 days</option>
                      <option value="1 week">About a week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">About a month</option>
                      <option value="more">More than a month</option>
                    </select>
                  </div>

                  {/* Severity */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#030213] mb-3">
                      <AlertCircle className="w-4 h-4 text-[#007EFC]" />
                      How severe are the symptoms?
                    </label>
                    <div className="flex gap-3">
                      {[
                        { value: 'mild', label: 'Mild', color: '#10B981' },
                        { value: 'moderate', label: 'Moderate', color: '#F59E0B' },
                        { value: 'severe', label: 'Severe', color: '#EF4444' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, severity: option.value })
                          }
                          className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                            formData.severity === option.value
                              ? `bg-[${option.color}]/10 border-2 border-[${option.color}] text-[${option.color}]`
                              : 'bg-[#F8FAFC] border-2 border-[#E2E8F0] text-[#64748B] hover:bg-[#E2E8F0]'
                          }`}
                          style={
                            formData.severity === option.value
                              ? {
                                  backgroundColor: `${option.color}15`,
                                  borderColor: option.color,
                                  color: option.color,
                                }
                              : {}
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#030213] mb-2">
                      <Pill className="w-4 h-4 text-[#007EFC]" />
                      Current medications (if any)
                    </label>
                    <input
                      type="text"
                      value={formData.medications}
                      onChange={(e) =>
                        setFormData({ ...formData, medications: e.target.value })
                      }
                      placeholder="List any medications you're currently taking"
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                    />
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#030213] mb-2">
                      <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                      Known allergies
                    </label>
                    <input
                      type="text"
                      value={formData.allergies}
                      onChange={(e) =>
                        setFormData({ ...formData, allergies: e.target.value })
                      }
                      placeholder="Any drug or food allergies"
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#030213] mb-2">
                      <FileText className="w-4 h-4 text-[#007EFC]" />
                      Additional notes for the doctor
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        setFormData({ ...formData, additionalNotes: e.target.value })
                      }
                      placeholder="Any additional information you'd like the doctor to know"
                      rows={3}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-5 py-3 text-[#64748B] hover:text-[#030213] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleHealthSubmit}
                    disabled={!formData.symptoms.trim()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                      formData.symptoms.trim()
                        ? 'bg-[#007EFC] text-white hover:bg-[#0066DD] shadow-lg shadow-[#007EFC]/25'
                        : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-[#10B981]" />
                  <h3 className="font-semibold text-[#030213]">Your Privacy</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Information shared only with your doctor',
                    'End-to-end encrypted data',
                    'HIPAA compliant storage',
                    'You control your health data',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#64748B]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 'payment' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#007EFC]/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#007EFC]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#030213]">Payment</h2>
                    <p className="text-sm text-[#64748B]">
                      Complete payment to confirm your appointment
                    </p>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3 mb-8">
                  <h3 className="text-sm font-medium text-[#030213]">Select Payment Method</h3>
                  {[
                    {
                      id: 'card' as const,
                      label: 'Credit / Debit Card',
                      desc: 'Visa, Mastercard, RuPay',
                      icon: '💳',
                    },
                    {
                      id: 'upi' as const,
                      label: 'UPI',
                      desc: 'Google Pay, PhonePe, Paytm',
                      icon: '📱',
                    },
                    {
                      id: 'wallet' as const,
                      label: 'Digital Wallet',
                      desc: 'Paytm, Amazon Pay',
                      icon: '👛',
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        paymentMethod === method.id
                          ? 'border-[#007EFC] bg-[#007EFC]/5'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-[#030213]">{method.label}</div>
                        <div className="text-xs text-[#64748B]">{method.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id
                            ? 'border-[#007EFC]'
                            : 'border-[#CBD5E1]'
                        }`}
                      >
                        {paymentMethod === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#007EFC]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Card Details (mock) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-8 p-6 bg-[#F8FAFC] rounded-xl">
                    <div>
                      <label className="text-sm font-medium text-[#030213] mb-1.5 block">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#030213] mb-1.5 block">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#030213] mb-1.5 block">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#030213] mb-1.5 block">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="mb-8 p-6 bg-[#F8FAFC] rounded-xl">
                    <label className="text-sm font-medium text-[#030213] mb-1.5 block">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                    />
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="mb-8 p-6 bg-[#F8FAFC] rounded-xl text-center">
                    <p className="text-sm text-[#64748B]">
                      You will be redirected to your wallet provider to complete the payment.
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-[rgba(0,0,0,0.06)]">
                  <button
                    onClick={() => setCurrentStep('health-details')}
                    className="flex items-center gap-2 px-5 py-3 text-[#64748B] hover:text-[#030213] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-all shadow-lg shadow-[#10B981]/25 disabled:opacity-50"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay ₹{totalAmount}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[24px] p-6 border border-[rgba(0,0,0,0.06)] sticky top-24">
                <h3 className="font-semibold text-[#030213] mb-4">Order Summary</h3>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Consultation Fee</span>
                    <span className="font-medium text-[#030213]">
                      ₹{doctor.consultationFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Platform Fee</span>
                    <span className="font-medium text-[#030213]">₹{platformFee}</span>
                  </div>
                  <div className="border-t border-[rgba(0,0,0,0.06)] pt-3 flex justify-between">
                    <span className="font-semibold text-[#030213]">Total</span>
                    <span className="font-bold text-[#030213] text-lg">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-[#F0FDF4] rounded-xl">
                  {['Secure payment gateway', 'Full refund on cancellation*', 'Instant confirmation'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-xs text-[#64748B]">{item}</span>
                      </div>
                    )
                  )}
                </div>

                <p className="text-xs text-[#94A3B8] mt-3">
                  *Free cancellation up to 2 hours before the scheduled time
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation / Thank You */}
        {currentStep === 'confirmation' && (
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#10B981]/30">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#030213] mb-3">
                Appointment Confirmed!
              </h1>
              <p className="text-lg text-[#64748B]">
                Your consultation has been successfully booked
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)] text-left mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#007EFC]" />
                <span className="text-sm font-medium text-[#007EFC]">
                  Booking ID: {booking.bookingId}
                </span>
              </div>

              <div className="flex items-center gap-5 mb-6 pb-6 border-b border-[rgba(0,0,0,0.06)]">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[#030213]">{doctor.name}</h3>
                  <p className="text-sm text-[#007EFC]">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-xs text-[#64748B]">{doctor.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#007EFC]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B]">Date</div>
                    <div className="font-medium text-[#030213]">{booking.selectedDayLabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#007EFC]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B]">Time</div>
                    <div className="font-medium text-[#030213]">{booking.selectedTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F0FDF4] rounded-xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B]">Type</div>
                    <div className="font-medium text-[#030213]">Video Consultation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B]">Amount Paid</div>
                    <div className="font-medium text-[#030213]">₹{totalAmount}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#F0F9FF] rounded-2xl p-5 mb-8 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#007EFC] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-[#64748B]">
                  <p className="font-medium text-[#030213] mb-1">What's next?</p>
                  <ul className="space-y-1">
                    <li>• You'll receive a confirmation email with meeting details</li>
                    <li>• Join the video call at the scheduled time from your dashboard</li>
                    <li>• Keep your health details ready for the consultation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGoToDashboard}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#007EFC] text-white rounded-2xl font-semibold hover:bg-[#0066DD] transition-all shadow-lg shadow-[#007EFC]/25"
              >
                <Calendar className="w-5 h-5" />
                View My Appointments
              </button>
              <button
                onClick={handleGoHome}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#030213] rounded-2xl font-semibold hover:bg-[#F8FAFC] transition-all border-2 border-[#E2E8F0]"
              >
                <Home className="w-5 h-5" />
                Go to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
