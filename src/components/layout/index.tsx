import { content, layout } from './layout.css';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={layout}>
      <div className={content}>{children}</div>
    </div>
  );
}
