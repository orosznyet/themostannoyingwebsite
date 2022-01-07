import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useAppSelector } from '@/redux/hooks';
import { selectAllowAnalytics } from '@/redux/stores/consent';

const AutoTrackingProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const enabled = useAppSelector(selectAllowAnalytics)
  const { trackPageView } = useMatomo();

  useEffect(() => {
    if (!enabled) { return }

    trackPageView({});
    router.events.on('routeChangeComplete', (route: string) => {
      trackPageView({
        // documentTitle: document.title,
        // href: window.location.href,
      });
    });
  }, [enabled]);

  return <>{children}</>;
};

export default AutoTrackingProvider;
