import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Support returnTo query param for booking flow redirect
  const searchParams = new URLSearchParams(window.location.search);
  const returnTo = searchParams.get('returnTo');

  const [usePhone, setUsePhone] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    otp: '',
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendOTP = () => {
    if (!formData.emailOrPhone) {
      alert('Please enter your email or phone number');
      return;
    }
    console.log('Sending OTP to:', formData.emailOrPhone);
    setOtpSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login
    const mockUser = {
      id: '1',
      name: 'Sarah Johnson',
      email: formData.emailOrPhone.includes('@') ? formData.emailOrPhone : 'user@example.com',
      phone: !formData.emailOrPhone.includes('@') ? formData.emailOrPhone : undefined,
    };
    
    login(mockUser);
    navigate(returnTo || '/dashboard');
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
              Your Health Journey Starts Here
            </h1>
            <p className="text-white/90 text-lg">
              Access quality healthcare from the comfort of your home. Connect with top doctors, book lab tests, and manage your health all in one place.
            </p>
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-12 text-white/90">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm">Expert Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#030213] mb-2">Welcome back</h2>
            <p className="text-[#64748B]">Please enter your details to sign in</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Phone Input */}
            <div>
              <label className="block text-sm font-medium text-[#030213] mb-2">
                Email or Phone Number
              </label>
              <div className="relative">
                {usePhone ? (
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                ) : (
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                )}
                <input
                  type="text"
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

            {/* Password or OTP Section */}
            {!useOTP ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#030213]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setUseOTP(true)}
                    className="text-sm text-[#007EFC] hover:underline"
                  >
                    Login with OTP
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#030213]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <button
                    type="button"
                    className="text-sm text-[#007EFC] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#030213]">
                    One-Time Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setUseOTP(false);
                      setOtpSent(false);
                    }}
                    className="text-sm text-[#007EFC] hover:underline"
                  >
                    Use password instead
                  </button>
                </div>
                
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full py-3.5 bg-[#007EFC] text-white rounded-xl font-semibold hover:bg-[#0066CC] transition-colors"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
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
                      <span className="text-sm text-[#64748B]">Didn't receive code?</span>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="text-sm text-[#007EFC] hover:underline font-medium"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            {(!useOTP || otpSent) && (
              <button
                type="submit"
                className="w-full py-3.5 bg-[#007EFC] text-white rounded-xl font-semibold hover:bg-[#0066CC] transition-all hover:shadow-lg mt-6"
              >
                Sign In
              </button>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#F8FAFC] text-[#64748B]">New to HealthCare+?</span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => navigate('/register')}
            className="w-full py-3.5 bg-white text-[#030213] rounded-xl font-semibold hover:bg-[#F8FAFC] transition-colors border-2 border-[#E2E8F0]"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}