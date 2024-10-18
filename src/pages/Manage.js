import React from 'react';
import Loading from '../pages/Loading.js'
import Missing from './Missing.js';
import ManageFeed from '../components/ManageFeed.js';

const Manage = ({ isLoading, error }) => {
  
  if (isLoading) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return <Missing msg={'404'} msg2={'Category Not Found!'}/>;
  }

  return (
    <main className='flex bg-[#f7f7f8] grow dark:bg-[#0e0e10]'>
      
      <ManageFeed />

    </main>
  )
}

export default Manage;