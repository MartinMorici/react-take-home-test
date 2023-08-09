/* eslint-disable @next/next/no-img-element */
import api from '@/api';
import Image from 'next/image';

export default async function Home() {
  const ballots = await api.ballot.fetch();
  console.log(ballots);

  return (
    <main className=''>
      {ballots.map((ballot) => {
        return (
          <section key={ballot.id} className='container mx-auto px-2'>
            <h2 className='bg-[#FF6F61] text-5xl py-4 my-4'>{ballot.title}</h2>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_350px))] justify-center xl:justify-between gap-10'>
              {ballot.items.map((nominee) => {
                return (
                  <article className='bg-[#009B86] p-2' key={nominee.title}>
                    <h3 className='text-2xl my-2'>{nominee.title}</h3>
                    <img className=' w-full h-[480px] object-cover' src={nominee.photoUrL} alt={nominee.title} /> 
                    <button className=' w-[150px] h-12 text-lg block mx-auto mt-4 bg-[#FF6F61] '>Select</button>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
