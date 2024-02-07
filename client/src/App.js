import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import Layout from './Layout';
import SortFileInAlphabeticalOrderPage from './pages/SortFileInAlphabeticalOrderPage/SortFileInAlphabeticalOrderPage';

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route path='/sortFileInAlphabeticalOrder' element={<SortFileInAlphabeticalOrderPage />} />
        </Route>
    </Routes>
  )
}

export default App