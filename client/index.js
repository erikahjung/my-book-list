import React from 'react';
// import { render } from 'react-dom';
import App from './components/App.jsx'

import './style.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// render(
//   <App />,
//   document.getElementById('root')
// );

