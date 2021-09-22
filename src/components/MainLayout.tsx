import { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Layout = styled.div`
  min-height: 100vh;
  max-width: 1024px;
  padding: 0 var(--gap);
  margin: 0 auto;
`;

type MainLayoutProps = {
  children: ReactChild | ReactChild[] | ReactChildren;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout>
      <Header />
      {children}
      <Footer />
    </Layout>
  );
}
