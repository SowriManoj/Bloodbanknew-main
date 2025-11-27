import api from './api';

export interface FeedbackData {
  category: string;
  rating: number;
  subject: string;
  message: string;
  contactEmail?: string;
  allowContact: boolean;
  anonymous: boolean;
}

export interface Feedback {
  id: number;
  category: string;
  rating: number;
  subject: string;
  message: string;
  status: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackStats {
  averageRating: number;
  totalFeedback: number;
  pendingFeedback: number;
  resolvedFeedback: number;
}

export interface RecentFeedback {
  id: number;
  category: string;
  rating: number;
  subject: string;
  message: string;
  userName: string;
  createdAt: string;
}

export const feedbackService = {
  submitFeedback: async (feedbackData: FeedbackData): Promise<{ message: string }> => {
    const response = await api.post('/feedback/submit', feedbackData);
    return response.data;
  },

  getMyFeedback: async (): Promise<Feedback[]> => {
    const response = await api.get('/feedback/my-feedback');
    return response.data;
  },

  getRecentFeedback: async (limit: number = 10): Promise<RecentFeedback[]> => {
    const response = await api.get('/feedback/recent', { params: { limit } });
    return response.data;
  },

  getFeedbackStats: async (): Promise<FeedbackStats> => {
    const response = await api.get('/feedback/stats');
    return response.data;
  }
};