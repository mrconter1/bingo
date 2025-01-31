import type { Metadata } from 'next';
import BingoList from '../../components/BingoList';

export const metadata: Metadata = {
  title: 'Party Bingo - All Challenges List',
  description: 'Complete list of all 50 party bingo challenges with their IDs and icons.',
  robots: 'noindex, nofollow', // Hide this page from search engines
};

export default function ListPage() {
  return (
    <main>
      <BingoList />
    </main>
  );
} 