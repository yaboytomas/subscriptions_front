const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Remove trailing slash if present
const normalizeUrl = (url: string) => url.replace(/\/$/, '');

export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subscriptionRenewalDate: string;
  subscriptionAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ClientData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subscriptionRenewalDate: string;
  subscriptionAmount: number;
  notes?: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'An error occurred');
  }
  
  return data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const apiService = {
  // Auth methods
  login: async (data: LoginData): Promise<User> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/users/loginUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await handleResponse(response);
    localStorage.setItem('token', result.token);
    return result;
  },
  
  register: async (data: RegisterData): Promise<User> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/users/registerUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await handleResponse(response);
    localStorage.setItem('token', result.token);
    return result;
  },
  
  logout: async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${normalizeUrl(API_BASE_URL)}/users/logoutUser`, {
          method: 'POST',
          headers: getAuthHeaders()
        });
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
    }
    localStorage.removeItem('token');
  },
  
  getProfile: async (): Promise<User> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/users/getProfile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/users/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return handleResponse(response);
  },
  
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/users/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return handleResponse(response);
  },
  
  // Client methods
  getClients: async (): Promise<Client[]> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  
  getClientById: async (id: string): Promise<Client> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  
  getClientByEmail: async (email: string): Promise<Client> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients/email/${email}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  
  createClient: async (data: ClientData): Promise<Client> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  
  updateClient: async (id: string, data: ClientData): Promise<Client> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  
  patchClient: async (id: string, data: Partial<ClientData>): Promise<Client> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  
  deleteClient: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${normalizeUrl(API_BASE_URL)}/clients/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export { ApiError }; 