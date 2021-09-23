import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import MainLayout from '@/components/MainLayout';
import { MatomoProvider, createInstance, useMatomo } from '@datapunt/matomo-tracker-react';
import { useEffect } from 'react';

const instance = createInstance({
  urlBase: 'https://themostannoyingwebsite.matomo.cloud',
  siteId: 1,
  disabled: false,
  heartBeat: {
    active: true,
    seconds: 10,
  },
  linkTracking: true,
  configurations: {
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST',
  },
});

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
    router.events.on('routeChangeComplete', (route: string) => {
      trackPageView({
        // documentTitle: document.title,
        // href: window.location.href,
      });
    });
  }, []);

  return (
    <MatomoProvider value={instance}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </MatomoProvider>
  );
};

export default TheMostAnnoyingWebsite;
