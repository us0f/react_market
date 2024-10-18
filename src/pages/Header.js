import { Link } from 'react-router-dom';
import storeLogo from "../assets/storeLogo.png";
import NavBar from "../components/Header/NavBar";
import Search from "../components/Header/Search";


const Header = () => {

  return (
    <header className='flex bg-white border-black border-opacity-10 border-b h-20 justify-around items-center p-4 dark:bg-[#18181b] dark:text-white drop-shadow-md'>

      <Search />
   
      <div className=""><Link to='/'><img className="w-18 h-16 lg:w-20 lg:h-18" src={storeLogo} alt='logo'/></Link></div>

      <NavBar />

      


    </header>
  )
}

export default Header;