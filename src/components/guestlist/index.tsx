import { useContractRead, useContractEvent } from 'wagmi';
import abi from '@/contract/abi.json';
import { guestWrapper, address, block, message } from './guestlist.css';
import { overflow } from '@/styles/styles.css';
import ENS from '@/components/ens';
import Link from 'next/link';

export default function Guestlist() {
  const contract = process.env.NEXT_PUBLIC_CONTRACT;
  const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN;
  const opensea = process.env.NEXT_PUBLIC_OPENSEA;

  const {
    data: allGuests,
    isLoading,
    isError,
  } = useContractRead({
    addressOrName: `${contract}`,
    contractInterface: abi.abi,
    functionName: `getAllGuests`,
    cacheOnBlock: true,
    chainId: 5,
  } as any);

  useContractEvent({
    addressOrName: `${contract}`,
    contractInterface: abi.abi,
    eventName: `NewGuest`,
    listener: (event) => console.log(event),
  });

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
                <a target="_blank">
                  <ENS address={guest[0]} />
                </a>
              </Link>
            </p>
            <p className={block}>
              {/* <Link href={etherscan + `block/` + guest[2]} passHref> */}
              <Link href={`${etherscan}block/${guest[2]}`} passHref>
                <a target="_blank">{guest[2]}</a>
              </Link>
            </p>
            <p className={message}>{guest[1]}</p>
            <p>
              <small>
                <Link passHref href={`${opensea}${contract}/${index}`}>
                  <a target="_blank">opensea</a>
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
