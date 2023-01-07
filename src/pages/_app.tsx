import type { AppProps, AppContext } from 'next/app';
import Layout from '../components/global/Layout';
import '../../styles/globals.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <CookiesProvider>
        {process.env.NODE_ENV !== 'production' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
