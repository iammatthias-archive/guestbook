import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

type Props = {
  children: React.ReactNode;
};

export default function Web3Provider({ children }: Props) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.goerli],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: `My RainbowKit App`,
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: `#000`,
          accentColorForeground: `white`,
          borderRadius: `none`,
          fontStack: `system`,
          overlayBlur: `small`,
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
