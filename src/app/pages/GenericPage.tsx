import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { Construction } from 'lucide-react';
import { useNavigate } from 'react-router';

interface GenericPageProps {
  title: string;
  description?: string;
}

export function GenericPage({ title, description }: GenericPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Construction className="w-24 h-24 text-[#007EFC] mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-[#030213] mb-6">{title}</h1>
          {description && (
            <p className="text-xl text-[#64748B] mb-12">{description}</p>
          )}
          <p className="text-lg text-[#64748B] mb-8">
            This page is currently under construction. We're working hard to bring you this content soon!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white rounded-2xl font-semibold hover:shadow-xl transition-all"
          >
            Back to Home
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
