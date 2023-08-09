import React, { useState } from "react";

function Header({ theme, setTheme }) {
  return (
    <div id='header'>
      <h1>My Book List</h1>
      <button className={theme === 'light' ? 'dark' : 'light'} onClick={() => setTheme((mode) => mode === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </div>
  )
};

export default Header;