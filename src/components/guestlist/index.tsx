import { useContractRead } from 'wagmi';
import abi from '@/contract/abi.json';
import { guestWrapper, address, block, message } from './guestlist.css';
import { overflow } from '@/styles/styles.css';
import ENS from '@/components/ens';
import Link from 'next/link';

export default function Guestlist() {
  const contract = `0x68f682a56C210752d055Dc46A15d60149a291524`;
  const etherscan = `https://goerli.etherscan.io/`;
  const opensea = `https://testnets.opensea.io/assets/goerli/`;

  const {
    data: allGuests,
    isLoading,
    isError,
  } = useContractRead({
    addressOrName: contract,
    contractInterface: abi.abi,
    functionName: `getAllGuests`,
    cacheOnBlock: true,

    // watch: true,
    // cacheTime: 2_000,
    chainId: 5,
  } as any);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p>Error...</p>
      </div>
    );
  }

  if (allGuests) {
    const guestlist = allGuests.slice().reverse();
    return (
      <>
        {guestlist.map((guest: any, index: number) => (
          <div key={index} className={guestWrapper}>
            <p className={`${address} ${overflow}`}>
              <Link href={etherscan + `address/` + guest[0]} passHref>
                <a>
                  <ENS address={guest[0]} />
                </a>
              </Link>
            </p>
            <p className={block}>
              <Link href={etherscan + `block/` + guest[2]} passHref>
                <a>@ {guest[2]}</a>
              </Link>
            </p>
            <p className={message}>{guest[1]}</p>
            <p>
              <small>
                <Link href={opensea + contract + `/` + index} passHref>
                  <a>opensea</a>
                </Link>
              </small>
            </p>
          </div>
        ))}
      </>
    );
  }
  return <></>;
}
