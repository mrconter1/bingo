import type { Metadata } from 'next';
import Bingo from '../components/Bingo';

export const metadata: Metadata = {
  title: 'Play Party Bingo - Interactive Party Game',
  description: 'Start playing Party Bingo! Get your random set of fun party challenges and start completing them with friends. Perfect for parties and social gatherings.',
};

export default function Home() {
  return (
    <main>
      <Bingo />
    </main>
  );
}
