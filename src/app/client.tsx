/* eslint-disable @next/next/no-img-element */
'use client';
import { Ballot } from '@/types';
import React, { useState } from 'react';
import ResultsModal from './ResultsModal';
import ErrorModal from './ErrorModal';

type Props = {
  ballots: Ballot[];
};

export type Vote = {
  id: string;
  nominee: string;
  title: string;
  photoUrl: string;
};

const BallotClientPage = ({ ballots }: Props) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showError, setShowError] = useState<boolean>(false)  
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleVotes = (id: string, nominee: string, title:string, photoUrl:string) => {
    let currentVotes;

    // Se votó en esta categoría?
    if (votes.find((vote) => vote.id === id)) {

      // Si se votó quito esa última votación, no importa si es la misma que estoy seleccionando
      const filteredVotes = votes.filter((vote) => vote.id !== id);

      // Actualizo la lista de votos con el elemento seleccionado.
      currentVotes = [...filteredVotes, { id: id,title:title, nominee: nominee, photoUrl: photoUrl }];
      setVotes(currentVotes);
    } else {
      currentVotes = [...votes, { id: id, title:title, nominee: nominee, photoUrl: photoUrl }];
      setVotes(currentVotes);
    }
  };

  const handleSubmit = () => {
    if (votes.length < ballots.length) {
      setShowError(true)
      return;
    }
    setShowModal(true);
  }

  return (
    <>
      {showError && <ErrorModal/>}
      {showModal && <ResultsModal votes={votes} setShowModal={setShowModal}/>}
      {ballots.map((ballot) => {
        return (
          <section key={ballot.id} className='container mx-auto px-2'>
            <h2 className='bg-[#FF6F61] text-5xl py-4 px-4 my-4 mt-16'>{ballot.title}</h2>
            <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(300px,380px))] justify-center gap-2 sm:gap-10'>
              {ballot.items.map((nominee) => {
                const isSelected = votes.find((vote) => vote.nominee === nominee.title);
                return (
                  <article className={` ${isSelected ? 'bg-[#009B86]' : ''} rounded-md p-2 `} key={nominee.title}>
                    <h3 className='text-sm sm:text-2xl sm:my-2 overflow-hidden text-ellipsis whitespace-nowrap'>{nominee.title}</h3>
                    <img className=' rounded-md w-full h-[250px] sm:h-[550px] object-contain' src={nominee.photoUrL} alt={nominee.title} />
                    <button className='rounded-md w-full max-w-[150px] h-8 sm:h-12 text-sm sm:text-lg block mx-auto mt-4 bg-[#FF6F61] hover:bg-[#ed6053] transition-all' onClick={() => handleVotes(ballot.id, nominee.title, ballot.title, nominee.photoUrL)}>
                      VOTE
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      <button className='fixed text-lg px-2 left-1/2 -translate-x-1/2 bottom-10 sm:left-auto sm:translate-x-0 sm:right-20 bg-[#009B86] sm:text-3xl py-4 sm:px-5 hover:bg-[#34AC9C]' onClick={() => handleSubmit()}>SUBMIT BALLOT</button>
    </>
  );
};

export default BallotClientPage;
