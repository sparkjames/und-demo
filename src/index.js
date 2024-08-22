import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { PostSearchFilterProvider } from './contexts/postSearchFilter.context';
import { TagFiltersProvider } from './contexts/tagFilters.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostSearchFilterProvider>
      <TagFiltersProvider>
        <App />
      </TagFiltersProvider>
    </PostSearchFilterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
