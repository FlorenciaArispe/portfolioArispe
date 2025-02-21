import React, { useEffect, useState } from 'react'

export const Header = () => {
  const [isScrolled, setIsScrolled]= useState(false);

  useEffect(()=> {
    const handleScroll= () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  }, []
)

  return (
   <>
     <div className={` z-20 fixed top-0 left-0 w-full py-5 flex flex-row justify-between items-center bg-white transition-all duration-500 ${
      isScrolled ? ' shadow-md': ''
     }`}
     >
        <div className='flex flex-row space-x-4 absolute left-2.5'>
            <p>seccion 1</p>
            <p>seccion 2</p>
            <p>seccion 3</p>
            <p>seccion 4</p>
        </div>
        <div className='flex-grow flex justify-center'>
            <h1 className=" text-center text-2xl">Arispe Florencia</h1>
        </div>
        <div className='absolute right-2.5'>
            <h1>ICONOS</h1>
        </div>
        
      </div>
   </>
  )
}
