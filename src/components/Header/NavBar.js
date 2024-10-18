import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const titleStyle = 'font-JosefinSans font-normal text-lg m-4'
  return (
    <div className=''>
        <ul className='hidden lg:flex justify-center items-center'>

            <li className={titleStyle} ><Link to='orders'>Order History</Link> </li>
            <li className={titleStyle} ><Link to='manage'>Manage Stock</Link> </li>

        </ul>
    </div>
  )
}

export default NavBar;