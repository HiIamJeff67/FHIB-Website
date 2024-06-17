import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import Layout from './Layout';
import SortFileInAlphabeticalOrderPage from './pages/SortFileInAlphabeticalOrderPage/SortFileInAlphabeticalOrderPage';
import FileSorterContextProvider from './context/FileSorterContext';

const App = () => {
  return (
    <FileSorterContextProvider>
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route path='/sortFileInAlphabeticalOrder' 
                    element={<SortFileInAlphabeticalOrderPage 
                    isSpotifyFile={false}/>}
              />
              <Route path='/sortSpotifyFileInAlphabeticalOrder' 
                    element={<SortFileInAlphabeticalOrderPage 
                    isSpotifyFile={true}/>} 
              />
          </Route>
      </Routes>
    </FileSorterContextProvider>
  )
}

export default App