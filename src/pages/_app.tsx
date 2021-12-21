import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/layout/MainLayout';
import MatomoProvider from '@/components/analitics/MatomoProvider';
import store from '@/app/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistor from '@/app/persistor';
import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Theme from '@/components/layout/Theme';

library.add(faCommentDots);

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={persistor.store}>
      <PersistGate loading={null} persistor={persistor.persistor}>
        <MatomoProvider>
          <Head>
            <title>The Most Annoying Website</title>
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
