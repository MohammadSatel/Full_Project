import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';


// Get the root DOM element and root object.
const container = document.getElementById('root')!;
const root = createRoot(container);

// Use the root object to render the application within <React.StrictMode> for additional checks and warnings in development.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Call the reportWebVitals function to log out performance metrics.
reportWebVitals();
