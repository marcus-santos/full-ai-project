import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  background: ${props => 
    props.variant === 'primary' ? '#007bff' :
    props.variant === 'danger' ? '#dc3545' :
    '#6c757d'
  };
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => 
      props.variant === 'primary' ? '#0056b3' :
      props.variant === 'danger' ? '#c82333' :
      '#545b62'
    };
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = styled.header`
  background: #007bff;
  color: white;
  padding: 16px 0;
  margin-bottom: 20px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProductCard = styled(Card)`
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const ProductTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
`;

export const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #007bff;
  margin: 8px 0;
`;

export const ProductDescription = styled.p`
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const FormContainer = styled(Card)`
  max-width: 400px;
  margin: 50px auto;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 24px;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const PixCard = styled(Card)`
  background: #f8f9fa;
  border: 2px solid #007bff;
  text-align: center;
`;

export const PixKey = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  margin: 16px 0;
  font-family: monospace;
  font-size: 12px;
  word-break: break-all;
  color: #333;
`;

export const StatusBadge = styled.span<{ status: string }>`
  background: ${props => 
    props.status === 'confirmed' ? '#28a745' :
    props.status === 'pending' ? '#ffc107' :
    '#dc3545'
  };
  color: ${props => props.status === 'pending' ? '#000' : '#fff'};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`;