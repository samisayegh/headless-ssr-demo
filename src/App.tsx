import * as React from 'react';
import './App.css';
import {SearchPage, SearchPageProps} from './pages/SearchPage';

export function App(props: SearchPageProps) {
  React.useEffect(() => {
    const ssrStyles = document.querySelector('#ssr-styles');

    if (ssrStyles) {
      ssrStyles.parentElement.removeChild(ssrStyles);
    }
  }, [])

  return <SearchPage {...props} />;
}