import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login.jsx';
import { ErrorPage } from './ErrorPage.jsx';

import { ThemeContext, UserContext } from './Context.jsx';
import BookList from './BookList.jsx';

function App () {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route 
            path="/login"
            element={
                <Login/>
            }
          />
          <Route 
            path="/"
            element={
              <ThemeContext.Provider value={{ theme, setTheme }}>
                <BookList/>
              </ThemeContext.Provider>
            }
          />
          <Route 
            path="*"
            element={
              <ErrorPage />
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;