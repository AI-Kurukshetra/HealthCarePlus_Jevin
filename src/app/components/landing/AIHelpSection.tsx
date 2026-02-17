import { useState } from 'react';
import { Sparkles, MessageSquare, Stethoscope, FlaskConical, Pill, CheckCircle, Lock } from 'lucide-react';
import { AIChatModal } from '../AIChatModal';

export function AIHelpSection() {
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMode, setChatMode] = useState<'general' | 'doctor' | 'test' | 'medicine'>('general');

  const handleQuickAction = (action: 'doctor' | 'test' | 'medicine') => {
    setChatMode(action);
    setShowAIChat(true);
  };

  const handleOpenGeneral = () => {
    setChatMode('general');
    setShowAIChat(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-[#F0F9FF] via-white to-[#F0F9FF] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-[#007EFC]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#007EFC]/10 to-[#10B981]/10 px-6 py-3 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-[#007EFC]" />
              <span className="font-semibold text-[#030213]">AI-Powered Healthcare Assistant</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#030213] mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
              Our AI assistant is here to help! Get personalized recommendations for doctors, lab tests, and medicines based on your symptoms.
            </p>
          </div>

          {/* Main AI Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#007EFC]/10">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#030213] mb-4">
                    Ask Our AI Assistant
                  </h3>
                  <p className="text-[#64748B] mb-6 leading-relaxed">
                    Describe your symptoms or health concerns, and our AI will guide you to the right healthcare solution. Available 24/7 for instant assistance.
                  </p>
                  <button
                    onClick={handleOpenGeneral}
                    className="group bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#007EFC]/30 transition-all inline-flex items-center gap-3"
                  >
                    <Sparkles className="w-6 h-6" />
                    Start AI Consultation
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-[#007EFC]/5 to-[#10B981]/5 rounded-2xl p-8 border-2 border-dashed border-[#007EFC]/20">
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#007EFC] to-[#0066DD] rounded-xl flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#64748B] mb-1">Example question:</p>
                          <p className="text-sm font-medium text-[#030213]">"I have a headache and fever..."</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#64748B] mb-1">AI Response:</p>
                          <p className="text-sm font-medium text-[#030213]">"Here's a doctor + lab test + medicine for you..."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-[rgba(0,0,0,0.06)] pt-8">
                <h4 className="font-semibold text-[#030213] mb-4 text-center">Or choose a quick action:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleQuickAction('doctor')}
                    className="group bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] hover:from-[#007EFC] hover:to-[#0066DD] rounded-2xl p-6 transition-all border-2 border-[#007EFC]/10 hover:border-[#007EFC]"
                  >
                    <Stethoscope className="w-10 h-10 text-[#007EFC] group-hover:text-white mb-3 mx-auto" />
                    <h5 className="font-semibold text-[#030213] group-hover:text-white mb-2">Find a Doctor</h5>
                    <p className="text-sm text-[#64748B] group-hover:text-white/90">Get matched with the right specialist</p>
                  </button>

                  <button
                    onClick={() => handleQuickAction('test')}
                    className="group bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] hover:from-[#10B981] hover:to-[#059669] rounded-2xl p-6 transition-all border-2 border-[#10B981]/10 hover:border-[#10B981]"
                  >
                    <FlaskConical className="w-10 h-10 text-[#10B981] group-hover:text-white mb-3 mx-auto" />
                    <h5 className="font-semibold text-[#030213] group-hover:text-white mb-2">Recommend Tests</h5>
                    <p className="text-sm text-[#64748B] group-hover:text-white/90">Discover which tests you need</p>
                  </button>

                  <button
                    onClick={() => handleQuickAction('medicine')}
                    className="group bg-gradient-to-br from-[#FEF3C7] to-[#FED7AA] hover:from-[#F59E0B] hover:to-[#EA580C] rounded-2xl p-6 transition-all border-2 border-[#F59E0B]/10 hover:border-[#F59E0B]"
                  >
                    <Pill className="w-10 h-10 text-[#F59E0B] group-hover:text-white mb-3 mx-auto" />
                    <h5 className="font-semibold text-[#030213] group-hover:text-white mb-2">Medicine Info</h5>
                    <p className="text-sm text-[#64748B] group-hover:text-white/90">Learn about medications</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: CheckCircle, text: 'Instant AI responses', color: 'text-[#10B981]' },
                { icon: Lock, text: '100% private & secure', color: 'text-[#007EFC]' },
                { icon: Sparkles, text: 'Personalized recommendations', color: 'text-[#F59E0B]' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium text-[#64748B]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        initialMode={chatMode}
      />
    </>
  );
}
