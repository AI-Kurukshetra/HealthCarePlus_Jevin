import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { QuickActions } from '../components/QuickActions';
import { NearbyDoctors } from '../components/NearbyDoctors';
import { HealthSnapshot } from '../components/HealthSnapshot';
import { HealthTips } from '../components/HealthTips';
import { useAuth } from '../context/AuthContext';
import { mockAppointments } from '../data/doctors';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Stethoscope,
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const upcomingAppointments = mockAppointments.filter((a) => a.status === 'upcoming');
  const completedAppointments = mockAppointments.filter((a) => a.status === 'completed');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Welcome back, {user?.name || 'Sarah'}!
              </h1>
              <p className="text-white/80">
                You have {upcomingAppointments.length} upcoming appointment{upcomingAppointments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => navigate('/consultations')}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white text-[#007EFC] rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <Stethoscope className="w-5 h-5" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Bento Box Grid Layout */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Quick Actions */}
        <section className="mb-8">
          <QuickActions />
        </section>

        {/* Upcoming Appointments Section */}
        <section className="mb-8">
          <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#030213] mb-1">
                  Upcoming Appointments
                </h2>
                <p className="text-sm text-[#64748B]">Your next consultations</p>
              </div>
              <button
                onClick={() => navigate('/my-appointments')}
                className="flex items-center gap-2 text-[#007EFC] hover:underline font-medium text-sm"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-10 bg-[#F8FAFC] rounded-2xl border border-dashed border-[rgba(0,0,0,0.1)]">
                <Calendar className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
                <h3 className="font-semibold text-[#030213] mb-1">No Upcoming Appointments</h3>
                <p className="text-sm text-[#64748B] mb-4">Book your next consultation now</p>
                <button
                  onClick={() => navigate('/consultations')}
                  className="px-5 py-2.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
                >
                  Book Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => {
                  const formattedDate = new Date(apt.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  return (
                    <div
                      key={apt.id}
                      className="group bg-[#F8FAFC] rounded-2xl p-5 hover:bg-gradient-to-br hover:from-[#007EFC]/5 hover:to-[#0066CC]/5 transition-all border border-transparent hover:border-[#007EFC]/20"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={apt.doctor.imageUrl}
                          alt={apt.doctor.name}
                          className="w-14 h-14 rounded-xl object-cover ring-2 ring-white"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[#030213]">
                              {apt.doctor.name}
                            </h3>
                            <span className="text-xs px-2 py-0.5 bg-[#F0F9FF] text-[#007EFC] rounded-lg font-medium">
                              {apt.status}
                            </span>
                          </div>
                          <p className="text-sm text-[#007EFC]">{apt.doctor.specialty}</p>
                          <div className="flex items-center gap-4 mt-1.5 text-sm text-[#64748B]">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#007EFC]" />
                              <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#007EFC]" />
                              <span>{apt.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5 text-[#10B981]" />
                              <span>Video</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/video-call/${apt.id}`)}
                          className="px-5 py-2.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors text-sm"
                        >
                          Join Call
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Visit History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#030213] mb-1">
                    Recent Visits
                  </h2>
                  <p className="text-sm text-[#64748B]">Your past consultation history</p>
                </div>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="flex items-center gap-2 text-[#007EFC] hover:underline font-medium text-sm"
                >
                  See All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {completedAppointments.slice(0, 3).map((apt) => {
                  const formattedDate = new Date(apt.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                  return (
                    <div
                      key={apt.id}
                      className="flex items-start gap-4 p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#F0F9FF] transition-colors cursor-pointer"
                      onClick={() => navigate('/my-appointments')}
                    >
                      <img
                        src={apt.doctor.imageUrl}
                        alt={apt.doctor.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[#030213]">
                            {apt.doctor.name}
                          </h4>
                          <CheckCircle className="w-4 h-4 text-[#10B981]" />
                        </div>
                        <p className="text-sm text-[#64748B] mt-0.5">
                          {apt.doctor.specialty} · {formattedDate}
                        </p>
                        {apt.diagnosis && (
                          <p className="text-xs text-[#64748B] mt-1 bg-white px-2 py-1 rounded-lg inline-block">
                            {apt.diagnosis}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="text-sm font-medium text-[#030213]">
                            {apt.doctor.rating}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">₹{apt.paymentAmount}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Health Snapshot */}
          <div className="lg:col-span-1">
            <HealthSnapshot />
          </div>

          {/* Nearby Doctors */}
          <div className="lg:col-span-2">
            <NearbyDoctors />
          </div>

          {/* Health Tips */}
          <div className="lg:col-span-1">
            <HealthTips />
          </div>
        </div>
      </main>
    </div>
  );
}