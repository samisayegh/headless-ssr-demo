import * as React from 'react';
import { buildSearchEngine, getSampleSearchEngineConfiguration } from "@coveo/headless"
import {SearchBox} from '../components/SearchBox';
import {EngineContext} from '../context/engine';
import {ResultList} from '../components/ResultList';

export function SearchPage() {
  const engine = buildSearchEngine({configuration: getSampleSearchEngineConfiguration()});

  React.useEffect(() => {
    engine.executeFirstSearch();
  }, [engine]);

  return <div>
    <EngineContext.Provider value={engine}>
      <SearchBox/>
      <ResultList/>
    </EngineContext.Provider>
  </div>
}