import { Star, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const doctors = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 127,
    experience: '15 years',
    location: '2.5 km away',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Dr. Michael Rivera',
    specialty: 'General Physician',
    rating: 4.8,
    reviews: 203,
    experience: '12 years',
    location: '1.8 km away',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Dermatologist',
    rating: 5.0,
    reviews: 189,
    experience: '18 years',
    location: '3.2 km away',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Dr. James Park',
    specialty: 'Pediatrician',
    rating: 4.9,
    reviews: 156,
    experience: '10 years',
    location: '4.1 km away',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
  },
];

export function NearbyDoctorsPublic() {
  const navigate = useNavigate();

  const handleDoctorClick = (doctorName: string) => {
    console.log(`Selected doctor: ${doctorName}`);
    navigate('/register');
  };

  const handleViewAll = () => {
    navigate('/register');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#030213] mb-2">
              Top Doctors Near You
            </h2>
            <p className="text-lg text-[#64748B]">
              Experienced specialists available for consultation
            </p>
          </div>
          <button
            onClick={handleViewAll}
            className="hidden md:flex items-center gap-2 text-[#007EFC] font-medium hover:gap-3 transition-all"
          >
            View All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-[#F8FAFC] rounded-[24px] p-6 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-[rgba(0,0,0,0.06)]"
            >
              {/* Doctor Avatar */}
              <div className="relative mb-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full h-48 rounded-2xl object-cover ring-2 ring-white"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1.5 shadow-md flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="mb-3">
                <h3 className="font-semibold text-lg text-[#030213] mb-1">{doctor.name}</h3>
                <p className="text-sm text-[#64748B]">{doctor.specialty}</p>
              </div>

              {/* Experience & Location */}
              <div className="space-y-2 mb-4">
                <p className="text-xs text-[#64748B]">
                  <span className="font-medium text-[#030213]">{doctor.experience}</span> experience
                </p>
                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <MapPin className="w-3 h-3 text-[#007EFC]" />
                  {doctor.location}
                </div>
                <p className="text-xs text-[#64748B]">
                  {doctor.reviews} patient reviews
                </p>
              </div>

              {/* Book Button */}
              <button
                onClick={() => handleDoctorClick(doctor.name)}
                className="w-full bg-[#007EFC] text-white py-2.5 rounded-xl font-medium hover:bg-[#0066CC] transition-colors group-hover:shadow-lg"
              >
                Book Consultation
              </button>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <button
          onClick={handleViewAll}
          className="md:hidden w-full mt-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066CC] transition-colors"
        >
          View All Doctors
        </button>
      </div>
    </section>
  );
}