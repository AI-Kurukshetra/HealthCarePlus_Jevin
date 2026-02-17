import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#007EFC] to-[#0066DD] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#030213] mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#007EFC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#030213] mb-1">Phone</h3>
                    <p className="text-[#64748B]">1800-123-4567 (Toll Free)</p>
                    <p className="text-[#64748B]">+91 98765 43210</p>
                    <p className="text-sm text-[#64748B] mt-1">Mon-Sun: 24/7 Available</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#007EFC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#030213] mb-1">Email</h3>
                    <p className="text-[#64748B]">support@healthcareplus.com</p>
                    <p className="text-[#64748B]">info@healthcareplus.com</p>
                    <p className="text-sm text-[#64748B] mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#007EFC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#030213] mb-1">Office</h3>
                    <p className="text-[#64748B]">
                      HealthCare+ Headquarters<br />
                      123 Medical Plaza, Andheri East<br />
                      Mumbai, Maharashtra 400069<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#007EFC]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#007EFC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#030213] mb-1">Business Hours</h3>
                    <p className="text-[#64748B]">
                      Customer Support: 24/7<br />
                      Office Hours: Mon-Fri, 9:00 AM - 6:00 PM<br />
                      Emergency Support: Always Available
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6">
                <h3 className="font-semibold text-[#030213] mb-4">Quick Support</h3>
                <div className="space-y-3">
                  <a href="/help-center" className="flex items-center gap-2 text-[#007EFC] hover:underline">
                    <MessageSquare className="w-4 h-4" />
                    Visit Help Center
                  </a>
                  <a href="/emergency-care" className="flex items-center gap-2 text-[#EF4444] hover:underline">
                    <Phone className="w-4 h-4" />
                    Emergency Contact
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-[#030213] mb-2">Send us a Message</h2>
                <p className="text-[#64748B] mb-8">Fill out the form below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#030213] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#030213] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#030213] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#030213] mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="consultation">Consultation Support</option>
                      <option value="labs">Lab Tests</option>
                      <option value="pharmacy">Pharmacy Orders</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#030213] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
