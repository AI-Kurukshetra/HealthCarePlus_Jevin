import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { useAuth } from '../context/AuthContext';
import type { User } from '../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Pill,
  AlertCircle,
  Edit3,
  Save,
  X,
  CheckCircle,
  Camera,
  Lock,
  Bell,
  Globe,
  ChevronRight,
  LogOut,
  FileText,
  Activity,
  Droplets,
  Users,
} from 'lucide-react';

interface FormField {
  key: keyof User;
  label: string;
  icon: typeof UserIcon;
  type?: string;
  placeholder: string;
  options?: string[];
}

const personalFields: FormField[] = [
  { key: 'name', label: 'Full Name', icon: UserIcon, placeholder: 'Enter your full name' },
  { key: 'email', label: 'Email Address', icon: Mail, placeholder: 'you@example.com' },
  { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+91 98765 43210' },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    icon: Calendar,
    type: 'date',
    placeholder: 'YYYY-MM-DD',
  },
  {
    key: 'gender',
    label: 'Gender',
    icon: Users,
    placeholder: 'Select gender',
    options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
  },
];

const addressFields: FormField[] = [
  { key: 'address', label: 'Street Address', icon: MapPin, placeholder: '42 Marine Drive' },
  { key: 'city', label: 'City', icon: MapPin, placeholder: 'Mumbai' },
  { key: 'state', label: 'State', icon: MapPin, placeholder: 'Maharashtra' },
  { key: 'zipCode', label: 'ZIP Code', icon: MapPin, placeholder: '400001' },
];

const medicalFields: FormField[] = [
  {
    key: 'bloodGroup',
    label: 'Blood Group',
    icon: Droplets,
    placeholder: 'Select blood group',
    options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  { key: 'allergies', label: 'Known Allergies', icon: AlertCircle, placeholder: 'e.g., Penicillin, Pollen' },
  {
    key: 'chronicConditions',
    label: 'Chronic Conditions',
    icon: Heart,
    placeholder: 'e.g., Diabetes, Hypertension',
  },
  {
    key: 'currentMedications',
    label: 'Current Medications',
    icon: Pill,
    placeholder: 'e.g., Metformin 500mg',
  },
];

const emergencyFields: FormField[] = [
  {
    key: 'emergencyContactName',
    label: 'Contact Name',
    icon: UserIcon,
    placeholder: 'Full name',
  },
  {
    key: 'emergencyContactPhone',
    label: 'Contact Phone',
    icon: Phone,
    placeholder: '+91 98765 43211',
  },
  {
    key: 'emergencyContactRelation',
    label: 'Relationship',
    icon: Users,
    placeholder: 'e.g., Spouse, Parent',
    options: ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'],
  },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <UserIcon className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#030213] mb-3">Sign In Required</h1>
          <p className="text-[#64748B] mb-6">Please sign in to view and manage your profile.</p>
          <button
            onClick={() => navigate('/login?returnTo=/profile')}
            className="px-8 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
          >
            Sign In
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const startEditing = () => {
    setFormData({ ...user });
    setIsEditing(true);
    setSaved(false);
  };

  const cancelEditing = () => {
    setFormData({});
    setIsEditing(false);
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (key: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getValue = (key: keyof User): string => {
    if (isEditing) return (formData[key] as string) || '';
    return (user[key] as string) || '';
  };

  const memberDate = user.memberSince
    ? new Date(user.memberSince).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'March 2024';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderField = (field: FormField) => {
    const value = getValue(field.key);
    const FieldIcon = field.icon;

    if (!isEditing) {
      return (
        <div key={field.key} className="flex items-start gap-3">
          <FieldIcon className="w-4 h-4 text-[#94A3B8] mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-[#94A3B8] block">{field.label}</span>
            <span className="text-sm text-[#030213] font-medium block mt-0.5">
              {value || '—'}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div key={field.key}>
        <label className="flex items-center gap-1.5 text-sm font-medium text-[#030213] mb-1.5">
          <FieldIcon className="w-3.5 h-3.5 text-[#007EFC]" />
          {field.label}
        </label>
        {field.options ? (
          <select
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] appearance-none"
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type || 'text'}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213]"
          />
        )}
      </div>
    );
  };

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: UserIcon,
      fields: personalFields,
      color: '#007EFC',
    },
    {
      id: 'address',
      title: 'Address',
      icon: MapPin,
      fields: addressFields,
      color: '#10B981',
    },
    {
      id: 'medical',
      title: 'Medical Information',
      icon: Activity,
      fields: medicalFields,
      color: '#8B5CF6',
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      icon: Shield,
      fields: emergencyFields,
      color: '#EF4444',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Saved Toast */}
      {saved && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-2xl shadow-xl shadow-[#10B981]/25 animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-[#007EFC] via-[#0066DD] to-[#0052BB] relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl" />
            </div>
          </div>

          {/* Avatar + Info */}
          <div className="px-8 pb-6 -mt-12 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#007EFC] to-[#0066DD] rounded-2xl flex items-center justify-center ring-4 ring-white shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-[#E2E8F0] rounded-xl flex items-center justify-center hover:bg-[#F8FAFC] transition-colors shadow-sm">
                    <Camera className="w-4 h-4 text-[#64748B]" />
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#030213]">{user.name}</h1>
                <p className="text-[#64748B] text-sm mt-0.5">
                  Member since {memberDate} · {user.city || 'Mumbai'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#64748B] rounded-xl font-medium hover:bg-[#F8FAFC] transition-colors border border-[rgba(0,0,0,0.06)]"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#10B981] text-white rounded-xl font-medium hover:bg-[#059669] transition-colors shadow-lg shadow-[#10B981]/25"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={startEditing}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors shadow-lg shadow-[#007EFC]/25"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Consultations', value: '12', icon: Activity, color: '#007EFC' },
                { label: 'Prescriptions', value: '8', icon: FileText, color: '#8B5CF6' },
                { label: 'Lab Tests', value: '5', icon: Droplets, color: '#10B981' },
                { label: 'Health Score', value: '92%', icon: Heart, color: '#EF4444' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#F8FAFC] rounded-xl p-4 flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#030213]">{stat.value}</div>
                    <div className="text-xs text-[#94A3B8]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-4">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            const isOpen = isEditing || activeSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => {
                    if (!isEditing) {
                      setActiveSection(activeSection === section.id ? null : section.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-6 text-left ${
                    !isEditing ? 'hover:bg-[#FAFBFC]' : ''
                  } transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${section.color}15` }}
                    >
                      <SectionIcon className="w-5 h-5" style={{ color: section.color }} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[#030213]">{section.title}</h2>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        {section.fields.length} fields
                      </p>
                    </div>
                  </div>
                  {!isEditing && (
                    <ChevronRight
                      className={`w-5 h-5 text-[#CBD5E1] transition-transform ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Section Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-[rgba(0,0,0,0.06)] pt-5">
                      {isEditing ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {section.fields.map(renderField)}
                        </div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {section.fields.map(renderField)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Settings & Account */}
        <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] mt-4 overflow-hidden">
          <div className="p-6">
            <h2 className="font-semibold text-[#030213] mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#64748B]" />
              Account Settings
            </h2>
            <div className="space-y-1">
              {[
                {
                  icon: Lock,
                  label: 'Change Password',
                  desc: 'Update your account password',
                  color: '#64748B',
                },
                {
                  icon: Bell,
                  label: 'Notification Preferences',
                  desc: 'Manage email and push notifications',
                  color: '#007EFC',
                  link: '/notifications',
                },
                {
                  icon: Globe,
                  label: 'Language & Region',
                  desc: 'English (India)',
                  color: '#10B981',
                },
                {
                  icon: Shield,
                  label: 'Privacy & Security',
                  desc: 'Manage your data and privacy settings',
                  color: '#8B5CF6',
                  link: '/privacy-policy',
                },
                {
                  icon: FileText,
                  label: 'Download My Data',
                  desc: 'Export your health records and data',
                  color: '#F59E0B',
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.link && navigate(item.link)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors text-left group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#030213] text-sm">{item.label}</p>
                    <p className="text-xs text-[#94A3B8]">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#007EFC] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="border-t border-[rgba(0,0,0,0.06)] p-4 px-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#EF4444] hover:bg-[#FEF2F2] transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account info */}
        <div className="text-center mt-6 text-xs text-[#94A3B8]">
          <p>HealthCare+ Account · ID: {user.id}</p>
          <p className="mt-1">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-[#007EFC]">
              Privacy Policy
            </button>
            {' · '}
            <button onClick={() => navigate('/terms')} className="hover:text-[#007EFC]">
              Terms of Service
            </button>
            {' · '}
            <button onClick={() => navigate('/help-center')} className="hover:text-[#007EFC]">
              Help Center
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}