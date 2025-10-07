import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productAPI } from '../services/api';
import {
    Button,
    ErrorMessage,
    FormContainer,
    FormGroup,
    Input,
    Label,
    Title
} from '../styles/GlobalStyles';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.name || !formData.price) {
      setError('Nome e preço são obrigatórios');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Preço deve ser um número maior que zero');
      return;
    }

    const stock = formData.stock ? parseInt(formData.stock) : 0;
    if (isNaN(stock) || stock < 0) {
      setError('Estoque deve ser um número maior ou igual a zero');
      return;
    }

    setLoading(true);

    try {
      await productAPI.create({
        name: formData.name,
        description: formData.description,
        price: price,
        image_url: formData.image_url,
        category: formData.category || 'Geral',
        stock: stock
      });

      toast.success('Produto criado com sucesso!');
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar produto';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer style={{ maxWidth: '600px' }}>
      <Title>Adicionar Produto</Title>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="name">Nome do Produto *:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descrição:</Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite a descrição do produto"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '16px',
              minHeight: '100px',
              fontFamily: 'inherit'
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Preço (R$) *:</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image_url">URL da Imagem:</Label>
          <Input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Categoria:</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '16px'
            }}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Roupas">Roupas</option>
            <option value="Casa">Casa</option>
            <option value="Livros">Livros</option>
            <option value="Esportes">Esportes</option>
            <option value="Geral">Geral</option>
          </select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="stock">Estoque:</Label>
          <Input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
            disabled={loading}
          />
        </FormGroup>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? 'Criando...' : 'Criar Produto'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate('/')}
            disabled={loading}
            style={{ flex: 1 }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default AddProduct;