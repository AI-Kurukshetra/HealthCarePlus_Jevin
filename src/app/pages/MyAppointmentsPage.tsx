import { useState, type ComponentType } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import { mockAppointments, Appointment } from '../data/doctors';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Star,
  FileText,
  Pill,
  ChevronDown,
  ChevronUp,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Stethoscope,
  Download,
  Phone,
  ArrowRight,
} from 'lucide-react';

type TabFilter = 'all' | 'upcoming' | 'completed' | 'cancelled';

export function MyAppointmentsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeTab === 'all'
      ? mockAppointments
      : mockAppointments.filter((a) => a.status === activeTab);

  const upcomingCount = mockAppointments.filter((a) => a.status === 'upcoming').length;
  const completedCount = mockAppointments.filter((a) => a.status === 'completed').length;
  const cancelledCount = mockAppointments.filter((a) => a.status === 'cancelled').length;

  const tabs: { id: TabFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: mockAppointments.length },
    { id: 'upcoming', label: 'Upcoming', count: upcomingCount },
    { id: 'completed', label: 'Completed', count: completedCount },
    { id: 'cancelled', label: 'Cancelled', count: cancelledCount },
  ];

  const statusConfig = {
    upcoming: {
      color: '#007EFC',
      bg: '#F0F9FF',
      label: 'Upcoming',
      icon: Clock,
    },
    completed: {
      color: '#10B981',
      bg: '#F0FDF4',
      label: 'Completed',
      icon: CheckCircle,
    },
    cancelled: {
      color: '#EF4444',
      bg: '#FEF2F2',
      label: 'Cancelled',
      icon: XCircle,
    },
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Page Header */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#030213] mb-1">My Appointments</h1>
              <p className="text-[#64748B]">
                Manage your consultations and view visit history
              </p>
            </div>
            <button
              onClick={() => navigate('/consultations')}
              className="flex items-center gap-2 px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors shadow-lg shadow-[#007EFC]/25"
            >
              <Plus className="w-5 h-5" />
              Book New Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#007EFC]" />
              </div>
              <span className="text-sm text-[#64748B]">Total</span>
            </div>
            <div className="text-2xl font-bold text-[#030213]">{mockAppointments.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F0F9FF] rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#007EFC]" />
              </div>
              <span className="text-sm text-[#64748B]">Upcoming</span>
            </div>
            <div className="text-2xl font-bold text-[#007EFC]">{upcomingCount}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F0FDF4] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-sm text-[#64748B]">Completed</span>
            </div>
            <div className="text-2xl font-bold text-[#10B981]">{completedCount}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FEF2F2] rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#EF4444]" />
              </div>
              <span className="text-sm text-[#64748B]">Cancelled</span>
            </div>
            <div className="text-2xl font-bold text-[#EF4444]">{cancelledCount}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                  : 'bg-white text-[#64748B] hover:bg-[#E2E8F0] border border-[rgba(0,0,0,0.06)]'
              }`}
            >
              {tab.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-[#F8FAFC]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Appointments List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 border border-[rgba(0,0,0,0.06)] text-center">
            <Calendar className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#030213] mb-2">No Appointments</h3>
            <p className="text-[#64748B] mb-6">
              You don't have any {activeTab !== 'all' ? activeTab : ''} appointments yet.
            </p>
            <button
              onClick={() => navigate('/consultations')}
              className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
            >
              Book a Consultation
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isExpanded={expandedId === appointment.id}
                onToggle={() => toggleExpand(appointment.id)}
                statusConfig={statusConfig}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

interface AppointmentCardProps {
  appointment: Appointment;
  isExpanded: boolean;
  onToggle: () => void;
  statusConfig: Record<
    string,
    { color: string; bg: string; label: string; icon: ComponentType<{ className?: string }> }
  >;
  navigate: (path: string) => void;
}

function AppointmentCard({
  appointment,
  isExpanded,
  onToggle,
  statusConfig,
  navigate,
}: AppointmentCardProps) {
  const status = statusConfig[appointment.status];
  const StatusIcon = status.icon;

  const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] overflow-hidden transition-all hover:shadow-lg">
      {/* Main Row */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Doctor Image */}
          <img
            src={appointment.doctor.imageUrl}
            alt={appointment.doctor.name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#F8FAFC]"
          />

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-semibold text-[#030213]">{appointment.doctor.name}</h3>
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{
                  backgroundColor: status.bg,
                  color: status.color,
                }}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
              </span>
            </div>
            <p className="text-sm text-[#007EFC] mt-0.5">{appointment.doctor.specialty}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#007EFC]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#007EFC]" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {appointment.type === 'video' ? (
                  <Video className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <MapPin className="w-4 h-4 text-[#F59E0B]" />
                )}
                <span>{appointment.type === 'video' ? 'Video Call' : 'In-Person'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {appointment.status === 'upcoming' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/video-call/${appointment.id}`);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors text-sm"
              >
                <Video className="w-4 h-4" />
                Join Call
              </button>
            )}
            {appointment.status === 'completed' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/doctor/${appointment.doctor.id}`);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#007EFC] rounded-xl font-medium hover:bg-[#F0F9FF] transition-colors text-sm border border-[#007EFC]/20"
              >
                Book Again
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onToggle}
              className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#64748B]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#64748B]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-[rgba(0,0,0,0.06)] bg-[#FAFBFC]">
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Left - Visit Details */}
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-[#030213] mb-2 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#007EFC]" />
                  Symptoms Reported
                </h4>
                <p className="text-sm text-[#64748B] bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.06)]">
                  {appointment.symptoms}
                </p>
              </div>

              {appointment.diagnosis && (
                <div>
                  <h4 className="text-sm font-semibold text-[#030213] mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#10B981]" />
                    Diagnosis
                  </h4>
                  <p className="text-sm text-[#64748B] bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.06)]">
                    {appointment.diagnosis}
                  </p>
                </div>
              )}

              {appointment.prescription && (
                <div>
                  <h4 className="text-sm font-semibold text-[#030213] mb-2 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-[#8B5CF6]" />
                    Prescription
                  </h4>
                  <div className="text-sm text-[#64748B] bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.06)]">
                    <p>{appointment.prescription}</p>
                    {appointment.status === 'completed' && (
                      <button className="flex items-center gap-1.5 text-[#007EFC] font-medium mt-2 text-xs hover:underline">
                        <Download className="w-3.5 h-3.5" />
                        Download Prescription PDF
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Notes & Meta */}
            <div className="space-y-5">
              {appointment.notes && (
                <div>
                  <h4 className="text-sm font-semibold text-[#030213] mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                    Doctor's Notes
                  </h4>
                  <p className="text-sm text-[#64748B] bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.06)]">
                    {appointment.notes}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-[#030213] mb-2">Appointment Info</h4>
                <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.06)] space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Booking ID</span>
                    <span className="font-mono text-[#030213]">{appointment.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Booked On</span>
                    <span className="text-[#030213]">
                      {new Date(appointment.bookedOn).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Amount Paid</span>
                    <span className="font-semibold text-[#030213]">
                      ₹{appointment.paymentAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Doctor Rating</span>
                    <span className="flex items-center gap-1 text-[#030213]">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      {appointment.doctor.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {appointment.status === 'upcoming' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/reschedule/${appointment.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Reschedule
                  </button>
                  <button
                    onClick={() => navigate(`/cancel/${appointment.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-[#EF4444]/20 rounded-xl text-sm font-medium text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}