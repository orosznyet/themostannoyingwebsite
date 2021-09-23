import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const AutoTrackingProvider = ({ children }: React.PropsWithChildren<{}>) => {
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

  return <>{children}</>;
};

export default AutoTrackingProvider;
