'use client';
import React from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
};



const ThemeToggle = () => {
    const [theme, setTheme] = useState(themes.winter);
    const themetoggle=()=>{
        const newTheme=theme==='winter'?'dracula':'winter';
        document.documentElement.setAttribute('data-theme',newTheme);
        setTheme(newTheme)
    }
  return (
    <button className='btn btn-primary btn-sm' onClick={themetoggle}>
        {theme==='winter'?<BsSunFill className='h-4 w-4'
        />:<BsMoonFill className='h-4 w-4' />}
    </button>
  )
}

export default ThemeToggle