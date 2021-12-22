import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/master/MainLayout';
import MatomoProvider from '@/components/analitics/MatomoProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistor from '@/redux/persistor';
import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentDots, faMapMarkerAlt, faTags, faTimes } from '@fortawesome/free-solid-svg-icons';
import Theme from '@/components/master/Theme';
import useFirstInteraction from '@/hooks/useFirstInteraction';

library.add(faCommentDots);
library.add(faTimes);
library.add(faTags);
library.add(faMapMarkerAlt)

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  useFirstInteraction(persistor.store);

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
