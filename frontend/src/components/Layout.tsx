import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Header, Nav, NavLink, NavLinks, UserInfo } from '../styles/GlobalStyles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <Header>
        <Container>
          <Nav>
            <h2>E-Commerce</h2>
            {user && (
              <NavLinks>
                <NavLink onClick={() => window.location.href = '/'}>
                  Produtos
                </NavLink>
                <NavLink onClick={() => window.location.href = '/add-product'}>
                  Adicionar Produto
                </NavLink>
                <NavLink onClick={() => window.location.href = '/payments'}>
                  Meus Pagamentos
                </NavLink>
              </NavLinks>
            )}
            {user ? (
              <UserInfo>
                <span>Olá, {user.name}</span>
                <NavLink onClick={logout}>Sair</NavLink>
              </UserInfo>
            ) : (
              <NavLinks>
                <NavLink onClick={() => window.location.href = '/login'}>
                  Login
                </NavLink>
                <NavLink onClick={() => window.location.href = '/register'}>
                  Cadastrar
                </NavLink>
              </NavLinks>
            )}
          </Nav>
        </Container>
      </Header>
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;