import  { StrictMode } from 'react';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

// redux box
import store from'./store.js'
 
// store.dispatch({type: 'account/deposit', payload: 150})
// console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
);
