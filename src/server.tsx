import * as path from "path";
import * as fs from "fs";

import * as express from "express";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { ServerStyleSheets } from "@material-ui/core/styles";

import { App } from "./App";
import {
  buildSearchEngine,
  buildSearchStatus,
  SearchEngine,
} from "@coveo/headless";
import { StaticRouter } from "react-router-dom";
import { configuration } from "./engine-configuration";

const PORT = 3000;
const app = express();

app
  .get("/", async (_, res) => {
    const indexFile = path.resolve("./dist/static/index.html");
    res.sendFile(indexFile);
  })
  .get("/ssr", async (req, res) => {
    const engine = buildSearchEngine({ configuration });

    renderServerSide(engine, req.url);
    await firstSearchExecuted(engine);
    const { html, css } = renderServerSide(engine, req.url);
    const state = JSON.stringify(engine.state);

    const indexFile = path.resolve("./dist/static/index.html");
    fs.readFile(indexFile, "utf8", (err, htmlFile) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Internal error");
      }

      const page = htmlFile
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace(
          '<style id="ssr-styles"></style>',
          `<style id="ssr-styles">${css}</style>`
        )
        .replace(
          '<script id="ssr-state"></script>',
          `<script id="ssr-state">window.HEADLESS_STATE = ${state}</script>`
        );

      return res.send(page);
    });
  });

function renderServerSide(engine: SearchEngine, url: string) {
  const sheets = new ServerStyleSheets();
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={url}>
        <App engine={engine} />
      </StaticRouter>
    )
  );
  const css = sheets.toString();

  return { html, css };
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

app.use(express.static("./dist/static"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
