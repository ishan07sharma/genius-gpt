'use client';
import {run}  from '@/utils/actions';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Chat = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [messages, setMessages] = useState([]);
  const {mutate,isPending, data}=useMutation({
    mutationFn:(text)=>run(text),
    onSuccess:(data)=>{
      if(!data){
        toast.error('Something went wrong...');
        return;
      }
      // setMessages((prev)=>[...prev,data]);
      
      const ans = { role: "model", content:data };
      
      setResult(data);
      // console.log(data);
      // console.log(text);
      setMessages((prev) => [...prev,ans]);
      
      //console.log(messages);
      
      
      

    },
    onError:(error)=>{
      toast.error('Something went wrong...');
    }

    
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content:text };
    
    mutate(text);
    setMessages((prev)=>[...prev,query]);
    setText('')
    //console.log(messages);
    
  };
  


  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
      {messages.map(({ role, content }, index) => {
      
      const avatar = role == 'user' ? '👤' : '🤖';
      const bcg = role == 'user' ? 'bg-base-200' : 'bg-base-100';
      return (
        <div
          key={index}
          className={` ${bcg} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
        >
          <span className='mr-4 '>{avatar}</span>
          <p className='max-w-3xl'>{content}</p>
        </div>
      );
    })}
    {isPending && <span className='loading'></span>}
       
      </div>
      <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Message GeniusGPT'
            className='input input-bordered join-item w-full'
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className='btn btn-primary join-item' type='submit'>
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;