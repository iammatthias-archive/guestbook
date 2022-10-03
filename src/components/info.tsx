import { logo, logoWrapper } from '@/styles/styles.css';

export default function Info() {
  return (
    <>
      <div className={logoWrapper}>
        <h1 className={logo}>
          ▀█▀ █░█ █▀▀
          <br />
          ░█░ █▀█ █▄▄
        </h1>
        <h1 className={logo}>
          █▀▀ █░█ █▀▀ █▀ ▀█▀ █▄▄ █▀█ █▀█ █▄▀
          <br />
          █▄█ █▄█ ██▄ ▄█ ░█░ █▄█ █▄█ █▄█ █░█
        </h1>
      </div>
      <p>
        <em>The Guestbook</em> is a web3 project where visitors can leave a
        friendly message on-chain.
      </p>
      <p>
        There is a 140 character limit for messages shared on{` `}
        <em>The Guestbook</em>
        . Only specified characters are allowed.
        <br />
        <sub>
          abcdefghijklmnopqrstuvwxyz
          <br />
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          0123456789&apos; &apos;,.
        </sub>
      </p>
      <p>
        An admin function exists for content moderation. Inflammatory content
        will be modified. Please be kind ✌️
      </p>
    </>
  );
}
