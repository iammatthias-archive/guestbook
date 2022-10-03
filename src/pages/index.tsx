import Link from 'next/link';
import { useAccount, useBlockNumber, useNetwork } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Info from '@/components/info';
import Guestlist from '@/components/guestlist';
import Mint from '@/components/mint';

import {
  listSection,
  meta,
  metaItem,
  overflow,
  section,
  stickySection,
} from '@/styles/styles.css';

export default function Home() {
  const contract = process.env.NEXT_PUBLIC_CONTRACT;
  const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN;

  const { address } = useAccount();
  const { data: block } = useBlockNumber({
    chainId: 5,
  });
  const { chain } = useNetwork();

  return (
    <>
      <section className={`${section} ${stickySection}`}>
        <Info />
        <ConnectButton chainStatus="none" />
        {address && <Mint />}
      </section>
      <section className={`${section} ${listSection}`}>
        <div className={meta}>
          <div className={metaItem}>
            <h4>Contract</h4>
            <p className={overflow}>
              <Link href={etherscan + `address/` + contract} passHref>
                <a>{contract}</a>
              </Link>
            </p>
          </div>
          {block && (
            <div className={metaItem}>
              <h4>Block</h4>
              <p>{block}</p>
            </div>
          )}
          {chain && (
            <div className={metaItem}>
              <h4>Chain</h4>
              <p>{chain.name}</p>
            </div>
          )}
        </div>
        <Guestlist />
      </section>
    </>
  );
}
