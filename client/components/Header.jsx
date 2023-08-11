import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext, UserContext } from "./Context.jsx";

function Header () {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate('/login');
  }

  console.log(user);

  return (
    <div id='header'>
      <h1>My Book List</h1>
      <div className="edit-buttons">
        <button className={theme === 'light' ? 'dark' : 'light'} onClick={() => setTheme((mode) => mode === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button className="green-background" onClick={logout}>
          Sign out
        </button>
      </div>
    </div>
  )
};

export default Header;