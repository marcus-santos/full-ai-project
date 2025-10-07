export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  created_at: string;
}

export interface Payment {
  id: number;
  transactionId: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, cpf: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}