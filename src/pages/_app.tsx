import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/MainLayout';
import MatomoProvider from '@/components/analitics/MatomoProvider';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  return (
    <MatomoProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </MatomoProvider>
  );
};

export default TheMostAnnoyingWebsite;
