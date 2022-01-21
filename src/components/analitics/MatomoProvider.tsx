import { MatomoProvider as MatomoProviderBase, createInstance } from '@datapunt/matomo-tracker-react';
import AutoTrackingProvider from './AutoTrackingProvider';

const instance = createInstance({
  urlBase: 'https://steaway.com',
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

const MatomoProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <MatomoProviderBase value={instance}>
      <AutoTrackingProvider>{children}</AutoTrackingProvider>
    </MatomoProviderBase>
  );
};

export default MatomoProvider;
