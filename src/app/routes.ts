import { createBrowserRouter } from "react-router";
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ConsultationsPage } from './pages/ConsultationsPage';
import { LabsPage } from './pages/LabsPage';
import { PharmacyPage } from './pages/PharmacyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { EmergencyCarePage } from './pages/EmergencyCarePage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage } from './pages/BlogPage';
import { PressPage } from './pages/PressPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { TermsPage } from './pages/TermsPage';
import { NotFound } from './pages/NotFound';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { BookingPage } from './pages/BookingPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { VideoCallPage } from './pages/VideoCallPage';
import { ReschedulePage } from './pages/ReschedulePage';
import { CancelAppointmentPage } from './pages/CancelAppointmentPage';
import { SearchPage } from './pages/SearchPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/consultations",
    Component: ConsultationsPage,
  },
  {
    path: "/doctor/:doctorId",
    Component: DoctorProfilePage,
  },
  {
    path: "/booking/:doctorId",
    Component: BookingPage,
  },
  {
    path: "/my-appointments",
    Component: MyAppointmentsPage,
  },
  {
    path: "/video-call/:appointmentId",
    Component: VideoCallPage,
  },
  {
    path: "/reschedule/:appointmentId",
    Component: ReschedulePage,
  },
  {
    path: "/cancel/:appointmentId",
    Component: CancelAppointmentPage,
  },
  {
    path: "/labs",
    Component: LabsPage,
  },
  {
    path: "/pharmacy",
    Component: PharmacyPage,
  },
  {
    path: "/emergency-care",
    Component: EmergencyCarePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/careers",
    Component: CareersPage,
  },
  {
    path: "/blog",
    Component: BlogPage,
  },
  {
    path: "/press",
    Component: PressPage,
  },
  {
    path: "/help-center",
    Component: HelpCenterPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPolicyPage,
  },
  {
    path: "/terms",
    Component: TermsPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/notifications",
    Component: NotificationsPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);