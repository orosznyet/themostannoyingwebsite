import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Head from 'next/head';
import Footer from './Footer';

const Layout = styled.div`
  min-height: 100vh;
  max-width: 1024px;
  padding: 0 var(--gap);
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout>
      <Head>
        <title>The Most Annoying Website</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />
    </Layout>
  );
}
