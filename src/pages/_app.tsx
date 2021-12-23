import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/master/MainLayout';
import MatomoProvider from '@/components/analitics/MatomoProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistor from '@/redux/persistor';
import Head from 'next/head';
import registerIcons from '@/app/icons';
import Theme from '@/components/master/Theme';
import useFirstInteraction from '@/hooks/useFirstInteraction';
import useInFocusMeter from '@/hooks/useInFocusMeter';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  useFirstInteraction(persistor.store);
  useInFocusMeter(persistor.store);
  registerIcons();

  return (
    <Provider store={persistor.store}>
      <PersistGate loading={null} persistor={persistor.persistor}>
        <MatomoProvider>
          <Head>
            <title>The Most Annoying Website</title>
            <link rel="icon" type="image/png" href="/favicon.png" />
          </Head>
          <Theme>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Theme>
        </MatomoProvider>
      </PersistGate>
    </Provider>
  );
};

export default TheMostAnnoyingWebsite;
