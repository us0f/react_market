import Layout from './pages/Layout';
import Home from './pages/Home';
import Missing from './pages/Missing';
import { Route, Routes } from 'react-router-dom';
import { useGetCategoriesQuery } from './features/categories/categoriesSlice';
import Loading from './pages/Loading';
import Orders from './pages/Orders';
import Manage from './pages/Manage';

function App() {

  const { data: categories=[], error, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return <Missing msg={'Error:'} msg2={error}/>;
  }

  if (!categories && !isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      
      <Route index element={<Home isLoading={isLoading} error={error}/>} />

      <Route path='orders'>
          <Route index element={<Orders isLoading={isLoading} error={error}/>} />
      </Route>

      <Route>
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/:categoryId" element={<Manage />} />
      </Route>

      <Route path='*' element={<Missing msg={'404'} msg2={`We can't find that page.`}/>} />

      </Route>
    </Routes>
  );
}

export default App;
