import { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor } from '../data/doctors';

interface HealthDetails {
  symptoms: string;
  duration: string;
  severity: string;
  medications: string;
  allergies: string;
  additionalNotes: string;
}

interface BookingState {
  doctor: Doctor | null;
  selectedDate: string;
  selectedTime: string;
  selectedDayLabel: string;
  healthDetails: HealthDetails;
  consultationType: 'video' | 'in-person';
  paymentComplete: boolean;
  bookingId: string;
}

interface BookingContextType {
  booking: BookingState;
  setDoctor: (doctor: Doctor) => void;
  setSlot: (date: string, time: string, dayLabel: string) => void;
  setHealthDetails: (details: HealthDetails) => void;
  setConsultationType: (type: 'video' | 'in-person') => void;
  completePayment: () => void;
  resetBooking: () => void;
}

const initialHealthDetails: HealthDetails = {
  symptoms: '',
  duration: '',
  severity: '',
  medications: '',
  allergies: '',
  additionalNotes: '',
};

const initialBooking: BookingState = {
  doctor: null,
  selectedDate: '',
  selectedTime: '',
  selectedDayLabel: '',
  healthDetails: initialHealthDetails,
  consultationType: 'video',
  paymentComplete: false,
  bookingId: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

function generateBookingId(): string {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `APT-2026-${num}`;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialBooking);

  const setDoctor = (doctor: Doctor) => {
    setBooking((prev) => ({ ...prev, doctor }));
  };

  const setSlot = (date: string, time: string, dayLabel: string) => {
    setBooking((prev) => ({ ...prev, selectedDate: date, selectedTime: time, selectedDayLabel: dayLabel }));
  };

  const setHealthDetails = (details: HealthDetails) => {
    setBooking((prev) => ({ ...prev, healthDetails: details }));
  };

  const setConsultationType = (type: 'video' | 'in-person') => {
    setBooking((prev) => ({ ...prev, consultationType: type }));
  };

  const completePayment = () => {
    setBooking((prev) => ({
      ...prev,
      paymentComplete: true,
      bookingId: generateBookingId(),
    }));
  };

  const resetBooking = () => {
    setBooking(initialBooking);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setDoctor,
        setSlot,
        setHealthDetails,
        setConsultationType,
        completePayment,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
