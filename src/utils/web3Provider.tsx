import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

type Props = {
  children: React.ReactNode;
};

export default function Web3Provider({ children }: Props) {
  const alchemy = process.env.NEXT_PUBLIC_ALCHEMY;

  const { chains } = configureChains(
    [chain.goerli],
    [alchemyProvider({ apiKey: alchemy }), publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: `The Guestbook`,
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider(config) {
      return new providers.AlchemyProvider(config.chainId, alchemy);
    },
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
