import * as React from 'react';
import './App.css';
import {SearchPage} from './pages/SearchPage';

export function App() {
  React.useEffect(() => {
    const ssrStyles = document.querySelector('#ssr-styles');

    if (ssrStyles) {
      ssrStyles.parentElement.removeChild(ssrStyles);
    }
  }, [])
  
  return <SearchPage/>;
}