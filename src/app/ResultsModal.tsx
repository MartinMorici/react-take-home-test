/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Vote } from './client';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  votes: Vote[];
};

const ResultsModal = ({ setShowModal, votes }: Props) => {

    const handlePropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
     e.stopPropagation()
    }
  return (
    <aside className='fixed inset-0 bg-[#000000c3] z-10 flex justify-center items-center' onClick={() => setShowModal(false)}>
      <div className=' relative bg-white w-[1200px] max-h-[calc(100vh-100px)] h-full py-8 overflow-y-auto mx-4 sm:mx-8' onClick={(event) => handlePropagation(event)}  >
        <h2 className='text-center text-3xl text-black font-bold mb-4 bg-[#FF6F61]'>Your Votes</h2>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(150px,320px))] justify-center gap-10 scroll  '>
          {votes.map((vote) => {
            return (
              <div key={vote.id} className=' text-black  '>
                <h3 className='font-bold text-xl bg-[#FF6F61] text-center '>{vote.title}</h3>
                <h4 className='font-semibold mt-3 whitespace-nowrap text-sm'>{vote.nominee}</h4>
                <img className='h-[444px] border border-black object-cover' src={vote.photoUrl} alt={vote.nominee} />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ResultsModal;
