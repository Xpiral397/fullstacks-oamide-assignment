import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MenuPage from './components/menus';
import DataProvider from './context/dataContext'

import './index.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex h-screen bg-white  p-5">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/menus" element={<MenuPage />} />

            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
