import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/landing/Footer';
import {
  Bell,
  Calendar,
  Pill,
  FlaskConical,
  Tag,
  CheckCircle,
  Clock,
  Video,
  CreditCard,
  Star,
  MessageSquare,
  AlertCircle,
  Trash2,
  Check,
  ChevronRight,
  Shield,
  X,
} from 'lucide-react';

type NotificationType = 'appointment' | 'prescription' | 'lab' | 'payment' | 'offer' | 'system';
type FilterTab = 'all' | 'appointments' | 'health' | 'payments' | 'offers';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionLink?: string;
  avatar?: string;
}

const initialNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'appointment',
    title: 'Upcoming Appointment Reminder',
    message: 'Your video consultation with Dr. Emily Chen (Cardiologist) is scheduled for today at 2:30 PM. Please join 5 minutes early.',
    time: '10 minutes ago',
    read: false,
    actionLabel: 'Join Call',
    actionLink: '/video-call/APT-2026-001',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    id: 'n2',
    type: 'prescription',
    title: 'New Prescription Available',
    message: 'Dr. Michael Rivera has uploaded your prescription for the consultation on Jan 28. You can download it or order medicines directly.',
    time: '2 hours ago',
    read: false,
    actionLabel: 'View Prescription',
    actionLink: '/my-appointments',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    id: 'n3',
    type: 'lab',
    title: 'Lab Results Ready',
    message: 'Your Complete Blood Count (CBC) test results are now available. All parameters are within normal range.',
    time: '5 hours ago',
    read: false,
    actionLabel: 'View Results',
    actionLink: '/labs',
  },
  {
    id: 'n4',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Payment of ₹799 for consultation with Dr. Sarah Johnson has been processed successfully. Booking ID: APT-2026-002.',
    time: '1 day ago',
    read: true,
    actionLabel: 'View Receipt',
    actionLink: '/my-appointments',
  },
  {
    id: 'n5',
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Johnson (Dermatologist) on Feb 19 at 10:00 AM has been confirmed.',
    time: '1 day ago',
    read: true,
    actionLabel: 'View Details',
    actionLink: '/my-appointments',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  },
  {
    id: 'n6',
    type: 'offer',
    title: '20% Off on Lab Tests!',
    message: 'Get 20% off on all lab tests this week. Use code HEALTH20 at checkout. Valid till Feb 23, 2026.',
    time: '2 days ago',
    read: true,
    actionLabel: 'Book Now',
    actionLink: '/labs',
  },
  {
    id: 'n7',
    type: 'system',
    title: 'Profile Incomplete',
    message: 'Complete your health profile to get personalised doctor recommendations and faster consultations.',
    time: '3 days ago',
    read: true,
    actionLabel: 'Complete Profile',
    actionLink: '/profile',
  },
  {
    id: 'n8',
    type: 'appointment',
    title: 'Consultation Completed',
    message: 'Your consultation with Dr. Michael Rivera has been completed. Please rate your experience.',
    time: '3 weeks ago',
    read: true,
    actionLabel: 'Rate Now',
    actionLink: '/my-appointments',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    id: 'n9',
    type: 'prescription',
    title: 'Medication Reminder',
    message: 'It\'s time for your evening dose of Vitamin D supplements. Stay consistent for best results.',
    time: '4 days ago',
    read: true,
  },
  {
    id: 'n10',
    type: 'offer',
    title: 'Free Health Checkup Camp',
    message: 'Join our free health checkup camp this Saturday at City Medical Center. Includes BMI, BP, and sugar screening.',
    time: '5 days ago',
    read: true,
    actionLabel: 'Learn More',
    actionLink: '/blog',
  },
  {
    id: 'n11',
    type: 'payment',
    title: 'Refund Processed',
    message: 'Refund of ₹899 for cancelled appointment with Dr. Robert Kim has been initiated. Expected in 5-7 business days.',
    time: '1 week ago',
    read: true,
  },
  {
    id: 'n12',
    type: 'lab',
    title: 'Sample Collection Scheduled',
    message: 'Home sample collection for Thyroid Profile test is scheduled for tomorrow between 7:00 AM - 9:00 AM.',
    time: '1 week ago',
    read: true,
  },
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'appointments') return n.type === 'appointment';
    if (activeFilter === 'health') return n.type === 'prescription' || n.type === 'lab';
    if (activeFilter === 'payments') return n.type === 'payment';
    if (activeFilter === 'offers') return n.type === 'offer' || n.type === 'system';
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
    setIsSelectMode(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const typeIcons: Record<NotificationType, { icon: typeof Bell; color: string; bg: string }> = {
    appointment: { icon: Calendar, color: '#007EFC', bg: '#F0F9FF' },
    prescription: { icon: Pill, color: '#8B5CF6', bg: '#F5F3FF' },
    lab: { icon: FlaskConical, color: '#10B981', bg: '#F0FDF4' },
    payment: { icon: CreditCard, color: '#F59E0B', bg: '#FFFBEB' },
    offer: { icon: Tag, color: '#EC4899', bg: '#FDF2F8' },
    system: { icon: Shield, color: '#64748B', bg: '#F8FAFC' },
  };

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'health', label: 'Health' },
    { id: 'payments', label: 'Payments' },
    { id: 'offers', label: 'Offers' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Page Header */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#007EFC]/10 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#007EFC]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#030213]">Notifications</h1>
                <p className="text-sm text-[#64748B]">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                    : 'All caught up!'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isSelectMode ? (
                <>
                  <button
                    onClick={() => {
                      setIsSelectMode(false);
                      setSelectedIds(new Set());
                    }}
                    className="px-4 py-2 text-sm text-[#64748B] hover:text-[#030213] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteSelected}
                    disabled={selectedIds.size === 0}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#EF4444] bg-[#FEF2F2] rounded-xl hover:bg-[#EF4444] hover:text-white transition-colors disabled:opacity-40"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete ({selectedIds.size})
                  </button>
                </>
              ) : (
                <>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#007EFC] hover:bg-[#F0F9FF] rounded-xl transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsSelectMode(true)}
                    className="px-4 py-2 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors border border-[rgba(0,0,0,0.06)]"
                  >
                    Select
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const count =
              tab.id === 'all'
                ? notifications.length
                : notifications.filter((n) => {
                    if (tab.id === 'appointments') return n.type === 'appointment';
                    if (tab.id === 'health') return n.type === 'prescription' || n.type === 'lab';
                    if (tab.id === 'payments') return n.type === 'payment';
                    if (tab.id === 'offers') return n.type === 'offer' || n.type === 'system';
                    return false;
                  }).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm ${
                  activeFilter === tab.id
                    ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/25'
                    : 'bg-white text-[#64748B] hover:bg-[#E2E8F0] border border-[rgba(0,0,0,0.06)]'
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeFilter === tab.id ? 'bg-white/20' : 'bg-[#F8FAFC]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 border border-[rgba(0,0,0,0.06)] text-center">
            <Bell className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#030213] mb-2">No Notifications</h3>
            <p className="text-[#64748B]">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((notification) => {
              const config = typeIcons[notification.type];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  className={`relative bg-white rounded-2xl border transition-all group ${
                    !notification.read
                      ? 'border-[#007EFC]/15 shadow-sm'
                      : 'border-[rgba(0,0,0,0.06)] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4 p-5">
                    {/* Select Checkbox */}
                    {isSelectMode && (
                      <button
                        onClick={() => toggleSelect(notification.id)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                          selectedIds.has(notification.id)
                            ? 'border-[#007EFC] bg-[#007EFC]'
                            : 'border-[#CBD5E1]'
                        }`}
                      >
                        {selectedIds.has(notification.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                    )}

                    {/* Icon / Avatar */}
                    {notification.avatar ? (
                      <div className="relative flex-shrink-0">
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white"
                          style={{ backgroundColor: config.bg }}
                        >
                          <Icon className="w-3 h-3" style={{ color: config.color }} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: config.bg }}
                      >
                        <Icon className="w-6 h-6" style={{ color: config.color }} />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3
                            className={`text-sm ${
                              !notification.read
                                ? 'font-semibold text-[#030213]'
                                : 'font-medium text-[#030213]'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2.5 h-2.5 bg-[#007EFC] rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </span>
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-md"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {notification.actionLabel && notification.actionLink && (
                            <button
                              onClick={() => {
                                markAsRead(notification.id);
                                navigate(notification.actionLink!);
                              }}
                              className="flex items-center gap-1 text-xs font-medium text-[#007EFC] hover:underline"
                            >
                              {notification.actionLabel}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {!isSelectMode && (
                            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F0F9FF] hover:text-[#007EFC] transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
                                title="Delete"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
