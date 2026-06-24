import { RegisterFormState } from '../types';

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    fullName: string;
    email: string;
  };
}

export const authService = {
  /**
   * Register a new user in the archives.
   */
  async register(form: RegisterFormState): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return {
      success: true,
      message: data.message || 'Registration complete',
      user: data.user,
      token: data.token
    };
  },

  /**
   * Log in to verify signature and identity.
   */
  async login(credentials: { email: string; password?: string }): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return {
      success: true,
      message: data.message || 'Signature verified',
      user: data.user,
      token: data.token
    };
  },

  /**
   * Fetch authenticated user details of active session.
   */
  async getCurrentUser(): Promise<AuthResponse> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
      }
      throw new Error(data.error || 'No active session');
    }

    return {
      success: true,
      message: 'Active session resolved',
      user: data.user,
      token: token || undefined
    };
  },

  /**
   * Clear secure session and log out.
   */
  async logout(): Promise<{ success: boolean; message: string }> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers
    });

    // Always guarantee cleanup of localStorage
    localStorage.removeItem('token');

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Logout failed');
    }

    return {
      success: true,
      message: data.message || 'Session closed'
    };
  },

  /**
   * Request password reset link.
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Password reset request failed');
    }

    return {
      success: true,
      message: data.message || 'Password reset link sent'
    };
  },

  /**
   * Complete password reset flow.
   */
  async resetPassword(payload: { email: string; password?: string; confirmPassword?: string }): Promise<{ success: boolean; message: string }> {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Password update failed');
    }

    return {
      success: true,
      message: data.message || 'Password updated successfully'
    };
  }
};
