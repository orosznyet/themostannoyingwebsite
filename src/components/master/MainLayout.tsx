import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Head from 'next/head';
import Footer from './Footer';
import CookieBar from '@/components/CookieBar';
import { ChatBubble } from '@/components/chat_bubble';
import { WheelOfFortune } from '@/components/wheel_of_fortune';
import { cssVars } from './Theme';
import { useBeforeUnload } from 'react-use';
import { useAppSelector } from '@/redux/hooks';

const Layout = styled.div`
  min-height: 100vh;
  max-width: 1024px;
  padding: 0 ${cssVars.spacing.gap};
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const experience = useAppSelector(state => state.experience);
  useBeforeUnload(
    experience.exitPrompt,
    `I'd reconsider leaving before some bad things happend to you. Are you sure?`
  );

  return (
    <Layout>
      <Head>
        <title>The Most Annoying Website</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />

      {experience.wheelOfFortune && <WheelOfFortune />}
      {experience.mockChat && <ChatBubble />}
      <CookieBar />
    </Layout>
  );
}
