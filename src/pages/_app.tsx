import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/master/MainLayout';
import MatomoProvider from '@/components/analitics/MatomoProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import redux from '@/redux/store';
import Head from 'next/head';
import registerIcons from '@/utils/icons';
import Theme from '@/components/master/Theme';
import useFirstInteraction from '@/hooks/useFirstInteraction';
import useInFocusMeter from '@/hooks/useInFocusMeter';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  useFirstInteraction(redux.store);
  useInFocusMeter(redux.store);
  registerIcons();

  return (
    <Provider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
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
