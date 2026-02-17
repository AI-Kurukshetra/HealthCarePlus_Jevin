import { Bell, Search, User, LogOut, Settings, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = false }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = isAuthenticated
    ? [
        { name: 'Home', path: '/' },
        { name: 'Consultations', path: '/consultations' },
        { name: 'Labs', path: '/labs' },
        { name: 'Pharmacy', path: '/pharmacy' },
        { name: 'My Appointments', path: '/my-appointments' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Consultations', path: '/consultations' },
        { name: 'Labs', path: '/labs' },
        { name: 'Pharmacy', path: '/pharmacy' },
      ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#007EFC] rounded-2xl flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded-lg relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-semibold tracking-tight">HealthCare+</span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#007EFC] text-white'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#030213]'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Search */}
                <button 
                  onClick={() => navigate('/search')}
                  className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors"
                >
                  <Search className="w-5 h-5 text-[#64748B]" />
                </button>

                {/* Notifications */}
                <button 
                  onClick={() => navigate('/notifications')}
                  className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-[#64748B]" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white"></div>
                </button>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007EFC] to-[#0066CC] flex items-center justify-center hover:shadow-lg transition-shadow">
                    <span className="text-white text-sm font-bold">
                      {user?.name
                        ? user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                        : <User className="w-5 h-5 text-white" />}
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-[rgba(0,0,0,0.06)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-3 border-b border-[rgba(0,0,0,0.06)]">
                      <p className="font-semibold text-[#030213]">{user?.name}</p>
                      <p className="text-xs text-[#64748B]">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => navigate('/profile')}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#F8FAFC] flex items-center gap-2 text-[#030213] transition-colors text-sm"
                      >
                        <User className="w-4 h-4 text-[#64748B]" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => navigate('/my-appointments')}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#F8FAFC] flex items-center gap-2 text-[#030213] transition-colors text-sm"
                      >
                        <Calendar className="w-4 h-4 text-[#64748B]" />
                        <span>My Appointments</span>
                      </button>
                      <button
                        onClick={() => navigate('/notifications')}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#F8FAFC] flex items-center gap-2 text-[#030213] transition-colors text-sm"
                      >
                        <Bell className="w-4 h-4 text-[#64748B]" />
                        <span>Notifications</span>
                      </button>
                      <button
                        onClick={() => navigate('/profile')}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#F8FAFC] flex items-center gap-2 text-[#030213] transition-colors text-sm"
                      >
                        <Settings className="w-4 h-4 text-[#64748B]" />
                        <span>Settings</span>
                      </button>
                    </div>
                    <div className="border-t border-[rgba(0,0,0,0.06)]">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left hover:bg-[#FEF2F2] flex items-center gap-2 text-[#EF4444] rounded-b-2xl transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Search (public) */}
                <button 
                  onClick={() => navigate('/search')}
                  className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors"
                >
                  <Search className="w-5 h-5 text-[#64748B]" />
                </button>

                <button
                  onClick={handleLogin}
                  className="px-5 py-2.5 rounded-xl text-[#030213] hover:bg-[#F8FAFC] transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="px-5 py-2.5 rounded-xl bg-[#007EFC] text-white hover:bg-[#0066CC] transition-colors font-medium shadow-sm hover:shadow-lg"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
