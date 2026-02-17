import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-[120px] font-bold text-[#007EFC] leading-none">404</div>
          <h1 className="text-3xl font-bold text-[#030213] mt-4 mb-2">Page Not Found</h1>
          <p className="text-[#64748B]">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#F8FAFC] text-[#030213] rounded-xl font-medium hover:bg-[#E2E8F0] transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066CC] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
