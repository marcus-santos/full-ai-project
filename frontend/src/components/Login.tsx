import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Button,
    ErrorMessage,
    FormContainer,
    FormGroup,
    Input,
    Label,
    Title
} from '../styles/GlobalStyles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  return (
    <FormContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            disabled={isLoading}
          />
        </FormGroup>

        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        Não tem uma conta?{' '}
        <a 
          href="/register" 
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          Cadastre-se
        </a>
      </p>
    </FormContainer>
  );
};

export default Login;