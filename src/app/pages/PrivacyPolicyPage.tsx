import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Shield, Lock, Eye, FileText, Users, Database } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#007EFC] to-[#0066DD] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-white/90">
              Your privacy is our priority. Learn how we protect your personal health information.
            </p>
            <p className="text-sm text-white/70 mt-4">Last updated: February 17, 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-[#007EFC]" />
                <h2 className="text-3xl font-bold text-[#030213] m-0">Introduction</h2>
              </div>
              <p className="text-[#64748B] leading-relaxed">
                At HealthCare+, we understand that your health information is deeply personal and private. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our telehealth platform and services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12 bg-[#F8FAFC] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-8 h-8 text-[#007EFC]" />
                <h2 className="text-3xl font-bold text-[#030213] m-0">Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-[#030213] mt-6 mb-3">Personal Information</h3>
              <ul className="text-[#64748B] space-y-2">
                <li>Name, email address, phone number, and date of birth</li>
                <li>Payment and billing information</li>
                <li>Government-issued ID for verification purposes</li>
                <li>Profile photo (optional)</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#030213] mt-6 mb-3">Health Information</h3>
              <ul className="text-[#64748B] space-y-2">
                <li>Medical history, symptoms, and health concerns</li>
                <li>Prescriptions and medication information</li>
                <li>Lab test results and diagnostic reports</li>
                <li>Consultation notes and treatment plans</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#030213] mt-6 mb-3">Technical Information</h3>
              <ul className="text-[#64748B] space-y-2">
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-[#007EFC]" />
                <h2 className="text-3xl font-bold text-[#030213] m-0">How We Use Your Information</h2>
              </div>
              <p className="text-[#64748B] mb-4">We use your information to:</p>
              <ul className="text-[#64748B] space-y-2">
                <li>Provide and improve our healthcare services</li>
                <li>Facilitate video consultations with doctors</li>
                <li>Process lab test orders and deliver results</li>
                <li>Process pharmacy orders and prescriptions</li>
                <li>Send appointment reminders and health notifications</li>
                <li>Improve our AI-powered recommendations</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-[#007EFC]" />
                <h2 className="text-3xl font-bold text-[#030213] m-0">Data Security</h2>
              </div>
              <p className="text-[#64748B] leading-relaxed mb-4">
                We implement industry-leading security measures to protect your information:
              </p>
              <ul className="text-[#64748B] space-y-2">
                <li><strong>End-to-End Encryption:</strong> All consultations and data transmissions are encrypted</li>
                <li><strong>Secure Storage:</strong> Data stored in HIPAA-compliant servers</li>
                <li><strong>Access Controls:</strong> Strict role-based access to your information</li>
                <li><strong>Regular Audits:</strong> Third-party security audits and penetration testing</li>
                <li><strong>Data Backup:</strong> Regular backups with disaster recovery protocols</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-[#007EFC]" />
                <h2 className="text-3xl font-bold text-[#030213] m-0">Data Sharing</h2>
              </div>
              <p className="text-[#64748B] mb-4">We do not sell your personal or health information. We may share your data with:</p>
              <ul className="text-[#64748B] space-y-2">
                <li><strong>Healthcare Providers:</strong> Doctors and labs you consult with</li>
                <li><strong>Service Providers:</strong> Payment processors, SMS/email services (limited data)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12 bg-[#F8FAFC] rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-[#030213] mb-4">Your Rights</h2>
              <p className="text-[#64748B] mb-4">You have the right to:</p>
              <ul className="text-[#64748B] space-y-2">
                <li>Access your personal and health information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Download your health records</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-[#007EFC] to-[#0066DD] rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-white/90 mb-4">
                If you have questions about this Privacy Policy or your data:
              </p>
              <p className="text-white/90">
                <strong>Email:</strong> privacy@healthcareplus.com<br />
                <strong>Phone:</strong> 1800-123-4567<br />
                <strong>Address:</strong> 123 Medical Plaza, Mumbai, Maharashtra 400069
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
