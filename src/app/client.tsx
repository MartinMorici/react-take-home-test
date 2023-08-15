/* eslint-disable @next/next/no-img-element */
'use client';
import { Ballot } from '@/types';
import React, { useState } from 'react';

type Props = {
  ballots: Ballot[];
};

type Vote = {
  id: string;
  nominee: string;
};

const BallotClientPage = ({ ballots }: Props) => {
  const [votes, setVotes] = useState<Vote[]>([]);

  const handleVotes = (id: string, nominee: string) => {
    let currentVotes;

    // Se votó en esta categoría?
    if (votes.find((vote) => vote.id === id)) {

      // Si se votó quito esa última votación, no importa si es la misma que estoy seleccionando
      const filteredVotes = votes.filter((vote) => vote.id !== id);

      // Actualizo la lista de votos con el elemento seleccionado.
      currentVotes = [...filteredVotes, { id: id, nominee: nominee }];
      setVotes(currentVotes);
    } else {
      currentVotes = [...votes, { id: id, nominee: nominee }];
      setVotes(currentVotes);
    }
  };

  return (
    <>
      {ballots.map((ballot) => {
        return (
          <section key={ballot.id} className='container mx-auto px-2'>
            <h2 className='bg-[#FF6F61] text-5xl py-4 px-4 my-4 mt-16'>{ballot.title}</h2>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,380px))] justify-center gap-10'>
              {ballot.items.map((nominee) => {
                const isSelected = votes.find((vote) => vote.nominee === nominee.title);
                return (
                  <article className={` ${isSelected ? 'bg-[#009B86]' : ''} rounded-md p-2 `} key={nominee.title}>
                    <h3 className='text-2xl my-2 overflow-hidden text-ellipsis whitespace-nowrap'>{nominee.title}</h3>
                    <img className=' rounded-md w-full h-[550px] object-cover' src={nominee.photoUrL} alt={nominee.title} />
                    <button className='rounded-md w-[150px] h-12 text-lg block mx-auto mt-4 bg-[#FF6F61] hover:bg-[#ed6053] transition-all' onClick={() => handleVotes(ballot.id, nominee.title)}>
                      VOTE
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      <button className='fixed bottom-10 right-20 bg-[#009B86] text-3xl py-4 px-5 hover:bg-[#34AC9C] '>SUBMIT BALLOT</button>
    </>
  );
};

export default BallotClientPage;
