import React from 'react';
import Loading from '../pages/Loading.js'
import HomeFeed from '../components/HomeFeed.js';
import Missing from './Missing.js';

const Home = ({ isLoading, error }) => {
  
  if (isLoading) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return <Missing msg={'404'} msg2={'Category Not Found!'}/>;
  }

  return (
    <main className='flex bg-[#f7f7f8] grow dark:bg-[#0e0e10]'>
      
        <HomeFeed />

    </main>
  )
}

export default Home;