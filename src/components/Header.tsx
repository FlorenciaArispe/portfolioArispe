import React from 'react'

export const Header = () => {
  return (
   <>
     <div className=" py-5 flex flex-row justify-between">
        <div className='flex flex-row w-96 '>
            <p>seccion 1</p>
            <p>seccion 2</p>
            <p>seccion 3</p>
            <p>seccion 4</p>
        </div>
        <div className='w-96'>
            <h1 className=" text-center text-4xl font-black">Arispe Florencia</h1>
        </div>
        <div className='w-96'>
            <h1>ICONOS</h1>
        </div>
        
      </div>
   </>
  )
}
