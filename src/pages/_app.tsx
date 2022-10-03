import type { AppProps } from 'next/app';
import '@/styles/reset.css';
import Web3Provider from '@/utils/web3Provider';
import Layout from '@/components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  );
}
