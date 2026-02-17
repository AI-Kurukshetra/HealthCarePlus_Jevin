import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  X,
  Lock,
  Send,
  Stethoscope,
  FlaskConical,
  Pill,
  ArrowRight,
  CheckCircle,
  Star,
  User,
  Bot,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: Suggestion[];
  quickReplies?: string[];
}

interface Suggestion {
  type: 'doctor' | 'lab' | 'pharmacy';
  title: string;
  subtitle: string;
  description: string;
  rating?: number;
  price?: string;
  badge?: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'general' | 'doctor' | 'test' | 'medicine';
}

// ─── Symptom Analysis Engine ─────────────────────────────────────────────────

interface AnalysisResult {
  condition: string;
  severity: 'mild' | 'moderate' | 'serious';
  doctors: Suggestion[];
  labs: Suggestion[];
  medicines: Suggestion[];
  followUp: string;
  advice: string;
}

function analyzeSymptoms(text: string): AnalysisResult {
  const lower = text.toLowerCase();

  // Fever / Cold / Flu
  if (
    lower.includes('fever') ||
    lower.includes('cold') ||
    lower.includes('flu') ||
    lower.includes('chill')
  ) {
    return {
      condition: 'Fever / Flu-like symptoms',
      severity: lower.includes('high fever') || lower.includes('very sick') ? 'serious' : 'moderate',
      followUp: 'How long have you had these symptoms? Do you also have body aches or a sore throat?',
      advice:
        'Stay hydrated, get plenty of rest, and monitor your temperature. If fever exceeds 103°F or persists beyond 3 days, seek immediate medical attention.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Priya Sharma',
          subtitle: 'General Physician',
          description: '15+ yrs experience | MBBS, MD Internal Medicine',
          rating: 4.9,
          price: '₹499',
          badge: 'Top Rated',
        },
        {
          type: 'doctor',
          title: 'Dr. Rajesh Kumar',
          subtitle: 'Internal Medicine',
          description: '12 yrs experience | MBBS, DNB General Medicine',
          rating: 4.8,
          price: '₹399',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Complete Blood Count (CBC)',
          subtitle: 'Blood Test',
          description: 'Checks for infections, anemia, and overall health',
          price: '₹350',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Dengue NS1 + IgM/IgG',
          subtitle: 'Blood Test',
          description: 'Rule out dengue fever especially during monsoon',
          price: '₹800',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Paracetamol 500mg',
          subtitle: 'Fever & Pain Relief',
          description: 'Take 1 tablet every 6 hours as needed (max 4/day)',
          price: '₹30',
          badge: 'OTC',
        },
        {
          type: 'pharmacy',
          title: 'Electral Powder (ORS)',
          subtitle: 'Oral Rehydration',
          description: 'Mix with 1L water, drink throughout the day',
          price: '₹25',
        },
      ],
    };
  }

  // Headache / Migraine
  if (lower.includes('headache') || lower.includes('migraine') || lower.includes('head pain')) {
    return {
      condition: 'Headache / Migraine',
      severity: lower.includes('severe') || lower.includes('worst') ? 'serious' : 'mild',
      followUp:
        'Is the headache on one side or both? Do you experience sensitivity to light or nausea?',
      advice:
        'Rest in a quiet, dark room. Stay hydrated and avoid screen time. If headaches are frequent, a neurologist consultation is recommended.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Anita Desai',
          subtitle: 'Neurologist',
          description: '18 yrs experience | MBBS, DM Neurology',
          rating: 4.9,
          price: '₹799',
          badge: 'Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Vikram Patel',
          subtitle: 'General Physician',
          description: '10 yrs experience | MBBS, MD',
          rating: 4.7,
          price: '₹399',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Thyroid Profile (T3, T4, TSH)',
          subtitle: 'Blood Test',
          description: 'Thyroid issues can cause chronic headaches',
          price: '₹500',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Eye Examination',
          subtitle: 'Vision Test',
          description: 'Vision problems are a common headache trigger',
          price: '₹300',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Ibuprofen 400mg',
          subtitle: 'Anti-inflammatory',
          description: 'Take 1 tablet with food, up to 3 times daily',
          price: '₹45',
          badge: 'OTC',
        },
        {
          type: 'pharmacy',
          title: 'Migraine Relief Balm',
          subtitle: 'Topical Pain Relief',
          description: 'Apply gently on forehead and temples',
          price: '₹120',
        },
      ],
    };
  }

  // Cough / Breathing
  if (
    lower.includes('cough') ||
    lower.includes('breathing') ||
    lower.includes('chest') ||
    lower.includes('wheezing') ||
    lower.includes('asthma')
  ) {
    return {
      condition: 'Respiratory symptoms',
      severity:
        lower.includes('chest pain') || lower.includes('difficulty breathing')
          ? 'serious'
          : 'moderate',
      followUp:
        'Is the cough dry or with phlegm? Do you have any difficulty breathing or chest tightness?',
      advice:
        'Avoid smoke, dust and cold air. Use steam inhalation for relief. If you experience chest pain or difficulty breathing, seek emergency care immediately.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Suresh Reddy',
          subtitle: 'Pulmonologist',
          description: '20 yrs experience | MBBS, MD Pulmonology',
          rating: 4.9,
          price: '₹699',
          badge: 'Top Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Meera Iyer',
          subtitle: 'General Physician',
          description: '8 yrs experience | MBBS, PGDM',
          rating: 4.6,
          price: '₹349',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Chest X-Ray',
          subtitle: 'Imaging',
          description: 'Check for lung infections or abnormalities',
          price: '₹500',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Pulmonary Function Test',
          subtitle: 'Breathing Test',
          description: 'Measures lung capacity and airflow',
          price: '₹1,200',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Benadryl Cough Syrup',
          subtitle: 'Cough Suppressant',
          description: '10ml three times daily after meals',
          price: '₹95',
          badge: 'OTC',
        },
        {
          type: 'pharmacy',
          title: 'Steam Inhaler Capsules',
          subtitle: 'Decongestant',
          description: 'Use 1 capsule with hot water for steam inhalation',
          price: '₹60',
        },
      ],
    };
  }

  // Skin problems
  if (
    lower.includes('skin') ||
    lower.includes('rash') ||
    lower.includes('acne') ||
    lower.includes('itch') ||
    lower.includes('allergy') ||
    lower.includes('hives')
  ) {
    return {
      condition: 'Skin / Allergy concerns',
      severity: lower.includes('severe') || lower.includes('swelling') ? 'moderate' : 'mild',
      followUp:
        'Where exactly is the rash/irritation located? Have you recently changed any products or eaten something new?',
      advice:
        'Avoid scratching the affected area. Use mild soap and lukewarm water. Avoid known allergens and wear breathable fabrics.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Kavita Nair',
          subtitle: 'Dermatologist',
          description: '14 yrs experience | MBBS, MD Dermatology',
          rating: 4.8,
          price: '₹599',
          badge: 'Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Arjun Menon',
          subtitle: 'Allergist',
          description: '10 yrs experience | MBBS, DM Allergy & Immunology',
          rating: 4.7,
          price: '₹649',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Allergy Panel (IgE Test)',
          subtitle: 'Blood Test',
          description: 'Identifies specific allergens triggering reactions',
          price: '₹1,500',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Complete Blood Count (CBC)',
          subtitle: 'Blood Test',
          description: 'Checks for elevated eosinophils indicating allergy',
          price: '₹350',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Cetirizine 10mg',
          subtitle: 'Antihistamine',
          description: 'Take 1 tablet at bedtime for allergy relief',
          price: '₹35',
          badge: 'OTC',
        },
        {
          type: 'pharmacy',
          title: 'Calamine Lotion',
          subtitle: 'Topical Relief',
          description: 'Apply on affected area 2-3 times daily',
          price: '₹90',
        },
      ],
    };
  }

  // Stomach / Digestive
  if (
    lower.includes('stomach') ||
    lower.includes('digest') ||
    lower.includes('nausea') ||
    lower.includes('vomit') ||
    lower.includes('diarr') ||
    lower.includes('acidity') ||
    lower.includes('gastric') ||
    lower.includes('bloat')
  ) {
    return {
      condition: 'Digestive / Stomach issues',
      severity: lower.includes('blood') || lower.includes('severe pain') ? 'serious' : 'moderate',
      followUp:
        'Are you experiencing any nausea, vomiting, or changes in bowel movements? When did the symptoms start?',
      advice:
        'Eat light, bland foods like khichdi and curd. Avoid spicy, oily foods and alcohol. Stay well hydrated with ORS or coconut water.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Rakesh Gupta',
          subtitle: 'Gastroenterologist',
          description: '16 yrs experience | MBBS, DM Gastroenterology',
          rating: 4.9,
          price: '₹749',
          badge: 'Top Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Sonal Mehta',
          subtitle: 'General Physician',
          description: '9 yrs experience | MBBS, DNB Family Medicine',
          rating: 4.7,
          price: '₹399',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Stool Routine & Microscopy',
          subtitle: 'Stool Test',
          description: 'Detects infections, parasites, and abnormalities',
          price: '₹200',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'H. Pylori Antigen Test',
          subtitle: 'Blood/Stool Test',
          description: 'Checks for stomach ulcer-causing bacteria',
          price: '₹600',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Pantoprazole 40mg',
          subtitle: 'Antacid',
          description: 'Take 1 tablet 30 min before breakfast',
          price: '₹65',
          badge: 'OTC',
        },
        {
          type: 'pharmacy',
          title: 'Ondansetron 4mg',
          subtitle: 'Anti-nausea',
          description: 'Take 1 tablet as needed for nausea/vomiting',
          price: '₹40',
        },
      ],
    };
  }

  // Back / Joint / Bone pain
  if (
    lower.includes('back pain') ||
    lower.includes('joint') ||
    lower.includes('knee') ||
    lower.includes('bone') ||
    lower.includes('spine') ||
    lower.includes('muscle pain') ||
    lower.includes('shoulder')
  ) {
    return {
      condition: 'Musculoskeletal pain',
      severity: lower.includes('severe') || lower.includes('unable to move') ? 'serious' : 'moderate',
      followUp:
        'Where exactly is the pain? Did it start after an injury, or did it develop gradually?',
      advice:
        'Apply ice for the first 48 hours, then switch to warm compresses. Gentle stretching may help. Avoid heavy lifting and poor posture.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Sanjay Joshi',
          subtitle: 'Orthopedist',
          description: '20 yrs experience | MBBS, MS Orthopedics',
          rating: 4.9,
          price: '₹699',
          badge: 'Top Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Neha Singh',
          subtitle: 'Physiotherapist',
          description: '8 yrs experience | BPT, MPT Orthopedic Rehab',
          rating: 4.8,
          price: '₹449',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'X-Ray (Affected Area)',
          subtitle: 'Imaging',
          description: 'Check for fractures, bone spurs, or arthritis',
          price: '₹400',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Vitamin D + Calcium Test',
          subtitle: 'Blood Test',
          description: 'Deficiencies can cause bone and muscle pain',
          price: '₹700',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Diclofenac Gel',
          subtitle: 'Topical Pain Relief',
          description: 'Apply on affected area 3-4 times daily',
          price: '₹110',
          badge: 'OTC',
        },
        {
          type: 'pharmacy',
          title: 'Muscle Relaxant Spray',
          subtitle: 'Quick Relief',
          description: 'Spray on affected area for instant relief',
          price: '₹180',
        },
      ],
    };
  }

  // Mental Health
  if (
    lower.includes('anxiety') ||
    lower.includes('depress') ||
    lower.includes('stress') ||
    lower.includes('sleep') ||
    lower.includes('insomnia') ||
    lower.includes('panic') ||
    lower.includes('mental')
  ) {
    return {
      condition: 'Mental Health & Wellness',
      severity: lower.includes('suicid') || lower.includes('self-harm') ? 'serious' : 'moderate',
      followUp:
        'How long have you been feeling this way? Has it been affecting your daily routine or sleep?',
      advice:
        'Remember, seeking help is a sign of strength. Practice deep breathing, maintain a routine, and talk to someone you trust. Professional help can make a significant difference.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Pooja Verma',
          subtitle: 'Psychiatrist',
          description: '12 yrs experience | MBBS, MD Psychiatry',
          rating: 4.9,
          price: '₹899',
          badge: 'Top Rated',
        },
        {
          type: 'doctor',
          title: 'Dr. Amit Kapoor',
          subtitle: 'Clinical Psychologist',
          description: '10 yrs experience | MPhil Clinical Psychology',
          rating: 4.8,
          price: '₹699',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Thyroid Profile (T3, T4, TSH)',
          subtitle: 'Blood Test',
          description: 'Thyroid imbalance can mimic anxiety/depression',
          price: '₹500',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Vitamin B12 + D3 Levels',
          subtitle: 'Blood Test',
          description: 'Deficiencies linked to mood disorders',
          price: '₹600',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Melatonin 3mg',
          subtitle: 'Sleep Support',
          description: 'Take 1 tablet 30 min before bedtime',
          price: '₹250',
          badge: 'Supplement',
        },
        {
          type: 'pharmacy',
          title: 'Ashwagandha Capsules',
          subtitle: 'Stress Relief',
          description: 'Take 1 capsule twice daily after meals',
          price: '₹320',
        },
      ],
    };
  }

  // Heart
  if (
    lower.includes('heart') ||
    lower.includes('blood pressure') ||
    lower.includes('bp') ||
    lower.includes('palpitation') ||
    lower.includes('cholesterol')
  ) {
    return {
      condition: 'Cardiovascular concerns',
      severity: 'serious',
      followUp:
        'Are you experiencing chest pain, shortness of breath, or irregular heartbeats? Any family history of heart disease?',
      advice:
        'Monitor your blood pressure regularly. Reduce salt intake, exercise regularly, and manage stress. Seek immediate help if you experience sudden chest pain.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Ashwin Rao',
          subtitle: 'Cardiologist',
          description: '22 yrs experience | MBBS, DM Cardiology',
          rating: 4.9,
          price: '₹999',
          badge: 'Senior Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Deepa Krishnan',
          subtitle: 'Internal Medicine',
          description: '14 yrs experience | MBBS, MD Internal Medicine',
          rating: 4.8,
          price: '₹599',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'Lipid Profile',
          subtitle: 'Blood Test',
          description: 'Checks cholesterol, triglycerides, HDL, LDL',
          price: '₹450',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'ECG (Electrocardiogram)',
          subtitle: 'Heart Test',
          description: 'Records heart electrical activity',
          price: '₹300',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Aspirin 75mg',
          subtitle: 'Blood Thinner',
          description: 'As prescribed by your cardiologist',
          price: '₹30',
          badge: 'Rx Required',
        },
        {
          type: 'pharmacy',
          title: 'Omega-3 Fish Oil',
          subtitle: 'Heart Health Supplement',
          description: 'Take 1 capsule daily with meals',
          price: '₹450',
        },
      ],
    };
  }

  // Diabetes / Sugar
  if (
    lower.includes('diabetes') ||
    lower.includes('sugar') ||
    lower.includes('insulin') ||
    lower.includes('thirst') ||
    lower.includes('frequent urination')
  ) {
    return {
      condition: 'Diabetes / Blood Sugar concerns',
      severity: 'moderate',
      followUp:
        'Do you have a known history of diabetes? Have you noticed increased thirst, frequent urination, or unexplained weight loss?',
      advice:
        'Monitor your blood sugar levels regularly. Follow a balanced diet low in refined carbs and sugar. Regular exercise helps manage blood sugar levels.',
      doctors: [
        {
          type: 'doctor',
          title: 'Dr. Ramesh Agarwal',
          subtitle: 'Endocrinologist',
          description: '18 yrs experience | MBBS, DM Endocrinology',
          rating: 4.9,
          price: '₹799',
          badge: 'Specialist',
        },
        {
          type: 'doctor',
          title: 'Dr. Swati Bhatt',
          subtitle: 'Diabetologist',
          description: '12 yrs experience | MBBS, Fellowship in Diabetes',
          rating: 4.8,
          price: '₹599',
        },
      ],
      labs: [
        {
          type: 'lab',
          title: 'HbA1c (Glycated Hemoglobin)',
          subtitle: 'Blood Test',
          description: '3-month average blood sugar level',
          price: '₹400',
          badge: 'Recommended',
        },
        {
          type: 'lab',
          title: 'Fasting Blood Sugar + PP',
          subtitle: 'Blood Test',
          description: 'Fasting and post-meal glucose levels',
          price: '₹250',
        },
      ],
      medicines: [
        {
          type: 'pharmacy',
          title: 'Glucometer Kit',
          subtitle: 'Home Monitoring',
          description: 'Monitor blood sugar at home with 50 test strips',
          price: '₹899',
          badge: 'Essential',
        },
        {
          type: 'pharmacy',
          title: 'Sugar-Free Supplements',
          subtitle: 'Nutritional Support',
          description: 'Sugar-free multivitamin for diabetic patients',
          price: '₹350',
        },
      ],
    };
  }

  // Default / General
  return {
    condition: 'General Health Concern',
    severity: 'mild',
    followUp:
      'Could you describe your symptoms in more detail? When did they start, and have you noticed anything that makes them better or worse?',
    advice:
      'For a comprehensive evaluation, I recommend consulting a general physician who can guide you on the right course of treatment and any necessary tests.',
    doctors: [
      {
        type: 'doctor',
        title: 'Dr. Priya Sharma',
        subtitle: 'General Physician',
        description: '15+ yrs experience | MBBS, MD Internal Medicine',
        rating: 4.9,
        price: '₹499',
        badge: 'Top Rated',
      },
      {
        type: 'doctor',
        title: 'Dr. Arun Kapoor',
        subtitle: 'Family Medicine',
        description: '10 yrs experience | MBBS, DNB Family Medicine',
        rating: 4.7,
        price: '₹349',
      },
    ],
    labs: [
      {
        type: 'lab',
        title: 'Full Body Health Checkup',
        subtitle: '70+ Parameters',
        description: 'CBC, Lipid Profile, Thyroid, Liver, Kidney & more',
        price: '₹1,499',
        badge: 'Best Value',
      },
      {
        type: 'lab',
        title: 'Basic Health Package',
        subtitle: '30+ Parameters',
        description: 'CBC, Blood Sugar, Urine Routine, Lipid Profile',
        price: '₹699',
      },
    ],
    medicines: [
      {
        type: 'pharmacy',
        title: 'Daily Multivitamin',
        subtitle: 'General Wellness',
        description: 'Take 1 tablet daily after breakfast',
        price: '₹350',
        badge: 'Recommended',
      },
      {
        type: 'pharmacy',
        title: 'Immunity Booster Pack',
        subtitle: 'Vitamin C + Zinc',
        description: 'Supports overall immune system health',
        price: '₹280',
      },
    ],
  };
}

// ─── Mode-specific starters ──────────────────────────────────────────────────

function getModeStarter(mode: 'doctor' | 'test' | 'medicine'): string {
  switch (mode) {
    case 'doctor':
      return "I'd like to find a doctor. Let me tell you about my symptoms so you can recommend the right specialist.";
    case 'test':
      return "I want to know which lab tests I should get. Can you recommend tests based on my health concerns?";
    case 'medicine':
      return "I need help finding the right medicine. Can you suggest something for my symptoms?";
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AIChatModal({ isOpen, onClose, initialMode }: AIChatModalProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState<
    'welcome' | 'listening' | 'followup' | 'recommending'
  >('welcome');
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInputValue('');
      setIsTyping(false);
      setConversationStage('welcome');
      setLastAnalysis(null);
    }
  }, [isOpen]);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome-1',
        role: 'ai',
        content:
          "Hello! 👋 I'm your AI Health Assistant. I'm here to help you find the right doctor, recommend lab tests, or suggest medicines based on your symptoms.\n\nPlease describe what you're experiencing, and I'll guide you to the best healthcare solution.",
        timestamp: new Date(),
        quickReplies: [
          '🤒 I have a fever',
          '🤕 I have a headache',
          '😮‍💨 I have a cough',
          '🤢 Stomach problems',
          '😰 Feeling stressed',
          '💪 Joint/back pain',
        ],
      };
      setMessages([welcomeMsg]);
      setConversationStage('listening');

      // If a specific mode was selected, auto-send a starter message
      if (initialMode && initialMode !== 'general') {
        const starterText = getModeStarter(initialMode);
        setTimeout(() => {
          const userMsg: Message = {
            id: `user-init-${Date.now()}`,
            role: 'user',
            content: starterText,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, userMsg]);
          setIsTyping(true);

          setTimeout(() => {
            const modeResponse: Message = {
              id: `ai-mode-${Date.now()}`,
              role: 'ai',
              content:
                initialMode === 'doctor'
                  ? "Great! I'll help you find the perfect doctor. Could you tell me about your symptoms? For example, what's been bothering you — pain, discomfort, any specific area of concern?"
                  : initialMode === 'test'
                    ? "I'll help you figure out which lab tests are right for you. What health concerns or symptoms are you experiencing? Or would you like a general health checkup recommendation?"
                    : "I'll help you find the right medicine. Please describe your symptoms in detail — what's been bothering you, when it started, and how severe it is.",
              timestamp: new Date(),
              quickReplies:
                initialMode === 'test'
                  ? [
                      '🔬 General health checkup',
                      '🩸 Blood sugar concerns',
                      '❤️ Heart health check',
                      '🦴 Bone & vitamin check',
                    ]
                  : undefined,
            };
            setIsTyping(false);
            setMessages((prev) => [...prev, modeResponse]);
          }, 1200);
        }, 500);
      }
    }
  }, [isOpen]);

  // Handle user message send
  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const analysis = analyzeSymptoms(userMsg.content);
    setLastAnalysis(analysis);

    if (conversationStage === 'listening') {
      // First symptom — ask follow-up
      setTimeout(() => {
        const followUpMsg: Message = {
          id: `ai-followup-${Date.now()}`,
          role: 'ai',
          content: `I understand you're experiencing **${analysis.condition}**. Let me ask a few more questions to better understand your situation.\n\n${analysis.followUp}`,
          timestamp: new Date(),
          quickReplies: [
            '📅 Started recently (1-3 days)',
            '📆 About a week ago',
            '🗓️ More than 2 weeks',
            '⏳ It comes and goes',
          ],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, followUpMsg]);
        setConversationStage('followup');
      }, 1500);
    } else if (conversationStage === 'followup') {
      // Second response — provide full recommendations
      setTimeout(() => {
        const severityLabel =
          analysis.severity === 'serious'
            ? '⚠️ High Priority'
            : analysis.severity === 'moderate'
              ? '⚡ Moderate Attention'
              : '✅ Low Severity';

        const recommendationMsg: Message = {
          id: `ai-recommend-${Date.now()}`,
          role: 'ai',
          content: `Thank you for the details. Based on your symptoms, here's my assessment:\n\n**Condition:** ${analysis.condition}\n**Severity:** ${severityLabel}\n\n**💡 Advice:** ${analysis.advice}\n\nI've prepared personalized recommendations for you below. You can consult a doctor, book lab tests, or explore medication options:`,
          timestamp: new Date(),
          suggestions: [...analysis.doctors, ...analysis.labs, ...analysis.medicines],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, recommendationMsg]);
        setConversationStage('recommending');
      }, 2000);
    } else {
      // Already in recommending stage — handle follow-up questions
      const newAnalysis = analyzeSymptoms(userMsg.content);
      setTimeout(() => {
        const msg: Message = {
          id: `ai-more-${Date.now()}`,
          role: 'ai',
          content: `Based on your additional question about **${newAnalysis.condition}**, here are my updated recommendations:\n\n**💡 Advice:** ${newAnalysis.advice}\n\nHere are the specialists, tests, and medicines I recommend:`,
          timestamp: new Date(),
          suggestions: [...newAnalysis.doctors, ...newAnalysis.labs, ...newAnalysis.medicines],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, msg]);
      }, 1800);
    }
  };

  // Handle quick reply
  const handleQuickReply = (reply: string) => {
    setInputValue(reply.replace(/^[^\w]*/, '')); // strip emoji prefix
    // Auto send after setting
    const cleaned = reply.replace(/^[^\w]*/, '').trim();
    if (!cleaned) return;
    const userMsg: Message = {
      id: `user-qr-${Date.now()}`,
      role: 'user',
      content: reply,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const analysis = analyzeSymptoms(reply);
    setLastAnalysis(analysis);

    if (conversationStage === 'listening') {
      setTimeout(() => {
        const followUpMsg: Message = {
          id: `ai-followup-${Date.now()}`,
          role: 'ai',
          content: `I understand you're experiencing **${analysis.condition}**. Let me ask a few more questions.\n\n${analysis.followUp}`,
          timestamp: new Date(),
          quickReplies: [
            '📅 Started recently (1-3 days)',
            '📆 About a week ago',
            '🗓️ More than 2 weeks',
            '⏳ It comes and goes',
          ],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, followUpMsg]);
        setConversationStage('followup');
      }, 1500);
    } else if (conversationStage === 'followup') {
      const currentAnalysis = lastAnalysis || analysis;
      setTimeout(() => {
        const severityLabel =
          currentAnalysis.severity === 'serious'
            ? '⚠️ High Priority'
            : currentAnalysis.severity === 'moderate'
              ? '⚡ Moderate Attention'
              : '✅ Low Severity';

        const recommendationMsg: Message = {
          id: `ai-recommend-${Date.now()}`,
          role: 'ai',
          content: `Thank you for the details. Here's my assessment:\n\n**Condition:** ${currentAnalysis.condition}\n**Severity:** ${severityLabel}\n\n**💡 Advice:** ${currentAnalysis.advice}\n\nHere are your personalized recommendations:`,
          timestamp: new Date(),
          suggestions: [
            ...currentAnalysis.doctors,
            ...currentAnalysis.labs,
            ...currentAnalysis.medicines,
          ],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, recommendationMsg]);
        setConversationStage('recommending');
      }, 2000);
    } else {
      setTimeout(() => {
        const msg: Message = {
          id: `ai-more-${Date.now()}`,
          role: 'ai',
          content: `Here are additional recommendations based on your query:\n\n**💡 Advice:** ${analysis.advice}`,
          timestamp: new Date(),
          suggestions: [...analysis.doctors, ...analysis.labs, ...analysis.medicines],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, msg]);
      }, 1800);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: Suggestion) => {
    onClose();
    switch (suggestion.type) {
      case 'doctor':
        navigate('/consultations');
        break;
      case 'lab':
        navigate('/labs');
        break;
      case 'pharmacy':
        navigate('/pharmacy');
        break;
    }
  };

  // Reset chat
  const handleReset = () => {
    setMessages([]);
    setConversationStage('welcome');
    setLastAnalysis(null);
    setInputValue('');
    // Re-trigger welcome
    setTimeout(() => {
      const welcomeMsg: Message = {
        id: `welcome-${Date.now()}`,
        role: 'ai',
        content:
          "Hello! 👋 I'm your AI Health Assistant. How can I help you today?\n\nDescribe your symptoms and I'll recommend the right doctors, tests, and medicines for you.",
        timestamp: new Date(),
        quickReplies: [
          '🤒 I have a fever',
          '🤕 I have a headache',
          '😮‍💨 I have a cough',
          '🤢 Stomach problems',
          '😰 Feeling stressed',
          '💪 Joint/back pain',
        ],
      };
      setMessages([welcomeMsg]);
      setConversationStage('listening');
    }, 100);
  };

  // Format message content with bold
  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={j} className="font-semibold text-[#030213]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
          {i < content.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  const getSuggestionConfig = (type: 'doctor' | 'lab' | 'pharmacy') => {
    switch (type) {
      case 'doctor':
        return {
          icon: Stethoscope,
          gradient: 'from-[#007EFC] to-[#0066DD]',
          bg: 'bg-[#F0F9FF]',
          border: 'border-[#007EFC]/20',
          buttonBg: 'bg-[#007EFC] hover:bg-[#0066DD]',
          label: 'Book Consultation',
        };
      case 'lab':
        return {
          icon: FlaskConical,
          gradient: 'from-[#10B981] to-[#059669]',
          bg: 'bg-[#ECFDF5]',
          border: 'border-[#10B981]/20',
          buttonBg: 'bg-[#10B981] hover:bg-[#059669]',
          label: 'Book Lab Test',
        };
      case 'pharmacy':
        return {
          icon: Pill,
          gradient: 'from-[#F59E0B] to-[#EA580C]',
          bg: 'bg-[#FFFBEB]',
          border: 'border-[#F59E0B]/20',
          buttonBg: 'bg-[#F59E0B] hover:bg-[#D97706]',
          label: 'Order Medicine',
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#007EFC] via-[#0066DD] to-[#0052BB] p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Health Assistant</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <p className="text-white/80 text-sm">Online &bull; Ready to help</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-all"
              title="New conversation"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-xl p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === 'ai' ? (
                /* AI Message */
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#007EFC] to-[#0066DD] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 max-w-[85%]">
                    <div className="bg-[#F8FAFC] rounded-2xl rounded-tl-md p-5 text-[#334155] leading-relaxed">
                      {formatContent(msg.content)}
                    </div>

                    {/* Quick Replies */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.quickReplies.map((reply, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickReply(reply)}
                            className="px-4 py-2 bg-white border-2 border-[#E2E8F0] hover:border-[#007EFC] hover:bg-[#F0F9FF] rounded-full text-sm font-medium text-[#334155] hover:text-[#007EFC] transition-all"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Suggestion Cards */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {/* Group by type */}
                        {(['doctor', 'lab', 'pharmacy'] as const).map((type) => {
                          const items = msg.suggestions!.filter((s) => s.type === type);
                          if (items.length === 0) return null;
                          const config = getSuggestionConfig(type);
                          const Icon = config.icon;
                          const sectionTitle =
                            type === 'doctor'
                              ? '👨‍⚕️ Recommended Doctors'
                              : type === 'lab'
                                ? '🔬 Recommended Lab Tests'
                                : '💊 Suggested Medicines';

                          return (
                            <div key={type}>
                              <p className="text-sm font-semibold text-[#64748B] mb-2 mt-4">
                                {sectionTitle}
                              </p>
                              <div className="space-y-2">
                                {items.map((suggestion, idx) => (
                                  <div
                                    key={idx}
                                    className={`${config.bg} border ${config.border} rounded-2xl p-4 hover:shadow-md transition-all`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div
                                        className={`w-10 h-10 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                                      >
                                        <Icon className="w-5 h-5 text-white" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <h4 className="font-semibold text-[#030213]">
                                                {suggestion.title}
                                              </h4>
                                              {suggestion.badge && (
                                                <span
                                                  className={`text-xs px-2 py-0.5 rounded-full font-medium bg-gradient-to-r ${config.gradient} text-white`}
                                                >
                                                  {suggestion.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-sm text-[#64748B]">
                                              {suggestion.subtitle}
                                            </p>
                                          </div>
                                          {suggestion.price && (
                                            <span className="font-bold text-[#030213] whitespace-nowrap">
                                              {suggestion.price}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-sm text-[#64748B] mt-1">
                                          {suggestion.description}
                                        </p>
                                        {suggestion.rating && (
                                          <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                                            <span className="text-sm font-medium text-[#030213]">
                                              {suggestion.rating}
                                            </span>
                                          </div>
                                        )}
                                        <button
                                          onClick={() => handleSuggestionClick(suggestion)}
                                          className={`mt-3 inline-flex items-center gap-2 px-4 py-2 ${config.buttonBg} text-white rounded-xl text-sm font-medium transition-colors`}
                                        >
                                          {config.label}
                                          <ArrowRight className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-xs text-[#94A3B8] mt-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ) : (
                /* User Message */
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-[80%]">
                    <div className="bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white rounded-2xl rounded-tr-md p-5 leading-relaxed">
                      {msg.content}
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-2 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="w-9 h-9 bg-[#E2E8F0] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-5 h-5 text-[#64748B]" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#007EFC] to-[#0066DD] rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#F8FAFC] rounded-2xl rounded-tl-md px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-[#007EFC] rounded-full animate-bounce [animation-delay:0ms]"></div>
                  <div className="w-2.5 h-2.5 bg-[#007EFC] rounded-full animate-bounce [animation-delay:150ms]"></div>
                  <div className="w-2.5 h-2.5 bg-[#007EFC] rounded-full animate-bounce [animation-delay:300ms]"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-[rgba(0,0,0,0.06)] p-4 flex-shrink-0 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your symptoms or ask a health question..."
              className="flex-1 px-5 py-3.5 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#007EFC] transition-colors text-[#030213] placeholder:text-[#94A3B8]"
              disabled={isTyping}
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3.5 bg-gradient-to-r from-[#007EFC] to-[#0066DD] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#007EFC]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] mt-3">
            <Lock className="w-3 h-3 text-[#10B981]" />
            <span>End-to-end encrypted &bull; Your data is never shared &bull; AI-assisted guidance only</span>
          </div>
        </div>
      </div>
    </div>
  );
}