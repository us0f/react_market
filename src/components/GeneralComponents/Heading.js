import React from 'react';

const Heading = ({ catName }) => {
  const title = catName.charAt(0).toUpperCase() + catName.slice(1)

  return (
    <div className='flex h-2/3 w-full justify-center my-10'>

      <div className='headingBG flex h-full w-9/12 bg-cover bg-center justify-center items-center '>

        <h1 className='text-white text-3xl font-extrabold tracking-widest'>{title}</h1>

      </div>
    </div>
  )
}

export default Heading;