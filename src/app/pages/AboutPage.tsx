import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Target, Users, Award, Heart, ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#007EFC] to-[#0066DD] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About HealthCare+</h1>
            <p className="text-xl text-white/90">
              We're on a mission to make quality healthcare accessible, affordable, and convenient for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <Target className="w-14 h-14 text-[#007EFC] mb-6" />
              <h2 className="text-3xl font-bold text-[#030213] mb-4">Our Mission</h2>
              <p className="text-lg text-[#64748B] leading-relaxed">
                To revolutionize healthcare delivery by leveraging technology and providing seamless access to medical professionals, diagnostic services, and medicines for everyone, everywhere.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <Heart className="w-14 h-14 text-[#007EFC] mb-6" />
              <h2 className="text-3xl font-bold text-[#030213] mb-4">Our Vision</h2>
              <p className="text-lg text-[#64748B] leading-relaxed">
                A world where quality healthcare is a right, not a privilege. Where distance, time, and cost are no longer barriers to receiving the best medical care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#030213] mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#64748B] leading-relaxed mb-6">
              Founded in 2020, HealthCare+ was born out of a simple observation: accessing quality healthcare shouldn't be complicated or time-consuming. Our founders, a team of healthcare professionals and technology experts, experienced firsthand the challenges of traditional healthcare systems.
            </p>
            <p className="text-lg text-[#64748B] leading-relaxed mb-6">
              We started with a vision to bridge the gap between patients and healthcare providers using technology. Today, we're proud to serve over 50,000 patients across India, partnering with 500+ verified doctors and NABL-certified labs.
            </p>
            <p className="text-lg text-[#64748B] leading-relaxed">
              Our platform combines the convenience of digital healthcare with the trust of traditional medicine, ensuring you get the best of both worlds.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#030213] mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Happy Patients' },
              { value: '500+', label: 'Expert Doctors' },
              { value: '1M+', label: 'Consultations' },
              { value: '4.9★', label: 'User Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-[#007EFC] mb-2">{stat.value}</div>
                <div className="text-[#64748B]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#030213] mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Patient First',
                description: 'Every decision we make puts patient care and satisfaction at the center.',
              },
              {
                icon: Award,
                title: 'Quality Care',
                description: 'We partner only with verified, experienced healthcare professionals.',
              },
              {
                icon: Heart,
                title: 'Compassion',
                description: 'We understand that health is personal, and we treat every case with empathy.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-[#F8FAFC] rounded-2xl p-8 text-center">
                <value.icon className="w-12 h-12 text-[#007EFC] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#030213] mb-3">{value.title}</h3>
                <p className="text-[#64748B]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
