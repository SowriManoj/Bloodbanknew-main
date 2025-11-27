import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  bloodType: string;
  age: number;
  city: string;
  state: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  bloodType: string;
  role: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;
    
    // Store token and user data
    localStorage.setItem('bloodconnect_token', data.token);
    localStorage.setItem('bloodconnect_user', JSON.stringify({
      id: data.id.toString(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      bloodType: data.bloodType,
      avatar: ''
    }));
    
    return data;
  },

  signup: async (userData: SignupRequest): Promise<{ message: string }> => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('bloodconnect_token');
    localStorage.removeItem('bloodconnect_user');
  },

  validateToken: async (): Promise<AuthResponse | null> => {
    try {
      const token = localStorage.getItem('bloodconnect_token');
      if (!token) return null;

      const response = await api.post('/auth/validate-token');
      return response.data;
    } catch (error) {
      console.error('Token validation failed:', error);
      return null;
    }
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('bloodconnect_user');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('bloodconnect_token');
  }
};