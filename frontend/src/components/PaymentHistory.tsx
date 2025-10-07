import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { paymentAPI } from '../services/api';
import {
    Card,
    Grid,
    LoadingSpinner,
    StatusBadge,
    Title
} from '../styles/GlobalStyles';
import { Payment } from '../types';

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await paymentAPI.getMyPayments();
      setPayments(data);
    } catch (error: any) {
      toast.error('Erro ao carregar histórico de pagamentos');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return status;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Title>Meus Pagamentos</Title>
      
      {payments.length === 0 ? (
        <Card>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Você ainda não fez nenhum pagamento.
          </p>
        </Card>
      ) : (
        <Grid columns={1}>
          {payments.map((payment) => (
            <Card key={payment.id}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>
                    {payment.product.name}
                  </h3>
                  <p style={{ color: '#666', margin: '0' }}>
                    ID da Transação: {payment.transactionId}
                  </p>
                </div>
                <StatusBadge status={payment.status}>
                  {getStatusText(payment.status)}
                </StatusBadge>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginTop: '16px'
              }}>
                <div>
                  <strong>Valor:</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#007bff' }}>
                    R$ {payment.amount.toFixed(2)}
                  </p>
                </div>
                
                <div>
                  <strong>Método de Pagamento:</strong>
                  <p style={{ margin: '4px 0 0 0' }}>
                    {payment.paymentMethod.toUpperCase()}
                  </p>
                </div>
                
                <div>
                  <strong>Data:</strong>
                  <p style={{ margin: '4px 0 0 0' }}>
                    {formatDate(payment.createdAt)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      )}
    </>
  );
};

export default PaymentHistory;