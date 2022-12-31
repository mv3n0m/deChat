import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { mainnet } from "wagmi/chains";
import { Provider } from 'react-redux';
import { storeRedux } from '../utils';
import type { AppProps } from 'next/app';
import './globals.css'

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});


function App({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig config={config}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Provider store={storeRedux}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default App;