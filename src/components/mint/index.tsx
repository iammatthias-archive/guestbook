import Link from 'next/link';
import he from 'he';
import { useState } from 'react';
import {
  useAccount,
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useIsMounted } from '@/utils/useIsMounted';

import abi from '@/contract/abi.json';

import { button, input } from './mint.css';

export default function Mint() {
  const contract = `0x68f682a56C210752d055Dc46A15d60149a291524`;
  const etherscan = `https://goerli.etherscan.io/`;

  const { data: blockData } = useBlockNumber();

  const { address } = useAccount();

  const isMounted = useIsMounted();

  const [message, setMessage] = useState(``);

  const encodedMessage = he.encode(message ? message : `gm`);

  // write with mint
  const { config: mintConfig } = usePrepareContractWrite({
    addressOrName: contract,
    contractInterface: abi.abi,
    functionName: `mint`,
    args: [encodedMessage],
  });

  const {
    data: mintData,
    isError: mintError,
    isLoading: mintLoading,
    reset: mintReset,
    write: mint,
  } = useContractWrite(mintConfig);

  // transaction data
  const {
    data: txData,
    isError: txError,
    isLoading: txLoading,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  if (mintError) {
    return (
      <div>
        <button className={button} onClick={mintReset}>
          Reset
        </button>
      </div>
    );
  }

  if (mintLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (mintData) {
    if (txLoading) return <div>Processing…</div>;
    if (txError) return <div>Transaction error</div>;
    return (
      <div>
        <p>
          Tx:{` `}
          <Link href={etherscan + `tx/` + mintData.hash} passHref>
            <a>{txData?.transactionHash}</a>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <button className={button} onClick={mint as any}>
        Write Message
      </button>
      <form>
        <input
          id="message"
          placeholder="gm"
          onChange={(event) => setMessage(event.target.value)}
          className={input}
        />
      </form>
    </>
  );
}
