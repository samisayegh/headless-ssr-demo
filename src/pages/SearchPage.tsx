import * as React from "react";
import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration,
  loadSearchAnalyticsActions,
  SearchAppState,
  SearchEngine,
} from "@coveo/headless";
import { SearchBox } from "../components/SearchBox";
import { EngineContext } from "../context/engine";
import { ResultList } from "../components/ResultList";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { Facet } from "../components/Facet";

declare global {
  interface Window {
    HEADLESS_STATE?: SearchAppState;
  }
}

export interface SearchPageProps {
  engine?: SearchEngine;
}

export function SearchPage(props: SearchPageProps) {
  const engine = props.engine || buildEngine();

  React.useEffect(() => {
    if (props.engine) {
      return;
    }

    const wasServerSideRendered = !!window.HEADLESS_STATE;
        
    if (wasServerSideRendered) {
      const {logInterfaceLoad} = loadSearchAnalyticsActions(engine);
      engine.dispatch(logInterfaceLoad());
      return;
    }

    engine.executeFirstSearch();
  }, [engine]);

  return (
    <div>
      <EngineContext.Provider value={engine}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item sm={3}/>
            <Grid item sm={7}>
              <Box pl={3}>
                <SearchBox />
              </Box>
            </Grid>
          </Grid>
          <Box my={4}>
            <Grid container>
              <Grid item sm={3}>
                <Box>
                  <Box px={1} pb={1}>
                    <Typography variant="overline">Refine By</Typography>
                    <Facet field="objecttype" title="Object Type" />
                    <Facet field="filetype" title="File Type" />
                    <Facet field="author" title="Author" />
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={9}>
                <Box pl={3}>
                  <ResultList />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </EngineContext.Provider>
    </div>
  );
}

function buildEngine() {
  return buildSearchEngine({
    configuration: getSampleSearchEngineConfiguration(),
    preloadedState: window.HEADLESS_STATE,
  });
}
