import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  allergies?: string;
  chronicConditions?: string;
  currentMedications?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  memberSince?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser({
      ...userData,
      dateOfBirth: userData.dateOfBirth || '1992-06-15',
      gender: userData.gender || 'Female',
      bloodGroup: userData.bloodGroup || 'O+',
      address: userData.address || '42 Marine Drive',
      city: userData.city || 'Mumbai',
      state: userData.state || 'Maharashtra',
      zipCode: userData.zipCode || '400001',
      allergies: userData.allergies || 'Penicillin',
      chronicConditions: userData.chronicConditions || 'None',
      currentMedications: userData.currentMedications || 'Vitamin D supplements',
      emergencyContactName: userData.emergencyContactName || 'Rahul Johnson',
      emergencyContactPhone: userData.emergencyContactPhone || '+91 98765 43211',
      emergencyContactRelation: userData.emergencyContactRelation || 'Spouse',
      memberSince: userData.memberSince || '2024-03-10',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
