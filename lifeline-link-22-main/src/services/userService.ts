import api from './api';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bloodType: string;
  age: number;
  city: string;
  state: string;
  totalDonations: number;
  points: number;
  isAvailable: boolean;
  lastDonationDate?: string;
  createdAt: string;
}

export interface BloodDonation {
  id: number;
  donationDate: string;
  bloodType: string;
  unitsDonated: number;
  status: string;
  type: string;
  notes?: string;
  bloodBank?: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
  };
}

export interface DashboardStats {
  totalDonations: number;
  points: number;
  lastDonationDate?: string;
  bloodType: string;
  isAvailable: boolean;
  nextEligibleDate?: string;
}

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (updates: Partial<UserProfile>): Promise<{ message: string }> => {
    const response = await api.put('/users/profile', updates);
    return response.data;
  },

  getDonations: async (): Promise<BloodDonation[]> => {
    const response = await api.get('/users/donations');
    return response.data;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/users/dashboard-stats');
    return response.data;
  }
};