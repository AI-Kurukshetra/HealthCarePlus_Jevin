import { Calendar, Clock, Video, MapPin } from 'lucide-react';

const appointments = [
  {
    id: 1,
    doctorName: 'Dr. Emily Chen',
    specialty: 'Cardiologist',
    date: 'Today',
    time: '2:30 PM',
    type: 'Video Call',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Dermatologist',
    date: 'Tomorrow',
    time: '10:00 AM',
    type: 'In-Person',
    location: 'City Medical Center',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  },
];

export function UpcomingAppointments() {
  const handleBookNew = () => {
    console.log('Opening new appointment booking...');
    alert('This would open the appointment booking flow where you can select a doctor, date, and time.');
  };

  const handleJoinCall = (doctorName: string) => {
    console.log(`Joining video call with: ${doctorName}`);
    alert(`Starting video call with ${doctorName}. This would launch the video consultation interface.`);
  };

  const handleReschedule = (doctorName: string) => {
    console.log(`Rescheduling appointment with: ${doctorName}`);
    alert(`Rescheduling appointment with ${doctorName}. This would show available time slots.`);
  };

  return (
    <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#030213] mb-1">Upcoming Appointments</h2>
          <p className="text-sm text-[#64748B]">Your scheduled consultations</p>
        </div>
        <button 
          onClick={handleBookNew}
          className="px-4 py-2 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066CC] transition-colors">
          Book New
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="group bg-[#F8FAFC] rounded-[20px] p-5 hover:bg-gradient-to-br hover:from-[#007EFC]/5 hover:to-[#0066CC]/5 transition-all border border-transparent hover:border-[#007EFC]/20 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Doctor Avatar */}
              <img
                src={appointment.imageUrl}
                alt={appointment.doctorName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white"
              />

              {/* Appointment Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[#030213] mb-0.5">
                      {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-[#64748B]">{appointment.specialty}</p>
                  </div>
                  {appointment.type === 'Video Call' ? (
                    <div className="bg-[#007EFC]/10 text-[#007EFC] px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium">
                      <Video className="w-3.5 h-3.5" />
                      Video
                    </div>
                  ) : (
                    <div className="bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      In-Person
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Calendar className="w-4 h-4 text-[#007EFC]" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Clock className="w-4 h-4 text-[#007EFC]" />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {appointment.location && (
                  <p className="text-xs text-[#64748B] mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {appointment.location}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {appointment.type === 'Video Call' && appointment.date === 'Today' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinCall(appointment.doctorName);
                    }}
                    className="px-4 py-2 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066CC] transition-colors text-sm whitespace-nowrap">
                    Join Now
                  </button>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReschedule(appointment.doctorName);
                  }}
                  className="px-4 py-2 bg-white text-[#030213] rounded-xl font-medium hover:bg-[#F8FAFC] transition-colors text-sm border border-[rgba(0,0,0,0.06)]">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for More Appointments */}
      <div className="mt-4 text-center py-6 bg-[#F8FAFC] rounded-[20px] border border-dashed border-[rgba(0,0,0,0.1)]">
        <Calendar className="w-8 h-8 mx-auto mb-2 text-[#64748B]" />
        <p className="text-sm text-[#64748B]">No more appointments scheduled</p>
      </div>
    </div>
  );
}