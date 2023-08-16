import api from '@/api';
import BallotClientPage from './client';

export default async function Home() {
  const ballots = await api.ballot.fetch();

  return (
    <main>
      <h2 className='text-center  text-3xl sm:text-5xl py-4 my-4'>✨ AWARDS 2021 ✨</h2>
      <BallotClientPage ballots={ballots} />
    </main>
  );
}
