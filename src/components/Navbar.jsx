import React from 'react'
import logo from '../assets/Logo.png'
function Navbar() {
  return (
    <div className='w-full bg-lime-200 flex justify-between p-2'>
        <div className='flex gap-4'>
            <img src={logo} className='h-[30px] w-[30px] ml-4 rounded-full'/>
            <p className='font-bold text-xl text-lime-900'>Todo List App</p>
        </div>
    </div>
  )
}

export default Navbar;