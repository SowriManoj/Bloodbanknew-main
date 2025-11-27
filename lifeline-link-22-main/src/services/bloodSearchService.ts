import api from './api';

export interface BloodBank {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email?: string;
  latitude: number;
  longitude: number;
  openHours: string;
  rating: number;
  isVerified: boolean;
  bloodAvailability: Record<string, number>;
}

export interface Donor {
  id: number;
  name: string;
  bloodType: string;
  city: string;
  state: string;
  totalDonations: number;
  lastDonationDate?: string;
  compatibility?: string;
}

export interface BloodSearchParams {
  bloodType?: string;
  city?: string;
  radius?: number;
  latitude?: number;
  longitude?: number;
}

export const bloodSearchService = {
  searchBloodBanks: async (params: BloodSearchParams): Promise<BloodBank[]> => {
    const response = await api.get('/blood-search/blood-banks', { params });
    return response.data;
  },

  searchDonors: async (bloodType: string, city?: string): Promise<Donor[]> => {
    const params = { bloodType, ...(city && { city }) };
    const response = await api.get('/blood-search/donors', { params });
    return response.data;
  },

  findCompatibleDonors: async (recipientBloodType: string, city?: string): Promise<Donor[]> => {
    const params = { recipientBloodType, ...(city && { city }) };
    const response = await api.get('/blood-search/compatible-donors', { params });
    return response.data;
  }
};