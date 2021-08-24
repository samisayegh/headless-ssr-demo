import React from 'react';
import { buildSearchEngine, getSampleSearchEngineConfiguration } from "@coveo/headless"
import {SearchBox} from '../components/SearchBox';
import {EngineContext} from '../context/engine';

export function SearchPage() {
  const engine = buildSearchEngine({configuration: getSampleSearchEngineConfiguration()});

  return <div>
    <EngineContext.Provider value={engine}>
      <SearchBox></SearchBox>
    </EngineContext.Provider>
  </div>
}