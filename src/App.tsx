import * as React from "react";
import "./App.css";
import { SearchPage, SearchPageProps } from "./pages/SearchPage";
import { NavLink, Switch, Route } from "react-router-dom";
import { Tab, Grid } from "@material-ui/core";

export function App(props: SearchPageProps) {
  React.useEffect(() => {
    const ssrStyles = document.querySelector("#ssr-styles");

    if (ssrStyles) {
      ssrStyles.parentElement.removeChild(ssrStyles);
    }
  }, []);
  const activeNavLink: React.CSSProperties = { color: "red" };

  return (
    <>
      <Grid container justifyContent="center">
        <NavLink exact to="/" activeStyle={activeNavLink}>
          <Tab label="CSR" />
        </NavLink>
        <NavLink exact to="/ssr" activeStyle={activeNavLink}>
          <Tab label="SSR" />
        </NavLink>
      </Grid>
      <Switch>
        <Route path="/">
          <SearchPage {...props} />
        </Route>
      </Switch>
    </>
  );
}
