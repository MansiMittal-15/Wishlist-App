import React from 'react'

const Cards = ({ title, description, price, rating, image }) => {
  return (
    <div className='w-auto h-auto rounded-2xl border-2 border-slate-300 overflow-hidden shadow-2xs'>
      <div className='bg-white flex flex-col h-full'> 
        <img src={image} alt={title} className='w-full h-40 object-contain' />
        <div className='p-4'>
          <h3 className='text-xl font-semibold text-slate-800 mb-2 line-clamp-1'>{title}</h3>
          <p className='text-sm text-slate-600 mb-2 line-clamp-2'>{description}</p>
          <div className='flex justify-between items-center mt-2'>
            <p className='text-lg font-bold text-green-600'>Price : ${price}</p>
            <p className='text-sm font-semibold text-amber-500'>Rating: {rating}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards