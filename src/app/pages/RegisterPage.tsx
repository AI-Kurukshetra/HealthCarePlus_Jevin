import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, Smartphone, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState(1);
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    otp: '',
    agreeTerms: false,
  });

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSendOTP = () => {
    if (!formData.emailOrPhone) {
      alert('Please enter your email or phone number');
      return;
    }
    console.log('Sending verification OTP to:', formData.emailOrPhone);
    setOtpSent(true);
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!formData.name || !formData.emailOrPhone) {
        alert('Please fill in all fields');
        return;
      }
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    // Mock registration
    const newUser = {
      id: '1',
      name: formData.name,
      email: formData.emailOrPhone.includes('@') ? formData.emailOrPhone : 'user@example.com',
      phone: !formData.emailOrPhone.includes('@') ? formData.emailOrPhone : undefined,
    };
    
    login(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#007EFC] to-[#0066CC] p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rounded-xl relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold">HealthCare+</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-6">
              Join 50,000+ Happy Patients
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Get instant access to top healthcare professionals and manage your health journey with confidence.
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4">
              {[
                'Connect with 500+ verified doctors',
                'Book lab tests at your doorstep',
                'Get medicines delivered in 30 minutes',
                '24/7 emergency support available'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-white/70 text-sm">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#030213] mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-[#007EFC]' : 'bg-[#E2E8F0]'}`}></div>
            <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-[#007EFC]' : 'bg-[#E2E8F0]'}`}></div>
          </div>

          {/* Form Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#030213] mb-2">
              {step === 1 ? 'Create your account' : 'Secure your account'}
            </h2>
            <p className="text-[#64748B]">
              {step === 1 ? 'Start your healthcare journey today' : 'Choose how to verify your account'}
            </p>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-[#030213] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                    required
                  />
                </div>
              </div>

              {/* Email or Phone Input */}
              <div>
                <label className="block text-sm font-medium text-[#030213] mb-2">
                  {usePhone ? 'Phone Number' : 'Email Address'}
                </label>
                <div className="relative">
                  {usePhone ? (
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  ) : (
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  )}
                  <input
                    type={usePhone ? 'tel' : 'email'}
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    placeholder={usePhone ? "+91 98765 43210" : "you@example.com"}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setUsePhone(!usePhone)}
                  className="text-sm text-[#007EFC] hover:underline mt-2"
                >
                  {usePhone ? 'Use email instead' : 'Use phone number instead'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-3.5 bg-[#007EFC] text-white rounded-xl font-semibold hover:bg-[#0066CC] transition-all hover:shadow-lg mt-2"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Password or OTP */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Choose Verification Method */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className={`py-3 rounded-xl font-medium transition-all border-2 ${
                    !otpSent
                      ? 'bg-[#007EFC] text-white border-[#007EFC]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#007EFC]'
                  }`}
                >
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </button>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className={`py-3 rounded-xl font-medium transition-all border-2 ${
                    otpSent
                      ? 'bg-[#007EFC] text-white border-[#007EFC]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#007EFC]'
                  }`}
                >
                  OTP
                </button>
              </div>

              {!otpSent ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#030213] mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Min. 8 characters"
                        className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#030213]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748B] mt-2">
                      Use at least 8 characters with a mix of letters and numbers
                    </p>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#030213] mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-3.5 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-center text-2xl tracking-[0.5em] font-semibold text-[#030213]"
                    required
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-[#64748B]">Sent to {formData.emailOrPhone}</span>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="text-sm text-[#007EFC] hover:underline font-medium"
                    >
                      Resend
                    </button>
                  </div>
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1 w-5 h-5 text-[#007EFC] border-2 border-[#E2E8F0] rounded focus:ring-2 focus:ring-[#007EFC]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-[#64748B] leading-relaxed">
                  I agree to HealthCare+'s <a href="#" className="text-[#007EFC] hover:underline">Terms of Service</a> and <a href="#" className="text-[#007EFC] hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#007EFC] text-white rounded-xl font-semibold hover:bg-[#0066CC] transition-all hover:shadow-lg"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#F8FAFC] text-[#64748B]">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3.5 bg-white text-[#030213] rounded-xl font-semibold hover:bg-[#F8FAFC] transition-colors border-2 border-[#E2E8F0]"
          >
            Sign in instead
          </button>
        </div>
      </div>
    </div>
  );
}
