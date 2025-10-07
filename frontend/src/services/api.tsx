import axios from 'axios';
import { AuthResponse, Payment, Product, User } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// APIs de autenticação
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, cpf: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { name, email, cpf, password });
    return response.data;
  },

  verify: async (): Promise<{ valid: boolean; user: User }> => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

// APIs de produtos
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
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

// APIs de pagamento
export const paymentAPI = {
  createPix: async (productId: number, amount: number): Promise<any> => {
    const response = await api.post('/payments/pix', { productId, amount });
    return response.data;
  },

  confirmPix: async (transactionId: string): Promise<any> => {
    const response = await api.post(`/payments/pix/${transactionId}/confirm`);
    return response.data;
  },

  getMyPayments: async (): Promise<Payment[]> => {
    const response = await api.get('/payments/my-payments');
    return response.data;
  },

  getPaymentStatus: async (transactionId: string): Promise<any> => {
    const response = await api.get(`/payments/status/${transactionId}`);
    return response.data;
  },
};

export default api;