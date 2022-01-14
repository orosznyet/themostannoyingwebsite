import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/master/Layout';
import Head from 'next/head';
import Provider from '@/components/master/Provider';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Head>
        <title>The Most Annoying Website</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default TheMostAnnoyingWebsite;
