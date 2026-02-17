import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const clearError = (f: string) => setErrors((p) => { const n = { ...p }; delete n[f]; return n; });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!formData.name.trim()) er.name = 'Name is required';
    if (!formData.email.trim()) er.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) er.email = 'Enter a valid email';
    if (formData.phone && !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, '')))
      er.phone = 'Enter a valid phone number';
    if (!formData.subject) er.subject = 'Please select a subject';
    if (!formData.message.trim()) er.message = 'Message is required';
    else if (formData.message.trim().length < 10) er.message = 'Message must be at least 10 characters';
    if (Object.keys(er).length) { setErrors(er); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative bg-gradient-to-br from-[#007EFC] to-[#0066DD] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#030213] mb-8">Contact Information</h2>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0"><Phone className="w-6 h-6 text-[#007EFC]" /></div>
                  <div><h3 className="font-semibold text-[#030213] mb-1">Phone</h3><p className="text-[#64748B]">1800-123-4567 (Toll Free)</p><p className="text-[#64748B]">+91 98765 43210</p><p className="text-sm text-[#64748B] mt-1">Mon-Sun: 24/7 Available</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0"><Mail className="w-6 h-6 text-[#007EFC]" /></div>
                  <div><h3 className="font-semibold text-[#030213] mb-1">Email</h3><p className="text-[#64748B]">support@healthcareplus.com</p><p className="text-[#64748B]">info@healthcareplus.com</p><p className="text-sm text-[#64748B] mt-1">We'll respond within 24 hours</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-[#007EFC]" /></div>
                  <div><h3 className="font-semibold text-[#030213] mb-1">Office</h3><p className="text-[#64748B]">HealthCare+ Headquarters<br />123 Medical Plaza, Andheri East<br />Mumbai, Maharashtra 400069<br />India</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0"><Clock className="w-6 h-6 text-[#007EFC]" /></div>
                  <div><h3 className="font-semibold text-[#030213] mb-1">Business Hours</h3><p className="text-[#64748B]">Customer Support: 24/7<br />Office Hours: Mon-Fri, 9:00 AM - 6:00 PM<br />Emergency Support: Always Available</p></div>
                </div>
              </div>
              <div className="bg-[#F8FAFC] rounded-2xl p-6">
                <h3 className="font-semibold text-[#030213] mb-4">Quick Support</h3>
                <div className="space-y-3">
                  <a href="/help-center" className="flex items-center gap-2 text-[#007EFC] hover:underline"><MessageSquare className="w-4 h-4" />Visit Help Center</a>
                  <a href="/emergency-care" className="flex items-center gap-2 text-[#EF4444] hover:underline"><Phone className="w-4 h-4" />Emergency Contact</a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#10B981]/30"><CheckCircle className="w-8 h-8 text-white" /></div>
                    <h3 className="text-2xl font-bold text-[#030213] mb-2">Message Sent!</h3>
                    <p className="text-[#64748B] mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium">Send Another Message</button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-[#030213] mb-2">Send us a Message</h2>
                    <p className="text-[#64748B] mb-8">Fill out the form below and we'll get back to you shortly.</p>
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      <div>
                        <label className="block text-sm font-semibold text-[#030213] mb-2">Full Name *</label>
                        <input type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError('name'); }} className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-colors ${errors.name ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#007EFC]'}`} placeholder="John Doe" />
                        {errors.name && <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#030213] mb-2">Email Address *</label>
                        <input type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError('email'); }} className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-colors ${errors.email ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#007EFC]'}`} placeholder="john@example.com" />
                        {errors.email && <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#030213] mb-2">Phone Number</label>
                        <input type="tel" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); clearError('phone'); }} className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-colors ${errors.phone ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#007EFC]'}`} placeholder="+91 98765 43210" />
                        {errors.phone && <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#030213] mb-2">Subject *</label>
                        <select value={formData.subject} onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); clearError('subject'); }} className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-colors ${errors.subject ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#007EFC]'}`}>
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="consultation">Consultation Support</option>
                          <option value="labs">Lab Tests</option>
                          <option value="pharmacy">Pharmacy Orders</option>
                          <option value="technical">Technical Issue</option>
                          <option value="feedback">Feedback</option>
                        </select>
                        {errors.subject && <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#030213] mb-2">Message *</label>
                        <textarea value={formData.message} onChange={(e) => { setFormData({ ...formData, message: e.target.value }); clearError('message'); }} rows={5} className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-colors resize-none ${errors.message ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E2E8F0] focus:border-[#007EFC]'}`} placeholder="Tell us how we can help you..."></textarea>
                        {errors.message && <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                      </div>
                      <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"><Send className="w-5 h-5" />Send Message</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
