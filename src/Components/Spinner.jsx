import React from 'react';
import spinner from "../assets/spinner.svg"

export default function Spinner() {
  return (
      <div className=' fixed left-0 right-0 bottom-0 top-0 z-50 bg-black bg-opacity-50 flex items-center justify-center '>
          <div>
              <img className='h-24 ' src={spinner } alt="loading..." />
          </div>
    </div>
  )
}
