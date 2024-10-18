import React, { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setSearchResults } from '../../features/search/searchSlice';
import { selectAllCategories } from '../../features/categories/categoriesSlice';

const Search = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const search = useSelector((state) => state.search.search);


  useEffect(() => {
    const allProducts = categories.flatMap(category => category.products || []);
    
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    dispatch(setSearchResults(filteredProducts));
  }, [categories, search, dispatch]);

  const handleInputChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className='flex items-center h-full py-1 '>
      <div className="relative flex items-center h-full">

        <IoIosSearch className="w-7 h-full" />

        <input className="bg-[#e2e2e2] text-black h-full rounded-xl pl-3 ml-1 drop-shadow-sm"

          placeholder="Search Products"
          id="search"
          type="text"
          value={search}  
          onChange={handleInputChange}
        />

      </div>
    </div>
  );
};

export default Search;
