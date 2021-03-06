import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '@/components/master/Layout';
import Provider from '@/components/master/Provider';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  const description = "Self-proclaimed most annoying website on the web with so many disgusting features of modern websites you might even vomit at some point."
  return (
    <Provider>
      <Head>
        <title>The Most Annoying Website</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2f0031" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/appicon.png" />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content="/assets/social.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Most Annoying Website" />
        <meta name="robots" content="follow" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default TheMostAnnoyingWebsite;
