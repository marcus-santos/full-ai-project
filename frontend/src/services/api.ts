import axios, { AxiosResponse } from 'axios';
import { AuthResponse, Payment, Product, User } from '../types';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar token de autorização
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (name: string, email: string, cpf: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', {
      name,
      email,
      cpf,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  verify: async (): Promise<{ valid: boolean; user: User }> => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response: AxiosResponse<Product[]> = await api.get('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response: AxiosResponse<Product> = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (product: Omit<Product, 'id' | 'created_at'>): Promise<{ message: string; product: Product }> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  update: async (id: number, product: Omit<Product, 'id' | 'created_at'>): Promise<{ message: string; product: Product }> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const paymentAPI = {
  createPix: async (productId: number, amount: number) => {
    const response = await api.post('/payments/pix', {
      productId,
      amount,
    });
    return response.data;
  },

  confirmPix: async (transactionId: string) => {
    const response = await api.post(`/payments/pix/${transactionId}/confirm`);
    return response.data;
  },

  getMyPayments: async (): Promise<Payment[]> => {
    const response: AxiosResponse<Payment[]> = await api.get('/payments/my-payments');
    return response.data;
  },

  getStatus: async (transactionId: string) => {
    const response = await api.get(`/payments/status/${transactionId}`);
    return response.data;
  },
};

export default api;