import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { paymentAPI, productAPI } from '../services/api';
import {
    Button,
    Grid,
    LoadingSpinner,
    Modal,
    ModalContent,
    PixCard,
    PixKey,
    ProductCard,
    ProductDescription,
    ProductImage,
    ProductPrice,
    ProductTitle,
    Title
} from '../styles/GlobalStyles';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyProduct = async (product: Product) => {
    setSelectedProduct(product);
    setPaymentLoading(true);
    
    try {
      const payment = await paymentAPI.createPix(product.id, product.price);
      setPaymentData(payment.payment);
      toast.success('PIX gerado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao gerar PIX');
      setSelectedProduct(null);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentData) return;

    try {
      await paymentAPI.confirmPix(paymentData.transactionId);
      toast.success('Pagamento confirmado com sucesso!');
      setSelectedProduct(null);
      setPaymentData(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao confirmar pagamento');
    }
  };

  const copyPixKey = () => {
    if (paymentData?.pixKey) {
      navigator.clipboard.writeText(paymentData.pixKey);
      toast.success('Chave PIX copiada para a área de transferência!');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Title>Produtos Disponíveis</Title>
      
      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Nenhum produto encontrado.
        </p>
      ) : (
        <Grid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              {product.image_url && (
                <ProductImage 
                  src={product.image_url} 
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
                  }}
                />
              )}
              <ProductTitle>{product.name}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Estoque: {product.stock} unidades
              </p>
              <p style={{ color: '#666', fontSize: '12px' }}>
                Categoria: {product.category}
              </p>
              <Button 
                variant="primary" 
                onClick={() => handleBuyProduct(product)}
                disabled={product.stock === 0}
                style={{ width: '100%' }}
              >
                {product.stock === 0 ? 'Esgotado' : 'Comprar com PIX'}
              </Button>
            </ProductCard>
          ))}
        </Grid>
      )}

      <Modal isOpen={!!selectedProduct}>
        <ModalContent>
          {paymentLoading ? (
            <LoadingSpinner />
          ) : paymentData ? (
            <PixCard>
              <Title>Pagamento PIX</Title>
              <h3>{selectedProduct?.name}</h3>
              <ProductPrice>R$ {paymentData.amount.toFixed(2)}</ProductPrice>
              
              <p><strong>Instruções:</strong></p>
              <p>{paymentData.instructions}</p>
              
              <p><strong>Chave PIX:</strong></p>
              <PixKey onClick={copyPixKey} style={{ cursor: 'pointer' }}>
                {paymentData.pixKey}
              </PixKey>
              <small>Clique na chave acima para copiar</small>
              
              <p style={{ fontSize: '12px', color: '#666' }}>
                Expira em: {new Date(paymentData.expiresAt).toLocaleString()}
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Button 
                  variant="primary" 
                  onClick={handleConfirmPayment}
                  style={{ flex: 1 }}
                >
                  Confirmar Pagamento
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setSelectedProduct(null);
                    setPaymentData(null);
                  }}
                  style={{ flex: 1 }}
                >
                  Cancelar
                </Button>
              </div>
            </PixCard>
          ) : (
            <div>
              <Title>Erro</Title>
              <p>Erro ao gerar pagamento PIX</p>
              <Button onClick={() => setSelectedProduct(null)}>
                Fechar
              </Button>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductList;