import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/MainLayout';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default TheMostAnnoyingWebsite;
