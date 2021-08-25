import * as path from 'path';
import * as fs from 'fs';

import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {ServerStyleSheets} from '@material-ui/core/styles';

import {App} from './App';
import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration,
  buildSearchStatus,
  SearchEngine,
} from '@coveo/headless';

const PORT = 3000;
const app = express();

app.get('/', async (req, res) => {
  const engine = buildSearchEngine({
    configuration: getSampleSearchEngineConfiguration(),
  });

  renderServerSide(engine);
  await firstSearchExecuted(engine);
  const {html, css} = renderServerSide(engine);

  const indexFile = path.resolve('./dist/static/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Internal error');
    }

    const state = JSON.stringify(engine.state);
    const page = data
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace('<style id="ssr-styles"></style>', `<style id="ssr-styles">${css}</style>`)
      .replace(
        '<script id="ssr-state"></script>',
        `<script id="ssr-state">window.HEADLESS_STATE = ${state}</script>`
      );

    return res.send(page);
  });
});

function renderServerSide(engine: SearchEngine) {
  const sheets = new ServerStyleSheets();
  const html = ReactDOMServer.renderToString(sheets.collect(<App engine={engine}/>));
  const css = sheets.toString();

  return {html, css};
}

function firstSearchExecuted(engine: SearchEngine) {
  return new Promise((resolve) => {
    const searchStatus = buildSearchStatus(engine);
    searchStatus.subscribe(
      () => searchStatus.state.firstSearchExecuted && resolve(true)
    );
    engine.executeFirstSearch();
  });
}

app.use(express.static('./dist/static'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
