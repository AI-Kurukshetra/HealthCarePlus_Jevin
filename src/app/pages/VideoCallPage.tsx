import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockAppointments } from '../data/doctors';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageSquare,
  PhoneOff,
  MoreVertical,
  Shield,
  Maximize2,
  Minimize2,
  X,
  Send,
  Wifi,
  Clock,
  User,
  Volume2,
} from 'lucide-react';

export function VideoCallPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const appointment = mockAppointments.find((a) => a.id === appointmentId);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<
    { id: number; sender: 'you' | 'doctor'; text: string; time: string }[]
  >([
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello! I can see you. How are you feeling today?',
      time: formatTime(0),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    if (callEnded) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [callEnded]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function formatTime(totalSeconds: number): string {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'you' as const,
      text: chatMessage,
      time: formatTime(elapsedSeconds),
    };
    setMessages([...messages, newMsg]);
    setChatMessage('');

    // Mock doctor reply
    setTimeout(() => {
      const replies = [
        'I understand. Can you tell me more about when this started?',
        'That\'s helpful information. Are you currently taking any medication?',
        'I see. Let me make a note of that.',
        'Have you noticed any other symptoms alongside this?',
        'I\'d recommend we monitor this closely. Let me check a few things.',
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'doctor',
          text: replies[Math.floor(Math.random() * replies.length)],
          time: formatTime(elapsedSeconds + 3),
        },
      ]);
    }, 2000);
  };

  const handleEndCall = () => {
    setCallEnded(true);
    setShowEndConfirm(false);
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Appointment Not Found</h1>
          <p className="text-[#94A3B8] mb-6">Unable to start the video call.</p>
          <button
            onClick={() => navigate('/my-appointments')}
            className="px-6 py-3 bg-[#007EFC] text-white rounded-xl font-medium"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  const doctor = appointment.doctor;

  // Call ended screen
  if (callEnded) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="w-10 h-10 text-[#EF4444]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Call Ended</h1>
          <p className="text-[#94A3B8] mb-2">
            Consultation with {doctor.name}
          </p>
          <p className="text-[#64748B] text-sm mb-8">
            Duration: {formatTime(elapsedSeconds)}
          </p>

          {/* Call Summary Card */}
          <div className="bg-[#1E293B] rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{doctor.name}</h3>
                <p className="text-sm text-[#007EFC]">{doctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Call Duration</span>
                <span className="text-white font-medium">{formatTime(elapsedSeconds)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Call Quality</span>
                <span className="text-[#10B981] font-medium">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Booking ID</span>
                <span className="text-white font-mono text-xs">{appointment.id}</span>
              </div>
            </div>
          </div>

          {/* Rate Experience */}
          <div className="bg-[#1E293B] rounded-2xl p-6 mb-8">
            <p className="text-white font-medium mb-3">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {['😞', '😐', '🙂', '😊', '🤩'].map((emoji, i) => (
                <button
                  key={i}
                  className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center text-2xl hover:bg-[#334155] transition-colors hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/my-appointments')}
              className="flex-1 px-6 py-3.5 bg-[#007EFC] text-white rounded-xl font-medium hover:bg-[#0066DD] transition-colors"
            >
              My Appointments
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3.5 bg-[#1E293B] text-white rounded-xl font-medium hover:bg-[#334155] transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0F172A] flex flex-col overflow-hidden relative">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/80 to-transparent px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1E293B]/80 backdrop-blur-sm px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white font-mono font-medium">
                {formatTime(elapsedSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E293B]/80 backdrop-blur-sm px-3 py-2 rounded-xl">
              <Wifi className="w-4 h-4 text-[#10B981]" />
              <span className="text-[#10B981] text-xs font-medium">Excellent</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E293B]/80 backdrop-blur-sm px-3 py-2 rounded-xl">
              <Shield className="w-4 h-4 text-[#007EFC]" />
              <span className="text-[#007EFC] text-xs font-medium">Encrypted</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-10 h-10 bg-[#1E293B]/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-[#334155] transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            <button className="w-10 h-10 bg-[#1E293B]/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-[#334155] transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex relative">
        {/* Doctor Video (Main) */}
        <div className={`flex-1 relative ${isChatOpen ? 'mr-[360px]' : ''} transition-all`}>
          {/* Doctor Video Feed */}
          <div className="absolute inset-0">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.9)' }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-[#0F172A]/40" />
          </div>

          {/* Doctor Name Label */}
          <div className="absolute bottom-24 left-6 z-20">
            <div className="flex items-center gap-3 bg-[#1E293B]/70 backdrop-blur-md px-4 py-3 rounded-2xl">
              <div className="w-2 h-2 bg-[#10B981] rounded-full" />
              <div>
                <p className="text-white font-medium">{doctor.name}</p>
                <p className="text-[#94A3B8] text-xs">{doctor.specialty}</p>
              </div>
              <Volume2 className="w-4 h-4 text-[#10B981] ml-2" />
            </div>
          </div>

          {/* Self Camera (PiP) */}
          <div className="absolute bottom-24 right-6 z-20 w-48 h-36 rounded-2xl overflow-hidden border-2 border-[#1E293B] shadow-2xl">
            {isCameraOn ? (
              <div className="w-full h-full bg-gradient-to-br from-[#1E293B] to-[#334155] flex items-center justify-center relative">
                <div className="w-16 h-16 bg-[#007EFC] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#0F172A]/70 px-2 py-1 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  <span className="text-white text-xs">You</span>
                </div>
                {isMuted && (
                  <div className="absolute top-2 right-2 w-7 h-7 bg-[#EF4444] rounded-lg flex items-center justify-center">
                    <MicOff className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-[#1E293B] flex flex-col items-center justify-center">
                <VideoOff className="w-8 h-8 text-[#64748B] mb-1" />
                <span className="text-[#64748B] text-xs">Camera off</span>
              </div>
            )}
          </div>

          {/* Screen sharing indicator */}
          {isScreenSharing && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#10B981] px-4 py-2 rounded-xl">
              <Monitor className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                You are sharing your screen
              </span>
              <button
                onClick={() => setIsScreenSharing(false)}
                className="ml-2 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="absolute top-0 right-0 w-[360px] h-full bg-[#1E293B] border-l border-[#334155] z-20 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#007EFC]" />
                <h3 className="text-white font-medium">In-Call Chat</h3>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 bg-[#334155] rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'you' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                      msg.sender === 'you'
                        ? 'bg-[#007EFC] text-white rounded-br-md'
                        : 'bg-[#334155] text-[#E2E8F0] rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-[#64748B] mt-1 px-1">
                    {msg.sender === 'you' ? 'You' : doctor.name.split(' ')[1]} · {msg.time}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#334155]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-[#0F172A] text-white border border-[#334155] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors placeholder-[#64748B] text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="w-11 h-11 bg-[#007EFC] rounded-xl flex items-center justify-center text-white hover:bg-[#0066DD] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent px-6 pb-6 pt-16">
        <div className="flex items-center justify-center gap-3">
          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-[#EF4444] text-white shadow-lg shadow-[#EF4444]/30'
                : 'bg-[#1E293B]/80 backdrop-blur-sm text-white hover:bg-[#334155]'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Camera */}
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              !isCameraOn
                ? 'bg-[#EF4444] text-white shadow-lg shadow-[#EF4444]/30'
                : 'bg-[#1E293B]/80 backdrop-blur-sm text-white hover:bg-[#334155]'
            }`}
            title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isScreenSharing
                ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30'
                : 'bg-[#1E293B]/80 backdrop-blur-sm text-white hover:bg-[#334155]'
            }`}
            title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
          >
            <Monitor className="w-6 h-6" />
          </button>

          {/* Chat */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all relative ${
              isChatOpen
                ? 'bg-[#007EFC] text-white shadow-lg shadow-[#007EFC]/30'
                : 'bg-[#1E293B]/80 backdrop-blur-sm text-white hover:bg-[#334155]'
            }`}
            title="Chat"
          >
            <MessageSquare className="w-6 h-6" />
            {!isChatOpen && messages.length > 1 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{messages.length}</span>
              </div>
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-10 bg-[#334155] mx-2" />

          {/* End Call */}
          <button
            onClick={() => setShowEndConfirm(true)}
            className="w-16 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center text-white hover:bg-[#DC2626] transition-all shadow-lg shadow-[#EF4444]/30"
            title="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>

        {/* Control Labels */}
        <div className="flex items-center justify-center gap-3 mt-2">
          {['Mic', 'Camera', 'Share', 'Chat', '', 'End'].map((label, i) =>
            label ? (
              <span key={i} className={`text-[10px] text-[#64748B] ${i === 5 ? 'ml-2' : ''}`} style={{ width: i === 5 ? 64 : 56, textAlign: 'center' }}>
                {label}
              </span>
            ) : (
              <div key={i} className="mx-2" style={{ width: 1 }} />
            )
          )}
        </div>
      </div>

      {/* End Call Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1E293B] rounded-3xl p-8 max-w-sm w-full mx-4 text-center border border-[#334155]">
            <div className="w-16 h-16 bg-[#EF4444]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <PhoneOff className="w-8 h-8 text-[#EF4444]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">End Consultation?</h3>
            <p className="text-[#94A3B8] text-sm mb-6">
              Are you sure you want to end this video consultation with {doctor.name}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 py-3 bg-[#334155] text-white rounded-xl font-medium hover:bg-[#475569] transition-colors"
              >
                Continue Call
              </button>
              <button
                onClick={handleEndCall}
                className="flex-1 py-3 bg-[#EF4444] text-white rounded-xl font-medium hover:bg-[#DC2626] transition-colors"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
