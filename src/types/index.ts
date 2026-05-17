export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  total_sessions: number;
  avg_duration: number;
  ai_used: number;
  last_session: string | null;
}

export interface CallSession {
  id: string;
  user_id: string;
  duration: number;
  ai_used: boolean;
  status: string;
  created_at: string;
}

export interface CallStats {
  total_sessions: number;
  avg_duration: number;
  ai_sessions: number;
}

export interface Feedback {
  id: string;
  rating: number;
  comment: string;
  timestamp: string;
}
