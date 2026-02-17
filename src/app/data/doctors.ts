export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  rating: number;
  reviews: number;
  consultationFee: number;
  nextAvailable: string;
  languages: string[];
  imageUrl: string;
  about: string;
  hospital: string;
  location: string;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    specialty: 'Cardiologist',
    qualification: 'MD, DM Cardiology',
    experience: '15 years',
    rating: 4.9,
    reviews: 127,
    consultationFee: 599,
    nextAvailable: 'Today, 2:30 PM',
    languages: ['English', 'Hindi', 'Mandarin'],
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    about: 'Dr. Emily Chen is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology, heart failure management, and interventional procedures.',
    hospital: 'City Heart Institute',
    location: 'Mumbai, Maharashtra',
  },
  {
    id: 2,
    name: 'Dr. Michael Rivera',
    specialty: 'General Physician',
    qualification: 'MBBS, MD Medicine',
    experience: '12 years',
    rating: 4.8,
    reviews: 203,
    consultationFee: 399,
    nextAvailable: 'Today, 3:00 PM',
    languages: ['English', 'Spanish'],
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    about: 'Dr. Michael Rivera is an experienced general physician known for his patient-centric approach. He specializes in internal medicine, chronic disease management, and preventive healthcare.',
    hospital: 'Metro General Hospital',
    location: 'Delhi, NCR',
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Dermatologist',
    qualification: 'MD, DNB Dermatology',
    experience: '18 years',
    rating: 5.0,
    reviews: 189,
    consultationFee: 799,
    nextAvailable: 'Tomorrow, 10:00 AM',
    languages: ['English', 'French'],
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    about: 'Dr. Sarah Johnson is a renowned dermatologist specializing in cosmetic dermatology, acne treatment, and skin cancer screening. She is known for her holistic approach to skin health.',
    hospital: 'SkinCare Advanced Clinic',
    location: 'Bangalore, Karnataka',
  },
  {
    id: 4,
    name: 'Dr. James Park',
    specialty: 'Pediatrician',
    qualification: 'MD Pediatrics',
    experience: '10 years',
    rating: 4.9,
    reviews: 156,
    consultationFee: 499,
    nextAvailable: 'Today, 4:30 PM',
    languages: ['English', 'Korean'],
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    about: 'Dr. James Park is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. He focuses on developmental milestones and preventive pediatric care.',
    hospital: 'Children\'s Wellness Center',
    location: 'Hyderabad, Telangana',
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialty: 'Gynecologist',
    qualification: 'MD, DNB Gynecology',
    experience: '14 years',
    rating: 4.9,
    reviews: 234,
    consultationFee: 699,
    nextAvailable: 'Today, 5:00 PM',
    languages: ['English', 'Hindi'],
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    about: 'Dr. Priya Sharma is an experienced gynecologist specializing in women\'s health, prenatal care, and minimally invasive gynecological surgery. She is passionate about empowering women through health education.',
    hospital: 'Women\'s Health Clinic',
    location: 'Pune, Maharashtra',
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Psychiatrist',
    qualification: 'MD Psychiatry',
    experience: '16 years',
    rating: 5.0,
    reviews: 178,
    consultationFee: 899,
    nextAvailable: 'Tomorrow, 11:00 AM',
    languages: ['English', 'Korean'],
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    about: 'Dr. Robert Kim is a board-certified psychiatrist with expertise in anxiety disorders, depression, PTSD, and behavioral therapy. He adopts an integrative approach combining therapy and medication management.',
    hospital: 'MindWell Psychiatric Center',
    location: 'Chennai, Tamil Nadu',
  },
];

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySlots {
  date: string;
  dayLabel: string;
  dayOfWeek: string;
  slots: TimeSlot[];
}

export function generateSlots(): DaySlots[] {
  const days: DaySlots[] = [];
  const today = new Date();

  for (let d = 0; d < 7; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);

    const dayLabel = d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

    const morningSlots: TimeSlot[] = [
      { time: '9:00 AM', available: Math.random() > 0.3 },
      { time: '9:30 AM', available: Math.random() > 0.3 },
      { time: '10:00 AM', available: Math.random() > 0.4 },
      { time: '10:30 AM', available: Math.random() > 0.4 },
      { time: '11:00 AM', available: Math.random() > 0.3 },
      { time: '11:30 AM', available: Math.random() > 0.5 },
    ];

    const afternoonSlots: TimeSlot[] = [
      { time: '2:00 PM', available: Math.random() > 0.3 },
      { time: '2:30 PM', available: Math.random() > 0.4 },
      { time: '3:00 PM', available: Math.random() > 0.3 },
      { time: '3:30 PM', available: Math.random() > 0.5 },
      { time: '4:00 PM', available: Math.random() > 0.3 },
      { time: '4:30 PM', available: Math.random() > 0.4 },
    ];

    const eveningSlots: TimeSlot[] = [
      { time: '6:00 PM', available: Math.random() > 0.4 },
      { time: '6:30 PM', available: Math.random() > 0.4 },
      { time: '7:00 PM', available: Math.random() > 0.3 },
      { time: '7:30 PM', available: Math.random() > 0.5 },
    ];

    days.push({
      date: date.toISOString().split('T')[0],
      dayLabel,
      dayOfWeek,
      slots: [...morningSlots, ...afternoonSlots, ...eveningSlots],
    });
  }

  return days;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  symptoms: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  paymentAmount: number;
  bookedOn: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: 'APT-2026-001',
    doctor: doctors[0],
    date: '2026-02-17',
    time: '2:30 PM',
    type: 'video',
    status: 'upcoming',
    symptoms: 'Chest tightness, mild shortness of breath',
    paymentAmount: 599,
    bookedOn: '2026-02-15',
  },
  {
    id: 'APT-2026-002',
    doctor: doctors[2],
    date: '2026-02-19',
    time: '10:00 AM',
    type: 'video',
    status: 'upcoming',
    symptoms: 'Persistent skin rash on forearms',
    paymentAmount: 799,
    bookedOn: '2026-02-14',
  },
  {
    id: 'APT-2025-089',
    doctor: doctors[1],
    date: '2026-01-28',
    time: '3:00 PM',
    type: 'video',
    status: 'completed',
    symptoms: 'Recurring fever and body aches',
    diagnosis: 'Viral fever with seasonal allergies',
    prescription: 'Paracetamol 500mg, Cetirizine 10mg, Rest for 3 days',
    notes: 'Follow up if symptoms persist beyond 5 days. Blood test recommended if fever recurs.',
    paymentAmount: 399,
    bookedOn: '2026-01-26',
  },
  {
    id: 'APT-2025-075',
    doctor: doctors[3],
    date: '2026-01-15',
    time: '4:30 PM',
    type: 'video',
    status: 'completed',
    symptoms: 'Child with persistent cough and cold',
    diagnosis: 'Upper respiratory tract infection',
    prescription: 'Amoxicillin syrup, Cough suppressant, Saline nasal drops',
    notes: 'Child\'s vaccination schedule is up to date. Next checkup in 3 months.',
    paymentAmount: 499,
    bookedOn: '2026-01-13',
  },
  {
    id: 'APT-2025-062',
    doctor: doctors[4],
    date: '2025-12-20',
    time: '11:00 AM',
    type: 'in-person',
    status: 'completed',
    symptoms: 'Routine gynecological checkup',
    diagnosis: 'All parameters normal',
    prescription: 'Iron supplements, Folic acid',
    notes: 'Annual screening completed. All reports normal. Next screening in 12 months.',
    paymentAmount: 699,
    bookedOn: '2025-12-18',
  },
  {
    id: 'APT-2025-044',
    doctor: doctors[5],
    date: '2025-11-10',
    time: '6:00 PM',
    type: 'video',
    status: 'cancelled',
    symptoms: 'Anxiety and sleep issues',
    paymentAmount: 899,
    bookedOn: '2025-11-08',
  },
];
