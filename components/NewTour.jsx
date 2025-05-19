'use client';

import toast from 'react-hot-toast';
import TourInfo from '@/components/TourInfo';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import {createNewTour,generateTourResponse,getExistingTour,fetchImage} from '@/utils/actions'
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;



const NewTour = () => {
    const queryClient=useQueryClient();
    const [tourImage, setTourImage] = useState(null);
    const{mutate,isPending,data:tour}=useMutation({mutationFn:async(destination)=>{
        const existingTour = await getExistingTour(destination);
        if (existingTour) {
          
          return existingTour;
        }
        const newTour=await generateTourResponse(destination);
        if (newTour) {
            await createNewTour(newTour);
            queryClient.invalidateQueries({ queryKey: ['tours'] });
            
            return newTour;
          }
        toast.error('No matching city found...');
        return null;


    }})

useEffect(() => {
    const fetchImg = async () => {
      if (!tour) return;

      try {
       // console.log(tour.city);
        
        const imageUrl = await fetchImage(tour.city);
        setTourImage(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImg();
  }, [tour]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTourImage(null);
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    // console.log(destination.city);
    mutate(destination);
  };

  if (isPending) {
    return <span className='loading loading-lg'></span>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className=' mb-4'>Select your dream destination</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />
          <button
            className='btn btn-primary join-item'
            type='submit'
            disabled={isPending}
          >
            {isPending ? 'please wait...' : 'generate tour'}
          </button>
        </div>
      </form>
      <div className='mt-16'>
      {tourImage ? (
              <div>
                <Image
                  src={tourImage}
                  width={300}
                  height={300}
                  className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
                  alt={tour.title}
                  priority
                />
              </div>
            ) : null}
        <div className='mt-16'>{tour ? <TourInfo tour={tour} /> : null}</div>
      </div>
    </>
  );
};
export default NewTour;