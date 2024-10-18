import React from 'react';
import useDebounce from "../_hooks/useDebounce";
import { useSelector } from 'react-redux';
import ProductsFeed from './Products/ProductsFeed';

const HomeFeed = () => {

  const search = useSelector((state) => state.search.search);

  const products = useSelector((state) => state.search.searchResults);

  const debouncedSearchValue = useDebounce(search, 1000);

  return (
    <>

    <ProductsFeed searchTerm={debouncedSearchValue} products={products} />

    </>
  )
}

export default HomeFeed;