import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import CookieBar from '@/components/CookieBar';
import { ChatBubble } from '@/components/chat_bubble';
import { WheelOfFortune } from '@/components/wheel_of_fortune';
import { cssVars } from '@/styles/theme';
import { useAppSelector } from '@/redux/hooks';
import ContainerGiftFlaps from '../gifts/ContainerGiftFlaps';

const StyledLayout = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: ${cssVars.spacing.container};
  padding: 0 ${cssVars.spacing.gap};
  margin: 0 auto;
  background: ${cssVars.color.surface};
`;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { wheelOfFortune, mockChat } = useAppSelector(state => state.experience);

  return <>
    <ContainerGiftFlaps />
    <StyledLayout>
      <Header />
      {children}
      <Footer />

      {wheelOfFortune && <WheelOfFortune />}
      {mockChat && <ChatBubble />}
      <CookieBar />
    </StyledLayout>
  </>;
}
