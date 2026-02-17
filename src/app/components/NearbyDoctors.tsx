import { Star, Clock, ChevronRight } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 127,
    nextAvailable: 'Today, 2:30 PM',
    experience: '15 years',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Dr. Michael Rivera',
    specialty: 'General Physician',
    rating: 4.8,
    reviews: 203,
    nextAvailable: 'Today, 4:00 PM',
    experience: '12 years',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Dermatologist',
    rating: 5.0,
    reviews: 189,
    nextAvailable: 'Tomorrow, 9:00 AM',
    experience: '18 years',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Dr. James Park',
    specialty: 'Pediatrician',
    rating: 4.9,
    reviews: 156,
    nextAvailable: 'Today, 5:30 PM',
    experience: '10 years',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialty: 'Psychiatrist',
    rating: 4.8,
    reviews: 142,
    nextAvailable: 'Tomorrow, 11:00 AM',
    experience: '14 years',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
];

export function NearbyDoctors() {
  const handleDoctorClick = (doctorName: string) => {
    console.log(`Viewing profile for: ${doctorName}`);
    alert(`Opening profile for ${doctorName}. This would show detailed doctor information and available slots.`);
  };

  const handleBookAppointment = (doctorName: string) => {
    console.log(`Booking appointment with: ${doctorName}`);
    alert(`Booking appointment with ${doctorName}. This would open the booking flow.`);
  };

  const handleViewAll = () => {
    console.log('Viewing all doctors...');
    alert('This would show all available doctors in your area with filters and search options.');
  };

  return (
    <div className="bg-white rounded-[24px] p-8 border border-[rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#030213] mb-1">Nearby Doctors</h2>
          <p className="text-sm text-[#64748B]">Top-rated specialists in your area</p>
        </div>
        <button 
          onClick={handleViewAll}
          className="text-[#007EFC] font-medium flex items-center hover:gap-2 transition-all">
          View All
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto -mx-2 px-2 pb-2 scrollbar-hide">
        <div className="flex gap-4 min-w-max">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorClick(doctor.name)}
              className="group bg-[#F8FAFC] rounded-[20px] p-5 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-[rgba(0,0,0,0.06)] cursor-pointer w-[280px]"
            >
              {/* Doctor Avatar */}
              <div className="relative mb-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="mb-3">
                <h3 className="font-semibold text-[#030213] mb-1">{doctor.name}</h3>
                <p className="text-sm text-[#64748B]">{doctor.specialty}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>
                <span className="text-xs text-[#64748B]">({doctor.reviews} reviews)</span>
              </div>

              {/* Next Available */}
              <div className="bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-[#007EFC]" />
                  <span className="text-xs font-medium text-[#64748B]">Next Available</span>
                </div>
                <p className="text-sm font-semibold text-[#030213]">{doctor.nextAvailable}</p>
              </div>

              {/* Book Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookAppointment(doctor.name);
                }}
                className="w-full mt-4 bg-[#007EFC] text-white py-2.5 rounded-xl font-medium hover:bg-[#0066CC] transition-colors group-hover:shadow-lg">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}